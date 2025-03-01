import path from 'path';
import { readFile, writeFile } from 'node:fs/promises';
import type { KirbyNote } from '../types';
import { KIRBY_COLLECTION_DIR_ABSOLUTE } from '../config';

/**
 * Generates a random 16-character string for UUID
 * @returns A random 16-character string
 */
export const generateUuid = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Saves a file to the Kirby content directory with a UUID
 * @param filePath Path to the source file
 * @param fileExtension Original file extension
 * @returns Object containing the saved file path and UUID
 */
export const saveFileToKirby = async (
  filePath: string,
  fileExtension: string
): Promise<{ savedPath: string; uuid: string }> => {
  // Generate UUID
  const uuid = generateUuid();
  
  // Create filename with UUID
  const fileName = `${uuid}.${fileExtension}`;
  
  // Target path in Kirby content directory
  const targetPath = path.join(KIRBY_COLLECTION_DIR_ABSOLUTE, fileName);
  
  // Read the file content
  const fileContent = await readFile(filePath);
  
  // Write to the target location
  await writeFile(targetPath, fileContent);
  
  // Create the UUID text file
  await createUuidFile(targetPath, uuid);
  
  return { savedPath: targetPath, uuid };
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

  await writeFile(txtPath, content);
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
  
  // Read the current content
  const content = await readFile(siteTxtPath, 'utf-8');
  
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
      tarot_suit: tarotCard.toLowerCase().replace(/\s+/g, ''),
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
  
  // Write the updated content back to the file
  await writeFile(siteTxtPath, updatedContent);
  
  return updatedContent;
}; 