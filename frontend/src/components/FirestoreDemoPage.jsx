import { useState, useEffect } from "react";
import { useHotels, useUserBookings, useUserNotifications } from "../hooks/useFirestore";
import { addBooking, addNotification } from "../services/firestoreService";

function FirestoreDemoPage() {
  const { hotels, loading: hotelsLoading } = useHotels();
  const userId = "demo-user-123"; // Replace with actual user ID from auth
  const { bookings, loading: bookingsLoading } = useUserBookings(userId);
  const { notifications } = useUserNotifications(userId);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkin: "",
    checkout: "",
    guests: 1,
    rooms: 1,
  });

  const handleBooking = async () => {
    if (!selectedHotel || !bookingData.checkin || !bookingData.checkout) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Create booking
      const booking = await addBooking(
        {
          hotelId: selectedHotel.id,
          hotelName: selectedHotel.name,
          ...bookingData,
          totalPrice: selectedHotel.price * parseInt(bookingData.rooms),
          email: "user@example.com",
          phone: "9876543210",
        },
        userId
      );

      // Send notification
      await addNotification(userId, {
        title: "✅ Booking Confirmed!",
        message: `Your booking at ${selectedHotel.name} for ${bookingData.rooms} room(s) is confirmed!`,
        type: "booking",
        bookingId: booking.id,
      });

      alert("Booking successful! Check notifications 🔔");
      setSelectedHotel(null);
      setBookingData({
        checkin: "",
        checkout: "",
        guests: 1,
        rooms: 1,
      });
    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🏨 Firestore Real-time Demo</h1>

      {/* NOTIFICATIONS SECTION */}
      <div style={{ background: "#f0f8ff", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h2>🔔 Notifications ({notifications.length})</h2>
        {notifications.length === 0 ? (
          <p>No notifications yet</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                background: notif.isRead ? "#fff" : "#ffffcc",
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "4px",
              }}
            >
              <strong>{notif.title}</strong>
              <p>{notif.message}</p>
              <small>{new Date(notif.createdAt.toDate()).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>

      {/* HOTELS SECTION */}
      <div style={{ marginBottom: "30px" }}>
        <h2>🏩 Available Hotels (Real-time)</h2>
        {hotelsLoading ? (
          <p>Loading hotels...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                style={{
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  cursor: "pointer",
                  background: selectedHotel?.id === hotel.id ? "#e8f5e9" : "#fff",
                  transition: "all 0.3s",
                }}
                onClick={() => setSelectedHotel(hotel)}
              >
                {hotel.img && <img src={hotel.img} alt={hotel.name} style={{ width: "100%", borderRadius: "4px" }} />}
                <h3>{hotel.name}</h3>
                <p>📍 {hotel.location}</p>
                <p>⭐ {hotel.rating} ({hotel.reviews} reviews)</p>
                <h4 style={{ color: "#d4a574" }}>₹{hotel.price}/night</h4>
                <p>Amenities: {hotel.amenities?.join(", ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOOKING FORM */}
      {selectedHotel && (
        <div style={{ background: "#faf8f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <h2>📅 Book {selectedHotel.name}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <input
              type="date"
              value={bookingData.checkin}
              onChange={(e) => setBookingData({ ...bookingData, checkin: e.target.value })}
              placeholder="Check-in"
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
            <input
              type="date"
              value={bookingData.checkout}
              onChange={(e) => setBookingData({ ...bookingData, checkout: e.target.value })}
              placeholder="Check-out"
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
            <input
              type="number"
              min="1"
              value={bookingData.guests}
              onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
              placeholder="Guests"
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
            <input
              type="number"
              min="1"
              value={bookingData.rooms}
              onChange={(e) => setBookingData({ ...bookingData, rooms: parseInt(e.target.value) })}
              placeholder="Rooms"
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>
          <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
            Total: ₹{selectedHotel.price * bookingData.rooms}
          </p>
          <button
            onClick={handleBooking}
            style={{
              background: "#d4a574",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              marginRight: "10px",
            }}
          >
            ✅ Confirm Booking
          </button>
          <button
            onClick={() => setSelectedHotel(null)}
            style={{
              background: "#ccc",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ❌ Cancel
          </button>
        </div>
      )}

      {/* MY BOOKINGS SECTION */}
      <div>
        <h2>📜 My Bookings (Real-time)</h2>
        {bookingsLoading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  border: "2px solid #4caf50",
                  borderRadius: "8px",
                  padding: "15px",
                  background: "#f1f8f6",
                }}
              >
                <h3>{booking.hotelName}</h3>
                <p>📅 Check-in: {new Date(booking.checkin.toDate()).toLocaleDateString()}</p>
                <p>📅 Check-out: {new Date(booking.checkout.toDate()).toLocaleDateString()}</p>
                <p>👥 Guests: {booking.guests}</p>
                <p>🛏️ Rooms: {booking.rooms}</p>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>💰 ₹{booking.totalPrice}</p>
                <p style={{ color: booking.status === "confirmed" ? "#4caf50" : "#ff9800", fontWeight: "bold" }}>
                  Status: {booking.status.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FirestoreDemoPage;
