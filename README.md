
<img width="318" height="233" alt="image" src="https://github.com/user-attachments/assets/200229c8-1add-44a5-8af4-269ebf0a106c" />


🏨 FindMyStay – Hotel Booking System

📑 Table of Contents
1. Overview  2. Key Features  3. Technology Stack   4. Architecture 5. Database Schema 6. Installation & Setup 7. Running the Application 8. API Documentation
9. Project Structure 10. Security Features 11. For College Evaluation 12 Project Members 

# 1️⃣ Overview

FindMyStay is a full-stack hotel booking web application that allows users to search hotels, check availability, and book rooms in real time.

The system is designed to:

* Prevent overbooking
* Handle concurrent users
* Provide a smooth booking experience

It simulates a real-world booking platform like: Booking.com

SCREENSHOTS OF PROJECT: 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9e9440c8-d2bf-433f-8015-1ad22b063604" />
Home Page 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/63c87f64-7d12-4de9-b54a-c46c49b5a752" />
Booking Page: Guest Details
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9ab91400-df48-487c-bb81-c845057c8a4e" />
Review Your Booking: You can edit Booking details or reviews or details
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c263032e-ba79-43aa-8166-0e6564b2c253" />
Confirmation Page: Confirm Booking 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4fbace57-4625-4676-bfdd-ad8e25a28407" />
Availabilty of Rooms: when Rooms where not Available Case
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a98f5a41-85f3-498c-8192-48d7e7e75ab7" />
About Page 

2️⃣ Key Features

### 🔍 Search & Discovery

* Search hotels by location
* Browse featured hotels and destinations

### 🏨 Room Booking System

* Book rooms with check-in and check-out dates
* Dynamic availability checking

### ⚡ Real-Time Updates

* Socket-based communication using `socket.io`
* Instant booking updates

### 🔐 Concurrency Control

* Prevents multiple users from booking the same room simultaneously

### 🔔 Notifications

* Toast notifications for:

  * Booking success
  * Booking failure

# 3️⃣ Technology Stack

### 🎨 Frontend

* React.js
* CSS (inline styling currently)
* React Toastify

### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MySQL
* Sequelize ORM

### 🔌 Real-Time

* Socket.io

---

# 4️⃣ Architecture

The project follows a **client-server architecture**:

```plaintext
Frontend (React)
        ↓
REST API (Express Server)
        ↓
Database (MySQL via Sequelize)
```

### 🔄 Data Flow

1. User interacts with UI
2. Request sent to backend API
3. Backend processes logic
4. Database queried/updated
5. Response returned to frontend

---

# 5️⃣ **Database Schema**

### 📊 Booking Table

| Field     | Type    | Description               |
| --------- | ------- | ------------------------- |
| id        | Integer | Primary key               |
| hotelName | String  | Name of hotel             |
| checkin   | Date    | Check-in date             |
| checkout  | Date    | Check-out date            |
| rooms     | Integer | Number of rooms booked    |
| createdAt | Date    | Record creation timestamp |
| updatedAt | Date    | Record update timestamp   |

### 🧠 Logic

* Total rooms per hotel: **Fixed (e.g., 10)**
* Availability calculated using:

  * Date overlap queries
  * Sequelize operators (`Op.lt`, `Op.gt`)

# 6️⃣ **Installation & Setup**

### 📥 Clone Repository

git clone https://github.com/Amaan2729/FindMyStay
cd FindMyStay

### 📦 Backend Setup
cd backend
npm install

### 🎨 Frontend Setup
cd frontend
npm install

 🗄️ Database Setup

* Install MySQL
* Create database:

CREATE DATABASE findmystay;

# 7️⃣ Running the Application

### ▶️ Start Backend

cd backend
node server.js

### ▶️ Start Frontend

cd frontend
npm run dev

### 🌐 Access App
http://localhost:5173

# 8️⃣ **API Documentation**

### 📌 1. Book a Room
Endpoint:
POST/BOOK
Request Body:
{
  "hotelName": "The Leela Palace",
  "checkin": "2026-04-01",
  "checkout": "2026-04-03",
  "rooms": 2
}
### ⚙️ Processing Steps:

1. Start transaction
2. Check overlapping bookings
3. Calculate booked rooms
4. Validate availability
5. Commit or rollback
### ✅ Success Response

{
  "message": "Booking successful"
}

### ❌ Failure Response

{
  "message": "Not enough rooms available"
}

# 9️⃣ **Project Structure**

FindMyStay/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── graphql/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── public/
│
└── README.md

# 🔟 Security Features

### 🔐 Data Integrity

* Sequelize transactions ensure:

  * Atomic operations
  * No partial bookings

### 🛡️ Concurrency Protection

* Prevents race conditions
* Ensures consistent booking state

### 🔒 Input Validation

* Validates:

  * Dates
  * Room count
### 🚫 Error Handling

* Try-catch blocks
* Transaction rollback on failure
# 🎓 **11. For College Evaluation**

### 💡 Problem Statement

Traditional booking systems face:

* Overbooking issues
* Poor concurrency handling

### ✅ Solution Provided

FindMyStay:

* Uses transactions
* Implements real-time availability
* Ensures safe multi-user booking

### 📈 Learning Outcomes

* Full-stack development
* REST API design
* Database management
* Concurrency handling
* Real-time systems

### 🔍 Future Scope

* User authentication (JWT)
* Payment integration (Stripe)
* Admin dashboard
* Dynamic hotel data
* Cloud deployment

👥 ### Project Team Members

This project was developed collaboratively by the following team members:
# Shruti :Backend Developer+Database
# Aarnav Kaushal: Frontend Developer
# Amaan ur Rehman: Backend

👥 ### Contributions
Shruti  – Backend Developer & Database Management
Responsible for designing and developing the backend system using Node.js and Express. Implemented booking APIs, handled business logic for room availability, and managed the database using Sequelize and MySQL, including transaction handling to prevent overbooking.
Aarnav Kaushal – Frontend Developer
Worked on designing and developing the user interface using React. Implemented UI components, handled user interactions, and ensured a responsive and interactive experience across the application.
Amaan ur Rehman – Backend Support & Testing
Contributed to backend development support, assisted in API integration, performed testing and debugging, and helped ensure the stability and correctness of booking and availability features.


