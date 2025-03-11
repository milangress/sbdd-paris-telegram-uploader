import path from 'path';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import type { KirbyNote } from '../types';
import { KIRBY_COLLECTION_DIR_ABSOLUTE } from '../config';

/**
 * Generates a random 16-character string for UUID
 * @returns A random 16-character string
 */
export const generateUuid = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Creates a backup of the site.txt file
 * @param content The content to backup
 * @param suffix Optional suffix to add to the backup filename
 * @returns The path to the backup file
 */
export const createSiteBackup = async (
  content: string,
  suffix: string = ''
): Promise<string> => {
  // Create backup directory if it doesn't exist
  const backupDir = path.join(KIRBY_COLLECTION_DIR_ABSOLUTE, 'site-txt-bak');
  if (!existsSync(backupDir)) {
    await mkdir(backupDir, { recursive: true });
  }
  
  // Create a timestamp for the backup filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFileName = `site-${timestamp}${suffix ? '-' + suffix : ''}.txt`;
  const backupPath = path.join(backupDir, backupFileName);
  
  // Write the backup file using Bun.write
  await Bun.write(backupPath, content);
  
  return backupPath;
};

/**
 * Creates a .txt file with the UUID
 * @param filePath Path to the file
 * @param uuid The UUID to save
 * @returns The path to the created text file
 */
export const createUuidFile = async (
  filePath: string,
  uuid: string
): Promise<string> => {
  const txtPath = `${filePath}.txt`;
  
  // Format the content with just the UUID
  const content = `Uuid: ${uuid}`;

  // Write using Bun.write
  await Bun.write(txtPath, content);
  
  return txtPath;
};

/**
 * Updates the site.txt file with the new card data
 * @param uuid The UUID of the file
 * @param fileType The type of file (photo, video, audio, text)
 * @param description The description of the file
 * @param orientation The orientation of the file
 * @param tarotCard The tarot card associated with the file
 * @param house The house associated with the file
 * @returns The updated site.txt content
 */
export const updateSiteTxt = async (
  uuid: string,
  fileType: string,
  description: string,
  orientation: string,
  tarotCard: string,
  house: string
): Promise<string> => {
  // Path to site.txt
  const siteTxtPath = path.join(KIRBY_COLLECTION_DIR_ABSOLUTE, 'site.txt');
  
  try {
    // Read the current content using Bun.file
    const siteFile = Bun.file(siteTxtPath);
    const content = await siteFile.text();
    
    // Create a backup of the original content
    await createSiteBackup(content, 'before');
    
    // Find the Cardscontent field
    const cardsContentMatch = content.match(/Cardscontent: (.*?)(\n----|\n<CURRENT_CURSOR_POSITION>)/s);
    
    if (!cardsContentMatch) {
      throw new Error('Could not find Cardscontent field in site.txt');
    }
    
    // Parse the JSON array
    const cardsContent = JSON.parse(cardsContentMatch[1]);
    
    // Create media content based on file type
    let mediaContent;
    if (fileType === 'photo') {
      mediaContent = `[{"content":{"location":"kirby","image":["file://${uuid}"],"src":"","alt":"","caption":"","link":"","ratio":"","crop":"false"},"id":"${generateUuid()}","isHidden":false,"type":"image"}]`;
    } else if (fileType === 'video') {
      mediaContent = `[{"content":{"vidfile":["file://${uuid}"],"vidposter":[],"class":"","controls":"false","mute":"false","autoplay":"false","loop":"false","playsinline":"false","preload":"metadata"},"id":"${generateUuid()}","isHidden":false,"type":"localvideo"}]`;
    } else if (fileType === 'audio') {
      mediaContent = `[{"content":{"audiofile":["file://${uuid}"]},"id":"${generateUuid()}","isHidden":false,"type":"audio"}]`;
    } else if (fileType === 'text') {
      mediaContent = `[{"content":{"text":"<p>${description}</p>"},"id":"${generateUuid()}","isHidden":false,"type":"text"}]`;
    }
    
    // Create new card object
    const newCard = {
      content: {
        media: mediaContent,
        tarot_suit: tarotCard,
        description: description,
        orientation: orientation,
        house: house,
        addedby: [],
        date: new Date().toISOString().split('T')[0]
      },
      id: generateUuid(),
      isHidden: false,
      type: "tarotCard"
    };
    
    // Add the new card to the array
    cardsContent.push(newCard);
    
    // Replace the Cardscontent field in the file
    const updatedContent = content.replace(
      /Cardscontent: (.*?)(\n----|\n<CURRENT_CURSOR_POSITION>)/s,
      `Cardscontent: ${JSON.stringify(cardsContent)}$2`
    );
    
    // Write the updated content back to the file using Bun.write
    await Bun.write(siteTxtPath, updatedContent);
    
    // Create a backup of the updated content
    await createSiteBackup(updatedContent, 'after');
    
    return updatedContent;
  } catch (error: unknown) {
    console.error('Error updating site.txt:', error);
    throw new Error(`Failed to update site.txt: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 