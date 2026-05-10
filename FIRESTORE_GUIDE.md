# Firestore Database Integration Guide

## Overview

Firestore is a real-time cloud database. Changes are instantly synced across all connected clients.

## Collections Structure

### 1. **hotels** Collection
```javascript
{
  id: "hotel123",
  name: "Taj Hotel",
  location: "Mumbai",
  description: "5-star luxury hotel",
  price: 5000,
  type: "Hotel",
  rating: 4.8,
  reviews: 342,
  img: "url-to-image",
  amenities: ["Pool", "WiFi", "Spa", "Restaurant"],
  totalRooms: 250,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 2. **bookings** Collection
```javascript
{
  id: "booking123",
  userId: "user456",
  hotelId: "hotel123",
  hotelName: "Taj Hotel",
  checkin: Date,
  checkout: Date,
  guests: 2,
  rooms: 1,
  totalPrice: 10000,
  status: "confirmed", // pending, confirmed, cancelled
  email: "user@example.com",
  phone: "9876543210",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 3. **notifications** Collection
```javascript
{
  id: "notif123",
  userId: "user456",
  title: "Booking Confirmed",
  message: "Your booking at Taj Hotel is confirmed for 15 May",
  type: "booking", // booking, payment, update, alert
  isRead: false,
  readAt: null,
  bookingId: "booking123",
  createdAt: Timestamp
}
```

## Usage Examples

### ✅ Example 1: Display All Hotels (Real-time)

```jsx
import { useHotels } from "../hooks/useFirestore";

function HotelsPage() {
  const { hotels, loading, error } = useHotels();

  if (loading) return <div>Loading hotels...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {hotels.map((hotel) => (
        <div key={hotel.id}>
          <h3>{hotel.name}</h3>
          <p>{hotel.location}</p>
          <p>₹{hotel.price}</p>
          <button>Book Now</button>
        </div>
      ))}
    </div>
  );
}

export default HotelsPage;
```

**What happens:**
- Page loads → fetches all hotels from Firestore
- Admin adds new hotel → page instantly shows new hotel (no refresh needed!)
- Admin updates hotel price → price updates on screen instantly
- Real-time sync across all users viewing the page

---

### ✅ Example 2: User Bookings (Real-time)

```jsx
import { useUserBookings } from "../hooks/useFirestore";

function MyBookings() {
  const userId = "user123"; // Get from auth context
  const { bookings, loading } = useUserBookings(userId);

  if (loading) return <div>Loading your bookings...</div>;

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <h4>{booking.hotelName}</h4>
          <p>Check-in: {booking.checkin.toDate().toLocaleDateString()}</p>
          <p>Status: {booking.status}</p>
          <p>₹{booking.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
```

**Real-time magic:**
- User makes booking → backend creates booking in Firestore
- User opens MyBookings → instantly shows new booking
- Admin confirms booking → status updates to "confirmed" instantly
- User sees status change without page refresh!

---

### ✅ Example 3: Real-time Notifications

```jsx
import { useUserNotifications } from "../hooks/useFirestore";
import { markNotificationAsRead } from "../services/firestoreService";

function NotificationBell() {
  const userId = "user123";
  const { notifications } = useUserNotifications(userId);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div>
      <span>🔔 {unreadCount}</span>
      <div className="notification-dropdown">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markNotificationAsRead(notif.id)}
            style={{ fontWeight: notif.isRead ? "normal" : "bold" }}
          >
            {notif.title}
            <p>{notif.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationBell;
```

**Real-time flow:**
1. User books hotel → backend sends booking confirmation
2. Backend adds notification to `notifications` collection
3. NotificationBell component instantly shows new notification
4. Bell icon shows unread count
5. User clicks notification → marked as read instantly

---

### ✅ Example 4: Creating a Booking with Auto-Notification

```jsx
import { addBooking, addNotification } from "../services/firestoreService";

async function handleBookNow(hotelData, bookingData) {
  try {
    const userId = currentUser.uid; // From auth
    
    // 1. Create booking in Firestore
    const booking = await addBooking({
      hotelId: hotelData.id,
      hotelName: hotelData.name,
      ...bookingData,
    }, userId);

    // 2. Auto-create notification
    await addNotification(userId, {
      title: "✅ Booking Confirmed",
      message: `Your booking at ${hotelData.name} is confirmed!`,
      type: "booking",
      bookingId: booking.id,
    });

    alert("Booking successful!");
  } catch (error) {
    console.error("Booking failed:", error);
  }
}
```

---

### ✅ Example 5: Single Hotel Details (Real-time Updates)

```jsx
import { useSingleHotel } from "../hooks/useFirestore";

function HotelDetails({ hotelId }) {
  const { hotel, loading } = useSingleHotel(hotelId);

  if (loading) return <div>Loading...</div>;
  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div>
      <img src={hotel.img} alt={hotel.name} />
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <p>Rating: {hotel.rating} ⭐ ({hotel.reviews} reviews)</p>
      <h3>₹{hotel.price} per night</h3>
      
      <h4>Amenities:</h4>
      <ul>
        {hotel.amenities.map((amenity, i) => (
          <li key={i}>{amenity}</li>
        ))}
      </ul>
      
      <button onClick={() => handleBooking(hotel)}>Book Now</button>
    </div>
  );
}
```

**Real-time updates:**
- Admin updates amenities → page shows new amenities instantly
- Admin changes price → users see new price without refresh
- Admin changes availability → affects booking logic instantly

---

## Firestore Rules (Security)

Add these to Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Hotels - anyone can read, only admin can write
    match /hotels/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }

    // Bookings - users can read/write their own
    match /bookings/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.userId || request.auth.token.admin == true;
    }

    // Notifications - users can read their own
    match /notifications/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if request.auth != null;
    }
  }
}
```

---

## How Real-time Works

### Before (Traditional API):
```
1. User opens page
2. Page makes HTTP request → backend → database
3. Gets data, displays it
4. To see updates, user must refresh page ❌
```

### With Firestore Real-time:
```
1. User opens page
2. Page subscribes to Firestore collection
3. Gets current data + stays connected to database
4. Database changes → automatically sent to page ✅
5. UI updates instantly without refresh!
```

---

## Common Use Cases

### 📌 Hotel Search & Availability
```javascript
// Real-time hotel list updates as admin adds/removes hotels
const { hotels } = useHotels();
```

### 📌 My Bookings Page
```javascript
// User's bookings update in real-time when admin confirms/cancels
const { bookings } = useUserBookings(userId);
```

### 📌 Notification Bell
```javascript
// Show unread count that updates instantly when new notification arrives
const { notifications } = useUserNotifications(userId);
```

### 📌 Hotel Details
```javascript
// Price, amenities, rating update live when admin changes them
const { hotel } = useSingleHotel(hotelId);
```

---

## Performance Tips

1. **Unsubscribe on unmount** - Hooks do this automatically
2. **Limit queries** - Use `where()` and `limit()` to fetch only needed data
3. **Index composite queries** - Firestore will guide you
4. **Offline support** - Firestore SDK handles this automatically

---

## Troubleshooting

### Data not appearing?
- Check Firestore Rules → allow read?
- Check browser console for errors
- Check Firestore Collections in Firebase Console

### Too many reads?
- Use pagination with `limit()`
- Cache data when possible
- Consider batching updates

### Real-time not working?
- Check internet connection
- Verify listener is set up correctly
- Check Firebase project is active
