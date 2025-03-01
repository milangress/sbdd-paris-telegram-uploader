import { Context, type SessionFlavor } from 'grammy';
import type { FileFlavor } from '@grammyjs/files';
// Session data for storing user's upload progress
export interface SessionData {
  // Current step in the upload process
  step: 'idle' | 'awaiting_orientation' | 'awaiting_tarot_card' | 'awaiting_tarot_confirmation' | 'awaiting_house';
  
  // File information
  fileId?: string;
  fileType?: 'photo' | 'video' | 'audio' | 'text';
  
  // User responses
  description?: string;
  orientation?: string;
  tarotCard?: string;
  house?: string;
  uuid?: string;
}

// Extended context with both session data and file flavor
export type MyContext = FileFlavor<Context & SessionFlavor<SessionData>>;

// Kirby note file structure
export interface KirbyNote {
  uuid: string;
} 