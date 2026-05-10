# How to Test Firestore Real-time Database

## 🎯 Complete Testing Guide for Hotels, Bookings & Notifications

### Prerequisites
- Firebase project setup ✅
- Frontend running on `http://localhost:5173`
- Firestore initialized ✅

---

## ✅ Step 1: Add Test Hotels to Firestore

### Option A: Firebase Console (Easiest)

1. Go to **Firebase Console** → **Firestore Database**
2. Click **"Create Collection"** → Name it `hotels`
3. Click **"Add Document"** → Leave ID as auto
4. Add these fields:

```json
{
  "name": "Taj Palace Mumbai",
  "location": "Mumbai",
  "description": "5-star luxury hotel with sea view",
  "price": 5000,
  "type": "Hotel",
  "rating": 4.9,
  "reviews": 250,
  "img": "https://images.unsplash.com/photo-1566996122411-7521f3d57fbd?w=400",
  "amenities": ["Pool", "WiFi", "Spa", "Restaurant"],
  "totalRooms": 250
}
```

5. Click **"Add Field"** for each and save
6. Repeat 2-3 times with different hotels

**Hotels Collection Should Look Like:**
```
hotels/
  ├─ auto-id-1: {name: "Taj Palace", price: 5000, ...}
  ├─ auto-id-2: {name: "Grand Hyatt", price: 6500, ...}
  └─ auto-id-3: {name: "Radisson Goa", price: 4500, ...}
```

### Option B: Using Code (Advanced)

Create a file `frontend/src/utils/seedFirestore.js`:

```javascript
import { addHotel } from "../services/firestoreService";

const testHotels = [
  {
    name: "Taj Palace Mumbai",
    location: "Mumbai",
    description: "5-star luxury hotel",
    price: 5000,
    type: "Hotel",
    rating: 4.9,
    reviews: 250,
    img: "https://images.unsplash.com/photo-1566996122411-7521f3d57fbd?w=400",
    amenities: ["Pool", "WiFi", "Spa"],
    totalRooms: 250,
  },
  {
    name: "Grand Hyatt Delhi",
    location: "Delhi",
    description: "Luxury in city center",
    price: 6500,
    type: "Hotel",
    rating: 4.7,
    reviews: 180,
    img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400",
    amenities: ["WiFi", "Gym", "Restaurant"],
    totalRooms: 380,
  },
];

export async function seedTestData() {
  for (const hotel of testHotels) {
    try {
      await addHotel(hotel);
      console.log("✅ Added:", hotel.name);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  }
}
```

Then in your component temporarily:
```javascript
import { seedTestData } from "../utils/seedFirestore";

// Add this button to test
<button onClick={seedTestData}>🌱 Seed Test Data</button>
```

---

## ✅ Step 2: Import Demo Page to Your App

Open `frontend/src/App.jsx` and add route:

```javascript
import FirestoreDemoPage from "./components/FirestoreDemoPage";

// In your router/page switcher, add:
if (page === "firestore-demo") {
  return <FirestoreDemoPage />;
}

// In your navigation, add link:
<button onClick={() => setPage("firestore-demo")}>
  🧪 Firestore Demo
</button>
```

---

## ✅ Step 3: Test Real-time Hotels Display

### What to Test:

**Test 1: Hotels Load in Real-time**
1. Go to `http://localhost:5173/firestore-demo` (or click button)
2. Page should show hotels from Firestore in grid
3. Each hotel shows: name, location, rating, price, amenities

**Expected Output:**
```
🏩 Available Hotels (Real-time)
┌─────────────────────┐  ┌─────────────────────┐
│ Taj Palace Mumbai    │  │ Grand Hyatt Delhi   │
│ 📍 Mumbai           │  │ 📍 Delhi            │
│ ⭐ 4.9 (250)        │  │ ⭐ 4.7 (180)        │
│ ₹5000/night         │  │ ₹6500/night         │
│ Pool, WiFi, Spa     │  │ WiFi, Gym, Rest..   │
└─────────────────────┘  └─────────────────────┘
```

**Test 2: Real-time Hotel Updates**
1. Keep demo page open
2. Go to **Firebase Console → Firestore**
3. Edit a hotel (change price from 5000 to 7999)
4. **Watch demo page** - price updates instantly! ⚡

---

## ✅ Step 4: Test Real-time Bookings

### Test 1: Make a Booking

1. Click on any hotel card (it highlights green)
2. Fill booking form:
   - Check-in: `2026-05-15`
   - Check-out: `2026-05-20`
   - Guests: `2`
   - Rooms: `1`
3. Total shows: ₹5000 (price × rooms)
4. Click **"✅ Confirm Booking"**

**Expected:**
- ✅ Booking appears in "📜 My Bookings" section
- ✅ Notification appears in "🔔 Notifications" section
- Alert: "Booking successful! Check notifications 🔔"

**Your Firestore Now Has:**
```
bookings/
  └─ auto-id: {
      userId: "demo-user-123",
      hotelName: "Taj Palace Mumbai",
      checkin: May 15, 2026,
      checkout: May 20, 2026,
      status: "pending",
      totalPrice: 5000
    }

notifications/
  └─ auto-id: {
      userId: "demo-user-123",
      title: "✅ Booking Confirmed!",
      message: "Your booking at Taj Palace...",
      type: "booking",
      isRead: false
    }
```

### Test 2: Real-time Booking Updates

1. Make a booking (follow Test 1)
2. Go to **Firebase Console → Firestore → bookings**
3. Find your booking, click edit
4. Change status: `"pending"` → `"confirmed"`
5. **Watch demo page** - your booking status updates instantly! ⚡

---

## ✅ Step 5: Test Real-time Notifications

### Test 1: Notifications Appear

