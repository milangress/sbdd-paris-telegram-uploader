import { InputFile } from 'grammy';
import path from 'path';
import { mkdir } from 'node:fs/promises';
import type { MyContext } from '../types';
import { saveFileToKirby, generateUuid, updateSiteTxt } from '../utils/file';
import { resetSession } from '../utils/reset';

/**
 * Shared function to handle media uploads
 */
const handleMediaUpload = async (
  ctx: MyContext, 
  fileId: string, 
  fileType: 'photo' | 'video' | 'audio',
): Promise<void> => {
  try {
    // Download the file to a temporary location first
    const file = await ctx.getFile();
    
    // Get filename from file path or message, fallback to generic name
    const fileName = file.file_path 
      ? path.basename(file.file_path)
      : (fileType !== 'photo' && ctx?.msg?.[fileType]?.file_name) 
        ? ctx.msg[fileType].file_name
        : `content.${fileType}`;
    
    // Create a temporary path for the download
    const tempDir = path.join(process.cwd(), 'temp');
    await mkdir(tempDir, { recursive: true });
    const tempPath = path.join(tempDir, fileName);
    
    // Download to the temporary location
    await file.download(tempPath);
    
    // Get file extension
    const fileExtension = path.extname(fileName).slice(1) || fileType;
    
    // Set session data
    ctx.session.step = 'awaiting_description';
    ctx.session.fileId = fileId;
    ctx.session.fileType = fileType;
    ctx.session.fileName = fileName;
    ctx.session.filePath = tempPath;
    
    await ctx.reply(`${fileType} received! Please provide a description for this ${fileType}.`);
  } catch (error) {
    console.error(`Error processing ${fileType}:`, error);
    await ctx.reply(`Failed to process ${fileType}. Please try again.`);
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

  try {
    // For text, we don't need to save a file, just set the session data
    ctx.session.step = 'awaiting_description';
    ctx.session.fileType = 'text';
    ctx.session.description = text; // For text, we use the text itself as content
    
    await ctx.reply('Text received! Please provide a description for this text (or send "same" to use the text itself as the description).');
  } catch (error) {
    console.error('Error processing text:', error);
    await ctx.reply('Failed to process text. Please try again.');
  }
};

/**
 * Finalizes the upload process and saves metadata to Kirby
 */
export const finalizeUpload = async (ctx: MyContext): Promise<void> => {
  try {
    // Generate a UUID for the file
    const uuid = generateUuid();
    
    // For non-text content, save the file to Kirby
    if (ctx.session.fileType !== 'text' && ctx.session.filePath) {
      const fileExtension = path.extname(ctx.session.fileName || '').slice(1) || ctx.session.fileType || '';
      const { savedPath, uuid: fileUuid } = await saveFileToKirby(ctx.session.filePath, fileExtension);
      ctx.session.uuid = fileUuid;
    } else if (ctx.session.fileType === 'text') {
      // For text, we don't need to save a file, just generate a UUID
      ctx.session.uuid = uuid;
    }
    
    // Update the site.txt file with the new card data
    await updateSiteTxt(
      ctx.session.uuid || uuid,
      ctx.session.fileType || 'unknown',
      ctx.session.description || 'No description provided',
      ctx.session.orientation || 'Not specified',
      ctx.session.tarotCard || 'Not specified',
      ctx.session.house || 'house1'
    );
    
    // Notify the user
    await ctx.reply(`✅ Upload complete! Your ${ctx.session.fileType} has been saved to Kirby CMS.`);
        
  } catch (error) {
    console.error('Error finalizing upload:', error);
    await ctx.reply('❌ There was an error saving your upload. Please try again.');
    
  } finally {
    await resetSession(ctx);
  }
}; 