import path from 'path';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

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
  console.log(`Creating Kirby collection directory: ${absoluteKirbyDir}`);
  try {
    mkdir(absoluteKirbyDir, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to create KIRBY_COLLECTION_DIR: ${absoluteKirbyDir}. Error: ${error}`);
  }
}

// Update the export to use the absolute path
export const KIRBY_COLLECTION_DIR_ABSOLUTE = absoluteKirbyDir;

// Optional: Allowed user IDs
export const ALLOWED_USER_IDS = Bun.env.ALLOWED_USER_IDS
  ? Bun.env.ALLOWED_USER_IDS.split(',').map(id => Number(id.trim()))
  : [];

// Tarot cards list
export const TAROT_CARDS = [
  'The Fool',
  'The Magician',
  'The High Priestess',
  'The Empress',
  'The Emperor',
  'The Hierophant',
  'The Lovers',
  'The Chariot',
  'Strength',
  'The Hermit',
  'Wheel of Fortune',
  'Justice',
  'The Hanged Man',
  'Death',
  'Temperance',
  'The Devil',
  'The Tower',
  'The Star',
  'The Moon',
  'The Sun',
  'Judgement',
  'The World'
];

// Orientation options
export const ORIENTATIONS = ['landscape', 'portrait'];

// House options
export const HOUSES = ['house1', 'house2', 'house3', 'house4']; 