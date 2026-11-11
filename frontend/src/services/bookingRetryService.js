/**
 * Booking Retry Service
 * Handles persistent retry of failed booking confirmations using localStorage
 * Runs periodic checks to retry failed bookings
 */

import { toast } from "react-toastify";

const RETRY_INTERVAL = 30000; // Check every 30 seconds
const MAX_TOTAL_RETRIES = 10; // Max attempts across all retries
const BACKOFF_MULTIPLIER = 1.5;
const RETRY_QUEUE_PREFIX = "booking_queue_";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

/**
 * Start the retry manager - call this once when app loads
 */
export function startBookingRetryManager() {
  console.log("🔄 Starting booking retry manager...");

  // Initial check
  processRetryQueue();

  // Periodic checks every 30 seconds
  setInterval(() => {
    processRetryQueue();
  }, RETRY_INTERVAL);
}

/**
 * Process all failed bookings in the retry queue
 */
async function processRetryQueue() {
  const keys = Object.keys(localStorage).filter((k) =>
    k.startsWith(RETRY_QUEUE_PREFIX)
  );

  if (keys.length === 0) {
    return; // No items to retry
  }

  console.log(`🔄 Processing ${keys.length} booking(s) from retry queue...`);

  for (const key of keys) {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) continue;

      // Check if max attempts reached
      if (item.attemptCount >= MAX_TOTAL_RETRIES) {
        console.error(
          `❌ Max retries (${MAX_TOTAL_RETRIES}) reached for booking ${item.bookingId}. Removing from queue.`
        );
        toast.error(
          `Booking ${item.bookingId} confirmation failed after multiple attempts. Please contact support.`
        );
        localStorage.removeItem(key);
        continue;
      }

      // Calculate backoff delay
      const timeSinceFirstFailure =
        Date.now() - new Date(item.firstFailedAt).getTime();
      const delayBetweenAttempts =
        Math.pow(BACKOFF_MULTIPLIER, item.attemptCount) * 2000;
      const nextRetryTime = new Date(item.lastAttemptAt).getTime() + delayBetweenAttempts;

      if (Date.now() < nextRetryTime) {
        // Not time to retry yet
        continue;
      }

      console.log(
        `🔁 Retrying booking ${item.bookingId} (attempt ${item.attemptCount + 1}/${MAX_TOTAL_RETRIES})...`
      );

      // Attempt to send to backend
      const success = await sendBookingToBackend(item.payload, item.bookingId);

      if (success) {
        console.log(`✅ Booking ${item.bookingId} confirmed successfully!`);
        toast.success(
          `Booking ${item.bookingId} confirmed! Check your email for details.`
        );
        localStorage.removeItem(key);
      } else {
        // Update retry item with new attempt
        item.attemptCount++;
        item.lastAttemptAt = new Date().toISOString();
        localStorage.setItem(key, JSON.stringify(item));
        console.log(
          `⏳ Booking ${item.bookingId} will retry later (${item.attemptCount}/${MAX_TOTAL_RETRIES})`
        );
      }
    } catch (err) {
      console.error("Error processing retry queue item:", err);
    }
  }
}

/**
 * Send booking to backend
 */
async function sendBookingToBackend(payload, bookingId) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(`${BACKEND_URL}/api/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.warn(
        `Backend returned error for booking ${bookingId}:`,
        body.error || `HTTP ${res.status}`
      );
      return false;
    }

    const data = await res.json().catch(() => ({}));
    console.log(
      `✅ Backend confirmed booking ${bookingId}:`,
      data.booking?.id || data.bookingId
    );
    return true;
  } catch (err) {
    console.warn(`Network/timeout error for booking ${bookingId}:`, err.message);
    return false;
  }
}

/**
 * Get all pending retries (for debugging/UI display)
 */
export function getPendingRetries() {
  const keys = Object.keys(localStorage).filter((k) =>
    k.startsWith(RETRY_QUEUE_PREFIX)
  );

  return keys.map((key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }).filter(Boolean);
}

/**
 * Manually retry a specific booking (for UI button)
 */
export async function manualRetry(bookingId) {
  const key = `${RETRY_QUEUE_PREFIX}${bookingId}`;
  const item = JSON.parse(localStorage.getItem(key));

  if (!item) {
    toast.error("Booking not found in queue");
    return false;
  }

  console.log(`🔁 Manual retry requested for booking ${bookingId}`);
  const success = await sendBookingToBackend(item.payload, bookingId);

  if (success) {
    localStorage.removeItem(key);
    toast.success("Booking confirmed!");
    return true;
  } else {
    item.attemptCount++;
    item.lastAttemptAt = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(item));
    toast.error("Retry failed. Will try again automatically.");
    return false;
  }
}

/**
 * Get stats on retry queue
 */
export function getRetryStats() {
  const pending = getPendingRetries();
  return {
    totalPending: pending.length,
    bookingIds: pending.map((b) => b.bookingId),
    oldestFailure: pending.length > 0 
      ? new Date(Math.min(...pending.map(b => new Date(b.firstFailedAt).getTime())))
      : null,
  };
}
