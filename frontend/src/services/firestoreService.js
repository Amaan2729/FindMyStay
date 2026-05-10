import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

// ==================== HOTELS ====================

export const addHotel = async (hotelData) => {
  try {
    const docRef = await addDoc(collection(db, "hotels"), {
      ...hotelData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { id: docRef.id, ...hotelData };
  } catch (error) {
    console.error("Error adding hotel:", error);
    throw error;
  }
};

export const getAllHotels = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "hotels"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};

export const getHotelById = async (hotelId) => {
  try {
    const docRef = doc(db, "hotels", hotelId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching hotel:", error);
    throw error;
  }
};

export const updateHotel = async (hotelId, hotelData) => {
  try {
    const docRef = doc(db, "hotels", hotelId);
    await updateDoc(docRef, {
      ...hotelData,
      updatedAt: Timestamp.now(),
    });
    return { id: hotelId, ...hotelData };
  } catch (error) {
    console.error("Error updating hotel:", error);
    throw error;
  }
};

export const deleteHotel = async (hotelId) => {
  try {
    await deleteDoc(doc(db, "hotels", hotelId));
  } catch (error) {
    console.error("Error deleting hotel:", error);
    throw error;
  }
};

// ==================== BOOKINGS ====================

const normalizeDateValue = (value) => {
  if (!value) return null;
  if (typeof value === "string") {
    return Timestamp.fromDate(new Date(value));
  }
  if (value instanceof Date) {
    return Timestamp.fromDate(value);
  }
  return value;
};

export const addBooking = async (bookingData, userId) => {
  try {
    const normalizedBooking = {
      ...bookingData,
      checkin: normalizeDateValue(bookingData.checkin),
      checkout: normalizeDateValue(bookingData.checkout),
      userId,
      status: "pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "bookings"), normalizedBooking);
    return { id: docRef.id, ...normalizedBooking };
  } catch (error) {
    console.error("Error adding booking:", error);
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const docRef = doc(db, "bookings", bookingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

export const updateBooking = async (bookingId, bookingData) => {
  try {
    const docRef = doc(db, "bookings", bookingId);
    await updateDoc(docRef, {
      ...bookingData,
      updatedAt: Timestamp.now(),
    });
    return { id: bookingId, ...bookingData };
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const docRef = doc(db, "bookings", bookingId);
    await updateDoc(docRef, {
      status: "cancelled",
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw error;
  }
};

// ==================== REVIEWS ====================

export const addReview = async (hotelId, userId, reviewData) => {
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      hotelId,
      userId,
      userName: reviewData.userName || "Guest",
      rating: Number(reviewData.rating) || 0,
      comment: reviewData.comment || "",
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, hotelId, userId, ...reviewData };
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const getHotelReviews = async (hotelId) => {
  try {
    const q = query(
      collection(db, "reviews"),
      where("hotelId", "==", hotelId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching hotel reviews:", error);
    throw error;
  }
};

export const subscribeToHotelReviews = (hotelId, callback) => {
  try {
    const q = query(
      collection(db, "reviews"),
      where("hotelId", "==", hotelId),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviews = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(reviews);
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error subscribing to hotel reviews:", error);
    throw error;
  }
};

// ==================== NOTIFICATIONS ====================

export const addNotification = async (userId, notificationData) => {
  try {
    const docRef = await addDoc(collection(db, "notifications"), {
      ...notificationData,
      userId,
      isRead: false,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...notificationData };
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error;
  }
};

export const getUserNotifications = async (userId) => {
  try {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const docRef = doc(db, "notifications", notificationId);
    await updateDoc(docRef, {
      isRead: true,
      readAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    await deleteDoc(doc(db, "notifications", notificationId));
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

// ==================== REAL-TIME LISTENERS ====================

// Real-time listener for all hotels
export const subscribeToHotels = (callback) => {
  try {
    const unsubscribe = onSnapshot(collection(db, "hotels"), (querySnapshot) => {
      const hotels = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(hotels);
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error subscribing to hotels:", error);
    throw error;
  }
};

// Real-time listener for user bookings
export const subscribeToUserBookings = (userId, callback) => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(bookings);
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error subscribing to user bookings:", error);
    throw error;
  }
};

// Real-time listener for user notifications
export const subscribeToUserNotifications = (userId, callback) => {
  try {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notifications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(notifications);
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error subscribing to notifications:", error);
    throw error;
  }
};

// Real-time listener for a single hotel
export const subscribeToHotel = (hotelId, callback) => {
  try {
    const docRef = doc(db, "hotels", hotelId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: docSnap.id, ...docSnap.data() });
      }
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error subscribing to hotel:", error);
    throw error;
  }
};
