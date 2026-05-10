# Backend Firestore Sync Guide

Your app currently uses SQL (Sequelize) for data. Here's how to sync it with Firestore for real-time updates.

## Option 1: Dual Write (Recommended for now)

Write to both SQL and Firestore simultaneously.

### Update Booking Route

```javascript
// backend/routes/booking.js
const express = require("express");
const router = express.Router();
const { Booking, Hotel, User } = require("../models");
const admin = require("firebase-admin");
const { verifyFirebaseToken } = require("../middleware/firebaseAuth");

const db = admin.firestore();

router.post("/", verifyFirebaseToken, async (req, res) => {
  try {
    const { hotelId, hotelName, checkin, checkout, guests, rooms, totalPrice } = req.body;
    const userId = req.user.uid;
    const userEmail = req.user.email;

    // 1. Save to SQL database
    const sqlBooking = await Booking.create({
      name: req.user.name || userEmail.split("@")[0],
      email: userEmail,
      phone: req.body.phone || "",
      hotelName,
      checkin,
      checkout,
      guests,
      rooms,
      totalPrice,
    });

    // 2. Save to Firestore (real-time)
    const firestoreRef = await db.collection("bookings").add({
      userId,
      hotelId,
      hotelName,
      checkin: new Date(checkin),
      checkout: new Date(checkout),
      guests,
      rooms,
      totalPrice,
      status: "pending",
      email: userEmail,
      phone: req.body.phone || "",
      sqlId: sqlBooking.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 3. Send notification (real-time)
    await db.collection("notifications").add({
      userId,
      title: "✅ Booking Created",
      message: `Your booking at ${hotelName} for ${rooms} room(s) has been created!`,
      type: "booking",
      bookingId: firestoreRef.id,
      isRead: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: {
        sqlId: sqlBooking.id,
        firestoreId: firestoreRef.id,
        ...sqlBooking.toJSON(),
      },
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Booking failed" });
  }
});

// Get user bookings (real-time via frontend)
router.get("/user/:userId", verifyFirebaseToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch from SQL
    const bookings = await Booking.findAll({
      where: { email: req.user.email },
      order: [["createdAt", "DESC"]],
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### Update Hotel Seed Route

```javascript
// backend/seeders/seedHotels.js
const admin = require("firebase-admin");
require("dotenv").config();

// Initialize Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const hotels = [
  {
    name: "Taj Mahal Palace",
    location: "Mumbai",
    description: "Iconic luxury hotel with Arabian Sea views",
    price: 8000,
    type: "Hotel",
    rating: 4.9,
    reviews: 2500,
    img: "https://images.unsplash.com/photo-1566996122411-7521f3d57fbd?w=400",
    amenities: ["Pool", "WiFi", "Spa", "Restaurant", "Gym"],
    totalRooms: 560,
  },
  {
    name: "The Grand Hyatt",
    location: "Delhi",
    description: "5-star luxury in the heart of Delhi",
    price: 6500,
    type: "Hotel",
    rating: 4.7,
    reviews: 1800,
    img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400",
    amenities: ["Pool", "WiFi", "Spa", "Conference Halls"],
    totalRooms: 380,
  },
  {
    name: "Radisson Blu Resort",
    location: "Goa",
    description: "Beach resort with water sports",
    price: 4500,
    type: "Resort",
    rating: 4.6,
    reviews: 3200,
    img: "https://images.unsplash.com/photo-1571896367979-c2005682e58f?w=400",
    amenities: ["Beach", "Water Sports", "Restaurant", "WiFi"],
    totalRooms: 200,
  },
];

async function seedHotels() {
  try {
    console.log("Starting hotel seeding to Firestore...");

    for (const hotel of hotels) {
      const docRef = await db.collection("hotels").add({
        ...hotel,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`✅ Added: ${hotel.name} (ID: ${docRef.id})`);
    }

    console.log("Hotel seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedHotels();

// Run: node backend/seeders/seedHotels.js
```

## Option 2: Cloud Functions (Automatic Sync)

Use Firebase Cloud Functions to auto-sync changes:

```javascript
// Firebase Cloud Function (deploy via Firebase Console)
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Trigger when booking is created in Firestore
exports.onBookingCreated = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap, context) => {
    const booking = snap.data();

    // Send notification
    await db.collection("notifications").add({
      userId: booking.userId,
      title: "✅ Booking Received",
      message: `Your booking at ${booking.hotelName} is being processed`,
      type: "booking",
      bookingId: context.params.bookingId,
      isRead: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Notification sent for booking:", context.params.bookingId);
  });

// Trigger when booking status changes
exports.onBookingStatusChanged = functions.firestore
  .document("bookings/{bookingId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Only if status changed
    if (before.status !== after.status) {
      await db.collection("notifications").add({
        userId: after.userId,
        title: `📋 Booking ${after.status}`,
        message: `Your booking at ${after.hotelName} is now ${after.status}!`,
        type: "update",
        bookingId: context.params.bookingId,
        isRead: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  });
```

## Setup Steps

### 1. Add Firebase Admin SDK to Backend

```bash
cd backend
npm install firebase-admin
```

### 2. Add Environment Variables

Update `.env`:

```
FIREBASE_PROJECT_ID=findmystay-5cbb2
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@findmystay-5cbb2.iam.gserviceaccount.com
```

Get these from Firebase Console → Project Settings → Service Accounts → Generate New Private Key

### 3. Update Routes to Use Firestore

```javascript
// backend/config/firestore.js
const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
});

const db = admin.firestore();
module.exports = { admin, db };
```

### 4. Use in Routes

```javascript
const { db } = require("../config/firestore");

// Add to Firestore
await db.collection("bookings").add({ /* data */ });

// Update in Firestore
await db.collection("bookings").doc(id).update({ status: "confirmed" });

// Delete from Firestore
await db.collection("bookings").doc(id).delete();
```

## Data Flow

```
User Books Hotel:
├─ Frontend: addBooking()
├─ Backend API: /bookings POST
├─ SQL: Booking created
├─ Firestore: Booking created
├─ Notification created in Firestore
└─ Frontend: useUserBookings() instantly shows new booking

Admin Confirms Booking:
├─ Admin Dashboard updates status
├─ Backend: /bookings/:id PATCH
├─ SQL: Status updated
├─ Firestore: Status updated
├─ Cloud Function triggered
├─ Notification auto-created in Firestore
└─ User's NotificationBell instantly shows update
```

## Current Implementation Status

✅ Frontend:
- Firestore service with real-time listeners
- React hooks for real-time data
- Demo component

⏳ Backend (TODO):
- Add Firestore to booking routes
- Add Cloud Functions for auto-notifications
- Migrate existing bookings to Firestore
