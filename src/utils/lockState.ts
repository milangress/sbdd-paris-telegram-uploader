/**
 * Simple module to manage the global lock state of the bot
 * This state is shared across all users
 */

// Global lock state
let isLocked = false;

/**
 * Lock the bot for all users
 * @returns {boolean} The new lock state
 */
export function lockBot(): boolean {
  isLocked = true;
  return isLocked;
}

/**
 * Unlock the bot for all users
 * @returns {boolean} The new lock state
 */
export function unlockBot(): boolean {
  isLocked = false;
  return isLocked;
}

/**
 * Check if the bot is currently locked
 * @returns {boolean} The current lock state
 */
export function isBotLocked(): boolean {
  return isLocked;
} 