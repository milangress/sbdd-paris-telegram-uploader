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

// Tarot cards list with display names
export const TAROT_CARDS = [
  // Major Arcana
  { key: 'fool', display: 'The Fool' },
  { key: 'magician', display: 'The Magician' },
  { key: 'highpriestess', display: 'The High Priestess' },
  { key: 'empress', display: 'The Empress' },
  { key: 'emperor', display: 'The Emperor' },
  { key: 'hierophant', display: 'The Hierophant' },
  { key: 'lovers', display: 'The Lovers' },
  { key: 'chariot', display: 'The Chariot' },
  { key: 'strength', display: 'Strength' },
  { key: 'hermit', display: 'The Hermit' },
  { key: 'wheeloffortune', display: 'Wheel of Fortune' },
  { key: 'justice', display: 'Justice' },
  { key: 'hangedman', display: 'The Hanged Man' },
  { key: 'death', display: 'Death' },
  { key: 'temperance', display: 'Temperance' },
  { key: 'devil', display: 'The Devil' },
  { key: 'tower', display: 'The Tower' },
  { key: 'star', display: 'The Star' },
  { key: 'moon', display: 'The Moon' },
  { key: 'sun', display: 'The Sun' },
  { key: 'judgment', display: 'Judgement' },
  { key: 'world', display: 'The World' },
  // Tarot Suits
  { key: 'swords', display: 'Swords (Air)' },
  { key: 'wands', display: 'Wands (Fire)' },
  { key: 'cups', display: 'Cups (Water)' },
  { key: 'pentacles', display: 'Pentacles (Earth)' }
];

// Orientation options
export const ORIENTATIONS = ['landscape', 'portrait'];

// House options
export const HOUSES = ['house1', 'house2', 'house3', 'house4']; 