1. Make a booking (Step 4)
2. Check notifications section - should show your notification
3. Notification displays:
   - ✅ Title
   - ✅ Message
   - ✅ Timestamp
   - ✅ Background color (yellow = unread)

### Test 2: Real-time Notification from Firebase Console

1. Keep demo page open
2. Go to **Firebase Console → Firestore → notifications**
3. Click **"Add Document"**
4. Manually add a notification:

```json
{
  "userId": "demo-user-123",
  "title": "🎉 Special Offer!",
  "message": "Get 30% off on all bookings this weekend",
  "type": "alert",
  "isRead": false,
  "createdAt": new Date()
}
```

5. **Watch demo page** - new notification appears instantly! ⚡⚡

---

## ✅ Step 6: Test Multi-Device Real-time Sync

### Setup:
1. Open `http://localhost:5173/firestore-demo` on **Tab 1**
2. Open `http://localhost:5173/firestore-demo` on **Tab 2** (same browser)
3. Open `http://localhost:5173/firestore-demo` on **Phone/Another Device** (same WiFi)

### Test Real-time Sync Across Devices:

**Scenario 1: Make booking on Tab 1**
1. Make booking on Tab 1
2. **Instantly watch Tab 2 & Phone** - booking appears automatically!
3. Both tabs show same data without refresh

**Scenario 2: Update hotel price on Tab 2**
1. Go to Firebase Console on Tab 2
2. Change hotel price
3. **Tab 1 & Phone instantly show new price**

**Scenario 3: Firebase Manual Change**
1. Go to **Firebase Console → Firestore**
2. Change any hotel amenities
3. **All 3 tabs/devices instantly update**

---

## 🧪 Complete Testing Checklist

```javascript
// Copy this to test each feature

// ✅ HOTELS
[ ] Hotels load on page load
[ ] Can see all hotel details (name, price, rating, amenities)
[ ] Clicking hotel highlights it green
[ ] Firebase console edit → page updates instantly

// ✅ BOOKINGS
[ ] Can fill booking form
[ ] Can submit booking
[ ] Booking appears in "My Bookings"
[ ] Booking appears in Firestore console
[ ] Status shows "pending"
[ ] Firebase console edit status → page updates instantly

// ✅ NOTIFICATIONS
[ ] Notification appears after booking
[ ] Notification shows correct title & message
[ ] Notification timestamp displays
[ ] Unread notifications have yellow background
[ ] Firebase console add notification → page shows instantly

// ✅ REAL-TIME MULTI-DEVICE
[ ] Open 2 tabs with demo page
[ ] Make booking on Tab 1
[ ] Tab 2 shows booking instantly
[ ] Edit price on Firebase Console
[ ] Both tabs update without refresh

// ✅ EDGE CASES
[ ] Make booking without filling form → error shows
[ ] Change dates to past → verify validation
[ ] Add multiple bookings → all show in list
[ ] Refresh page → bookings still show (persisted)
```

---

## 🚀 Advanced Testing: Stress Test Real-time

### Test Rapid Updates:

Create `frontend/src/utils/stressTest.js`:

```javascript
import { addNotification } from "../services/firestoreService";

export async function stressTestNotifications() {
  const userId = "demo-user-123";
  
  for (let i = 1; i <= 10; i++) {
    await addNotification(userId, {
      title: `🔔 Test Notification ${i}`,
      message: `This is stress test message ${i}`,
      type: "alert",
    });
    console.log(`✅ Sent notification ${i}/10`);
    await new Promise(r => setTimeout(r, 500)); // Wait 500ms between each
  }
  
  console.log("✅ Stress test complete!");
}
```

Then test:
```javascript
import { stressTestNotifications } from "../utils/stressTest";

// Add button to component
<button onClick={stressTestNotifications}>💥 Stress Test</button>
```

**Result:** Should see 10 notifications appear in real-time, one after another! ⚡

---

## 📊 Firebase Console Monitoring

While testing, keep **Firebase Console** open to see:

1. **Firestore → Data** - See collections grow
2. **Firestore → Usage** - Monitor reads/writes
3. **Authentication** - See connected users

### Pricing During Testing:
- **First 50,000 reads/day = FREE** ✅
- Small demo usage = under free tier

---

## ❌ Troubleshooting

### Hotels not showing?
```javascript
// Check browser console for errors
// Verify:
1. Hotels collection exists in Firestore
2. Documents have correct fields
3. Firestore rules allow read access

// Add debug in useFirestore.js:
useEffect(() => {
  subscribeToHotels((hotels) => {
    console.log("🏨 Hotels updated:", hotels); // ← Add this
    setHotels(hotels);
  });
}, []);
```

### Bookings not real-time?
```javascript
// Check Firestore Rules are set correctly
// Current user ID should match booking userId

// Debug:
const userId = "demo-user-123"; // Make sure this is consistent
console.log("📍 User ID:", userId);
```

### Notifications not appearing?
```javascript
// Check notifications collection exists
// Verify userId matches in notifications query

// Test manually in console:
import { addNotification } from "./services/firestoreService";
await addNotification("demo-user-123", {
  title: "Test",
  message: "This is a test",
  type: "test"
});
```

---

## 🎓 Learning Path

1. **Basic** → Add hotels, see them display
2. **Intermediate** → Make booking, see real-time update
3. **Advanced** → Open 2 tabs, see cross-device sync
4. **Expert** → Firebase rules, Cloud Functions, production setup

---

## Next: Backend Integration

After confirming frontend works:

1. Backend creates bookings → added to Firestore (dual write)
2. Backend creates notifications automatically
3. Production Firestore rules for security

See `BACKEND_FIRESTORE_SETUP.md` for backend integration.
