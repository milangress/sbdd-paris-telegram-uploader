import fs from 'fs-extra';
import path from 'path';
import type { KirbyNote } from '../types';
import { KIRBY_COLLECTION_DIR_ABSOLUTE } from '../config';

/**
 * Creates a new folder with a timestamp-based name in the Kirby collection directory
 * @returns The path to the created folder
 */
export const createNewFolder = async (): Promise<string> => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const folderName = `upload-${timestamp}`;
  
  // Use the absolute path
  const folderPath = path.join(KIRBY_COLLECTION_DIR_ABSOLUTE, folderName);
  
  await fs.ensureDir(folderPath);
  return folderPath;
};

/**
 * Saves a file to the specified folder
 * @param filePath Path to the source file
 * @param targetFolder Path to the target folder
 * @param fileName Name to save the file as
 * @returns The path to the saved file
 */
export const saveFile = async (
  filePath: string,
  targetFolder: string,
  fileName: string
): Promise<string> => {
  const targetPath = path.join(targetFolder, fileName);
  await fs.copy(filePath, targetPath);
  return targetPath;
};

/**
 * Creates a note.txt file in Kirby format
 * @param targetFolder Path to the target folder
 * @param noteData Data to include in the note
 * @returns The path to the created note file
 */
export const createNoteFile = async (
  targetFolder: string,
  noteData: KirbyNote
): Promise<string> => {
  const notePath = path.join(targetFolder, 'note.txt');
  
  // Format the note in Kirby-style YAML format
  const noteContent = `
Title: Upload ${noteData.dateUploaded}

----

Description: ${noteData.description}

----

Orientation: ${noteData.orientation}

----

TarotCard: ${noteData.tarotCard}

----

FileType: ${noteData.fileType}

----

DateUploaded: ${noteData.dateUploaded}
`.trim();

  await fs.writeFile(notePath, noteContent, 'utf8');
  return notePath;
}; 