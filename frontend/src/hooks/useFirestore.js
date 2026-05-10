import { useEffect, useState } from "react";
import {
  subscribeToHotels,
  subscribeToUserBookings,
  subscribeToUserNotifications,
  subscribeToHotel,
  subscribeToHotelReviews,
} from "../services/firestoreService";

// Hook for real-time hotels
export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = subscribeToHotels((data) => {
        setHotels(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  return { hotels, loading, error };
};

// Hook for real-time user bookings
export const useUserBookings = (userId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setBookings([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const unsubscribe = subscribeToUserBookings(userId, (data) => {
        setBookings(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [userId]);

  return { bookings, loading, error };
};

// Hook for real-time user notifications
export const useUserNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const unsubscribe = subscribeToUserNotifications(userId, (data) => {
        setNotifications(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [userId]);

  return { notifications, loading, error };
};

// Hook for real-time single hotel
export const useSingleHotel = (hotelId) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hotelId) {
      setHotel(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const unsubscribe = subscribeToHotel(hotelId, (data) => {
        setHotel(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [hotelId]);

  return { hotel, loading, error };
};

// Hook for real-time hotel reviews
export const useHotelReviews = (hotelId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hotelId) {
      setReviews([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const unsubscribe = subscribeToHotelReviews(hotelId, (data) => {
        setReviews(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [hotelId]);

  return { reviews, loading, error };
};
