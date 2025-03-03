import { InputFile } from 'grammy';
import path from 'path';
import { mkdir } from 'node:fs/promises';
import type { MyContext } from '../types';
import { generateUuid, createUuidFile, updateSiteTxt } from '../utils/file';
import { resetSession } from '../utils/reset';
import { KIRBY_COLLECTION_DIR_ABSOLUTE } from '../config';
import { showTarotCardSelection } from './keyboardHandler';
import { isBotLocked } from '../utils/lockState';

/**
 * Shared function to handle media uploads
 */
const handleMediaUpload = async (
  ctx: MyContext, 
  fileId: string, 
  fileType: 'photo' | 'video' | 'audio',
): Promise<void> => {
  try {
    // Generate UUID immediately
    const uuid = generateUuid();
    
    // Get file extension based on media type
    const fileExtension = fileType === 'photo' ? 'jpg' : fileType === 'video' ? 'mp4' : 'oga';
    
    // Download the file directly to the Kirby content directory with UUID filename
  
    const file = await ctx.getFile();
    const fileName = `${uuid}.${fileExtension}`;
    const targetPath = path.join(KIRBY_COLLECTION_DIR_ABSOLUTE, fileName);
    
    // Download to the final location
    await file.download(targetPath);
    
    // Create the UUID text file
    await createUuidFile(targetPath, uuid);
    
    // Set session data
    ctx.session.fileId = fileId;
    ctx.session.fileType = fileType;
    ctx.session.uuid = uuid;
    
    // If bot is locked, just save the file and reset
    if (isBotLocked()) {
      await ctx.reply(`🏛️ Your offering has been placed in the temple archives (use kirby to add the card to the collection)`);
      await resetSession(ctx);
      return;
    }
    
    // Move directly to tarot card selection if not locked
    await showTarotCardSelection(ctx);
  } catch (error: unknown) {
    console.error(`Error processing ${fileType}:`, error);
    await ctx.reply(`👹 Failed to process ${fileType}. The operation could not be completed due to an error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    await ctx.reply(`The gods are silent on this matter`);
    await ctx.reply(`UPLOAD FAILED!!`);
    
    // Reset the session to prevent getting stuck in a loop
    await resetSession(ctx);
  }
};

/**
 * Handles photo uploads
 */
export const handlePhoto = async (ctx: MyContext): Promise<void> => {
  // Get the largest photo (best quality)
  const photo = ctx.msg?.photo?.slice(-1)[0];
  if (!photo) {
    await ctx.reply('Failed to process photo. Please try again.');
    return;
  }
  
  await handleMediaUpload(ctx, photo.file_id, 'photo');
};

/**
 * Handles video uploads
 */
export const handleVideo = async (ctx: MyContext): Promise<void> => {
  const video = ctx.msg?.video;
  if (!video) {
    await ctx.reply('Failed to process video. Please try again.');
    return;
  }
  
  await handleMediaUpload(ctx, video.file_id, 'video');
};

/**
 * Handles audio uploads
 */
export const handleAudio = async (ctx: MyContext): Promise<void> => {
  const audio = ctx.msg?.audio || ctx.msg?.voice;
  if (!audio) {
    await ctx.reply('Failed to process audio. Please try again.');
    return;
  }
  
  await handleMediaUpload(ctx, audio.file_id, 'audio');
};

/**
 * Handles text messages as content
 */
export const handleText = async (ctx: MyContext): Promise<void> => {
  // Only handle text as content if we're in idle state
  if (ctx.session.step !== 'idle') return;
  
  const text = ctx.msg?.text;
  if (!text) {
    await ctx.reply('Failed to process text. Please try again.');
    return;
  }

  // If bot is locked, reject text messages since they can't be saved
  if (isBotLocked()) {
    await ctx.reply('🏛️ Alas, in this simple mode, I can only accept physical offerings - photos, songs, and moving pictures. Text messages are too... mortal.');
    return;
  }

  try {
    await ctx.reply(`Ah, a tale worth preserving in the scrolls of time! 📜 "${text}"`);
    await ctx.reply(`are you really trying to create a new card with this text on the front?`);
    await ctx.reply(`(Should you wish to start anew, simply whisper /reset to me)`);
    
    // Generate UUID for text
    const uuid = generateUuid();
    
    // For text, we don't need to save a file, just set the session data
    ctx.session.fileType = 'text';
    ctx.session.description = text; // For text, we use the text itself as content
    ctx.session.uuid = uuid;
    
    // Move directly to tarot card selection
    await showTarotCardSelection(ctx);
  } catch (error: unknown) {
    console.error('Error processing text:', error);
    await ctx.reply(`👹 Failed to process text. The operation could not be completed due to an error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    
    // Reset the session to prevent getting stuck in a loop
    await resetSession(ctx);
  }
};

/**
 * Finalizes the upload process and saves metadata to Kirby
 */
export const finalizeUpload = async (ctx: MyContext): Promise<void> => {
  try {
    // Update the site.txt file with the new card data
    await updateSiteTxt(
      ctx.session.uuid || generateUuid(),
      ctx.session.fileType || 'unknown',
      ctx.session.description || '',
      ctx.session.orientation || '',
      ctx.session.tarotCard || '',
      ctx.session.house || ''
    );
    
    // Notify the user
    await ctx.reply(`🐲 Upload complete! Your ${ctx.session.fileType} has been saved to Kirby CMS.`);
        
  } catch (error: unknown) {
    console.error('👹 Error finalizing upload:', error);
    await ctx.reply(` There was an error saving your upload: ${error instanceof Error ? error.message : 'Unknown error'}`);
    await ctx.reply(`The gods are silent on this matter`);
    await ctx.reply(`Use Kirby to save your upload`);
    
  } finally {
    await resetSession(ctx);
  }
}; 