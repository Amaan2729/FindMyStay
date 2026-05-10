import { useState, useEffect } from "react";
import { useHotels, useUserBookings, useUserNotifications } from "../hooks/useFirestore";
import { addHotel, addNotification } from "../services/firestoreService";

function FirestoreTestingPage() {
  const { hotels, loading: hotelsLoading } = useHotels();
  const { bookings, loading: bookingsLoading } = useUserBookings("demo-user-123");
  const { notifications } = useUserNotifications("demo-user-123");
  const [logs, setLogs] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

  function addLog(message, color = "black") {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      { message, timestamp, color, id: Math.random() },
    ]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      addLog("🟢 Page Loaded - Listening to Firestore real-time updates");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Log updates when data changes
  useEffect(() => {
    if (!hotelsLoading) {
      const timer = setTimeout(() => {
        addLog(`🏨 Hotels Updated: ${hotels.length} hotels loaded`, "blue");
        hotels.forEach((h) => {
          addLog(`   ├─ ${h.name} (₹${h.price})`, "cyan");
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [hotels, hotelsLoading]);

  useEffect(() => {
    if (!bookingsLoading) {
      const timer = setTimeout(() => {
        addLog(`📅 Bookings Updated: ${bookings.length} bookings found`, "green");
        bookings.forEach((b) => {
          addLog(`   ├─ ${b.hotelName} - ${b.status}`, "lightgreen");
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [bookings, bookingsLoading]);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        addLog(
          `🔔 Notifications Updated: ${notifications.length} notifications`,
          "orange"
        );
        notifications.slice(0, 3).forEach((n) => {
          addLog(`   ├─ ${n.title}`, "orange");
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  async function addTestHotel() {
    const newHotel = {
      name: `Test Hotel ${new Date().getTime()}`,
      location: "Test City",
      description: "This is a test hotel",
      price: Math.floor(Math.random() * 5000) + 3000,
      type: "Hotel",
      rating: 4.5,
      reviews: Math.floor(Math.random() * 200),
      img: "https://images.unsplash.com/photo-1566996122411-7521f3d57fbd?w=400",
      amenities: ["WiFi", "Pool"],
      totalRooms: 50,
    };

    try {
      await addHotel(newHotel);
      addLog(`✅ New hotel added: ${newHotel.name}`, "green");
    } catch (error) {
      addLog(`❌ Error adding hotel: ${error.message}`, "red");
    }
  }

  async function addTestNotification() {
    try {
      await addNotification("demo-user-123", {
        title: `🧪 Test Notif ${new Date().getHours()}:${new Date().getMinutes()}`,
        message: `This is a test notification at ${new Date().toLocaleTimeString()}`,
        type: "test",
      });
      addLog("✅ Test notification added", "green");
    } catch (error) {
      addLog(`❌ Error adding notification: ${error.message}`, "red");
    }
  }

  function clearLogs() {
    setLogs([]);
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Courier New, monospace",
        background: "#1e1e1e",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1>🧪 Firestore Real-time Testing Dashboard</h1>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background: "#0066cc",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {hotels.length}
          </div>
          <div>🏨 Hotels</div>
        </div>
        <div
          style={{
            background: "#00aa00",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {bookings.length}
          </div>
          <div>📅 Bookings</div>
        </div>
        <div
          style={{
            background: "#ff6600",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {notifications.length}
          </div>
          <div>🔔 Notifications</div>
        </div>
        <div
          style={{
            background: "#9900cc",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {logs.length}
          </div>
          <div>📝 Events</div>
        </div>
      </div>

      {/* TEST BUTTONS */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={addTestHotel}
          style={{
            background: "#0066cc",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ➕ Add Test Hotel
        </button>

        <button
          onClick={addTestNotification}
          style={{
            background: "#ff6600",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔔 Add Test Notification
        </button>

        <button
          onClick={clearLogs}
          style={{
            background: "#666",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🗑️ Clear Logs
        </button>

        <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />
          Auto-refresh
        </label>
      </div>

      {/* HOTELS LIST */}
      <div
        style={{
          background: "#2a2a2a",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #444",
        }}
      >
        <h3>🏨 Hotels in Real-time</h3>
        {hotelsLoading ? (
          <p>⏳ Loading hotels...</p>
        ) : hotels.length === 0 ? (
          <p style={{ color: "#ff6600" }}>
            ⚠️ No hotels found. Add one using the button above or Firebase Console.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "10px",
            }}
          >
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                style={{
                  background: "#333",
                  border: "1px solid #0066cc",
                  padding: "10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                <strong style={{ color: "#0066cc" }}>{hotel.name}</strong>
                <p>
                  {hotel.location} | ⭐ {hotel.rating}
                </p>
                <p style={{ color: "#00ff00" }}>₹{hotel.price}/night</p>
                <p style={{ color: "#aaa" }}>ID: {hotel.id.substring(0, 8)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOOKINGS LIST */}
      <div
        style={{
          background: "#2a2a2a",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #444",
        }}
      >
        <h3>📅 Bookings in Real-time</h3>
        {bookingsLoading ? (
          <p>⏳ Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p style={{ color: "#ff6600" }}>
            ℹ️ No bookings yet. Make a booking from FirestoreDemoPage.
          </p>
        ) : (
          <div style={{ display: "grid", gap: "10px" }}>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  background: "#333",
                  border: "2px solid #00aa00",
                  padding: "10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                <strong style={{ color: "#00ff00" }}>
                  {booking.hotelName}
                </strong>
                <p>
                  Rooms: {booking.rooms} | Guests: {booking.guests}
                </p>
                <p>
                  Total: <span style={{ color: "#00ff00" }}>₹{booking.totalPrice}</span>
                </p>
                <p>
                  Status:{" "}
                  <span
                    style={{
                      color:
                        booking.status === "confirmed" ? "#00ff00" : "#ffaa00",
                      fontWeight: "bold",
                    }}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </p>
                <p style={{ color: "#aaa" }}>ID: {booking.id.substring(0, 8)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NOTIFICATIONS LIST */}
      <div
        style={{
          background: "#2a2a2a",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #444",
        }}
      >
        <h3>🔔 Notifications in Real-time</h3>
        {notifications.length === 0 ? (
          <p style={{ color: "#ff6600" }}>ℹ️ No notifications yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "8px" }}>
            {notifications.slice(0, 5).map((notif) => (
              <div
                key={notif.id}
                style={{
                  background: notif.isRead ? "#333" : "#445500",
                  border: "1px solid #ff6600",
                  padding: "10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                <strong style={{ color: "#ffaa00" }}>
                  {notif.title}
                  {!notif.isRead && " (NEW)"}
                </strong>
                <p>{notif.message}</p>
                <p style={{ color: "#aaa" }}>
                  {new Date(notif.createdAt.toDate()).toLocaleTimeString()}
                </p>
              </div>
            ))}
            {notifications.length > 5 && (
              <p style={{ color: "#aaa" }}>
                ... and {notifications.length - 5} more
              </p>
            )}
          </div>
        )}
      </div>

      {/* CONSOLE LOGS */}
      <div
        style={{
          background: "#000",
          border: "1px solid #00ff00",
          borderRadius: "4px",
          padding: "15px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <h3 style={{ color: "#00ff00", margin: "0 0 10px 0" }}>
          📝 Real-time Event Log
        </h3>
        {logs.length === 0 ? (
          <p style={{ color: "#666" }}>
            Waiting for events... (Updates appear here in real-time)
          </p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              style={{
                color: log.color || "white",
                marginBottom: "5px",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            >
              <span style={{ color: "#666" }}>[{log.timestamp}]</span> {log.message}
            </div>
          ))
        )}
      </div>

      {/* INSTRUCTIONS */}
      <div
        style={{
          background: "#1a3a1a",
          border: "1px solid #00aa00",
          borderRadius: "8px",
          padding: "15px",
          marginTop: "20px",
          fontSize: "12px",
        }}
      >
        <h4 style={{ color: "#00ff00", margin: "0 0 10px 0" }}>
          📖 How to Test Real-time:
        </h4>
        <ol style={{ margin: "0", paddingLeft: "20px", color: "#aaa" }}>
          <li>Click "➕ Add Test Hotel" - watch it appear instantly</li>
          <li>
            Go to Firebase Console → Firestore → Edit a hotel price
            <br />
            <strong style={{ color: "#00ff00" }}>→ Page updates instantly!</strong>
          </li>
          <li>Click "🔔 Add Test Notification" - watch it appear</li>
          <li>
            Open this page in another tab
            <br />
            <strong style={{ color: "#00ff00" }}>
              → Both tabs sync in real-time!
            </strong>
          </li>
          <li>
            Open browser DevTools (F12) → Network tab
            <br />
            <strong style={{ color: "#00ff00" }}>
              → See WebSocket connections (not HTTP!)
            </strong>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default FirestoreTestingPage;
