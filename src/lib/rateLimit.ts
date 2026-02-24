/**
 * In-memory rate limiter using sliding window algorithm
 * Tracks requests per identifier (IP address) within a time window
 */

interface RateLimitEntry {
  timestamps: number[];
  lastCleanup: number;
}

// Store rate limit data: identifier -> entry
const rateLimitStore = new Map<string, RateLimitEntry>();

// Time window in milliseconds (default: 1 minute)
const TIME_WINDOW_MS = 60 * 1000;

// Cleanup interval: remove old entries every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

/**
 * Clean up old entries from the rate limit store
 * Removes entries that haven't been accessed recently
 */
function cleanupOldEntries() {
  const now = Date.now();
  const entriesToDelete: string[] = [];

  for (const [identifier, entry] of rateLimitStore.entries()) {
    // Remove timestamps outside the time window
    const cutoffTime = now - TIME_WINDOW_MS;
    entry.timestamps = entry.timestamps.filter(
      (timestamp) => timestamp > cutoffTime,
    );

    // If no recent timestamps and last cleanup was long ago, mark for deletion
    if (
      entry.timestamps.length === 0 &&
      now - entry.lastCleanup > CLEANUP_INTERVAL_MS
    ) {
      entriesToDelete.push(identifier);
    } else {
      entry.lastCleanup = now;
    }
  }

  // Delete old entries
  entriesToDelete.forEach((identifier) => rateLimitStore.delete(identifier));
}

/**
 * Rate limit checker
 * @param identifier - Unique identifier (e.g., IP address)
 * @param limit - Maximum number of requests allowed within the time window
 * @returns true if request is allowed, false if rate limited
 */
export function rateLimit(identifier: string, limit: number): boolean {
  const now = Date.now();
  const cutoffTime = now - TIME_WINDOW_MS;

  // Get or create entry for this identifier
  let entry = rateLimitStore.get(identifier);

  if (!entry) {
    entry = {
      timestamps: [],
      lastCleanup: now,
    };
    rateLimitStore.set(identifier, entry);
  }

  // Remove timestamps outside the time window
  entry.timestamps = entry.timestamps.filter(
    (timestamp) => timestamp > cutoffTime,
  );

  // Check if limit exceeded
  if (entry.timestamps.length >= limit) {
    return false; // Rate limited
  }

  // Add current timestamp
  entry.timestamps.push(now);
  entry.lastCleanup = now;

  // Periodic cleanup (every N requests or time-based)
  // Cleanup happens randomly to avoid all requests triggering cleanup
  if (Math.random() < 0.01) {
    // 1% chance to trigger cleanup
    cleanupOldEntries();
  }

  return true; // Request allowed
}

/**
 * Reset rate limit for a specific identifier
 * Useful for testing or manual reset
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Get current request count for an identifier
 * Useful for debugging or displaying remaining requests
 */
export function getRateLimitCount(identifier: string): number {
  const entry = rateLimitStore.get(identifier);
  if (!entry) {
    return 0;
  }

  const now = Date.now();
  const cutoffTime = now - TIME_WINDOW_MS;
  entry.timestamps = entry.timestamps.filter(
    (timestamp) => timestamp > cutoffTime,
  );

  return entry.timestamps.length;
}

