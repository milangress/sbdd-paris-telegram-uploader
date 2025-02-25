import { Context } from 'grammy';

// Session data for storing user's upload progress
export interface SessionData {
  // Current step in the upload process
  step: 'idle' | 'awaiting_description' | 'awaiting_orientation' | 'awaiting_tarot_card';
  
  // File information
  fileId?: string;
  fileType?: 'photo' | 'video' | 'audio' | 'text';
  fileName?: string;
  filePath?: string;
  
  // User responses
  description?: string;
  orientation?: string;
  tarotCard?: string;
  
  // Folder where the file will be saved
  targetFolder?: string;
}

// Extended context with session data
export interface MyContext extends Context {
  session: SessionData;
}

// Kirby note file structure
export interface KirbyNote {
  description: string;
  orientation: string;
  tarotCard: string;
  fileType: string;
  dateUploaded: string;
} 