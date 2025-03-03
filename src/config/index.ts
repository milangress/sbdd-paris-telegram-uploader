import path from 'path';
import { mkdir, appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { ALL_TAROT_CARDS, MAJOR_ARCANA_CARDS, CUPS_CARDS, WANDS_CARDS, SWORDS_CARDS, PENTACLES_CARDS } from '../utils/tarotInfo';

// Logging utility
const LOG_FILE = 'sbdd-paris-telegram-uploader.log';

export const logMessage = async (message: string) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  
  // Log to console
  console.log(logEntry.trim());
  
  try {
    // Ensure we have the absolute path to the log file
    const logPath = path.join(KIRBY_COLLECTION_DIR || process.cwd(), LOG_FILE);
    await appendFile(logPath, logEntry);
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
};

// Bot configuration
export const BOT_TOKEN = Bun.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not defined in .env file');
}

// Kirby CMS directory configuration
export const KIRBY_COLLECTION_DIR = Bun.env.KIRBY_COLLECTION_DIR;
if (!KIRBY_COLLECTION_DIR) {
  throw new Error('KIRBY_COLLECTION_DIR is not defined in .env file');
}

// Convert relative path to absolute path if needed
const absoluteKirbyDir = path.isAbsolute(KIRBY_COLLECTION_DIR) 
  ? KIRBY_COLLECTION_DIR 
  : path.join(process.cwd(), KIRBY_COLLECTION_DIR);

// Create the directory if it doesn't exist
if (!existsSync(absoluteKirbyDir)) {
  await logMessage(`Creating Kirby collection directory: ${absoluteKirbyDir}`);
  try {
    await mkdir(absoluteKirbyDir, { recursive: true });
    await logMessage('Successfully created Kirby collection directory');
  } catch (error) {
    await logMessage(`Failed to create KIRBY_COLLECTION_DIR: ${absoluteKirbyDir}. Error: ${error}`);
    throw new Error(`Failed to create KIRBY_COLLECTION_DIR: ${absoluteKirbyDir}. Error: ${error}`);
  }
}

// Update the export to use the absolute path
export const KIRBY_COLLECTION_DIR_ABSOLUTE = absoluteKirbyDir;

// Optional: Allowed user IDs
export const ALLOWED_USER_IDS = Bun.env.ALLOWED_USER_IDS
  ? Bun.env.ALLOWED_USER_IDS.split(',').map(id => Number(id.trim()))
  : [];

// Tarot cards for selection
export const TAROT_CATEGORIES = [
  { key: 'major', display: 'Major Arcana' },
  { key: 'cups', display: 'Cups' },
  { key: 'wands', display: 'Wands' },
  { key: 'swords', display: 'Swords' },
  { key: 'pentacles', display: 'Pentacles' }
];

// Use the card objects directly from our tarotInfo module
export const TAROT_CARDS = Object.values(ALL_TAROT_CARDS)
  .filter(card => card.category !== 'suit'); // Exclude the suit info cards

// Orientation options
export const ORIENTATIONS = ['landscape', 'portrait'];

// House options
export const HOUSES = ['house1', 'house2', 'house3', 'house4']; 