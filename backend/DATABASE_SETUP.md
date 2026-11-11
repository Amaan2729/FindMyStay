# 🏨 FindMyStay Database Setup Guide

## Database Schema

### Hotels Table
The `Hotel` table stores all hotel information:

```sql
CREATE TABLE Hotels (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  price INT,
  type VARCHAR(100),
  rating FLOAT DEFAULT 4.5,
  reviews INT DEFAULT 0,
  img VARCHAR(500),
  amenities JSON,
  totalRooms INT DEFAULT 10,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Bookings Table
The `Booking` table stores all booking information:

```sql
CREATE TABLE Bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  hotelName VARCHAR(255),
  checkin DATE,
  checkout DATE,
  guests INT,
  rooms INT,
  totalPrice INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Setup Instructions

### Step 1: Create MySQL Database
Open your MySQL terminal and run:

```sql
CREATE DATABASE findmystay;
USE findmystay;
```

### Step 2: Configure Database Connection
Edit `backend/config/db.js`:

```javascript
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("findmystay", "root", "YOUR_PASSWORD", {
  host: "localhost",
  dialect: "mysql",
});
```

Replace `"YOUR_PASSWORD"` with your MySQL root password.

### Step 3: Install Dependencies
```bash
cd backend
npm install
```

### Step 4: Run Database Seeder
This will automatically create tables and populate with hotel data:

```bash
npm run seed
```

You should see output like:
```
✅ Database connected
✅ Models synced
✅ Hotels seeded successfully!
📊 Total hotels added: 8
```

### Step 5: Start Backend Server
```bash
node server.js
```

Backend will run on `http://localhost:5000`

## Sample Hotel Data

The seeder adds 8 sample hotels:

1. **The Leela Palace** - Udaipur, ₹12,500/night
2. **Snow Peak Resort** - Manali, ₹5,800/night
3. **Sunset Beachside Inn** - Goa, ₹4,200/night
4. **Heritage Haveli** - Jaipur, ₹7,900/night
5. **Grand Taj View** - Agra, ₹6,500/night
6. **Kerala Backwaters Resort** - Kochi, ₹5,400/night
7. **Himalayan Heights** - Shimla, ₹4,800/night
8. **Mumbai Metropolitan** - Mumbai, ₹8,900/night

## API Endpoints

### Get All Hotels
```bash
GET http://localhost:5000/api/hotels
```

Response:
```json
[
  {
    "id": 1,
    "name": "The Leela Palace",
    "location": "Udaipur, Rajasthan",
    "description": "...",
    "price": 12500,
    "type": "Resort",
    "rating": 4.9,
    "reviews": 2430,
    "img": "...",
    "amenities": ["Pool", "Spa", "WiFi", ...],
    "totalRooms": 50
  }
]
```

### Get Single Hotel
```bash
GET http://localhost:5000/api/hotels/1
```

### Check Availability
```bash
POST http://localhost:5000/api/check-availability
Body: {
  "hotelName": "The Leela Palace",
  "checkin": "2024-04-15",
  "checkout": "2024-04-20"
}
```

### Create Booking
```bash
POST http://localhost:5000/api/book
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "hotelName": "The Leela Palace",
  "checkin": "2024-04-15",
  "checkout": "2024-04-20",
  "guests": 2,
  "rooms": 1,
  "totalPrice": 62500
}
```

## Troubleshooting

### Error: "connect ECONNREFUSED"
- MySQL server is not running
- Check your MySQL connection details in `config/db.js`

### Error: "ER_ACCESS_DENIED_FOR_USER"
- Wrong MySQL password in `config/db.js`
- Verify your MySQL credentials

### Seeder Says Hotels Already Exist
- Data is already seeded
- To reseed, delete the databases or update the seeder logic

## Database Diagram

```
Hotels Table
├── id (PK)
├── name
├── location
├── description
├── price
├── type
├── rating
├── reviews
├── img
├── amenities (JSON)
├── totalRooms
└── timestamps

Bookings Table
├── id (PK)
├── name
├── email
├── phone
├── hotelName
├── checkin
├── checkout
├── guests
├── rooms
├── totalPrice
└── timestamps
```

## Next Steps

After setup, you can:
1. ✅ View hotels in "Featured Stays" section
2. ✅ Click "Book Now" to see hotel preview
3. ✅ Proceed to booking form
4. ✅ Make a booking

Happy booking! 🎉
