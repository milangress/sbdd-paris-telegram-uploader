import { InputFile } from 'grammy';
import path from 'path';
import fs from 'fs-extra';
import type { MyContext } from '../types';
import { createNewFolder, saveFile, createNoteFile } from '../utils/file';

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

  // Set session data
  ctx.session.step = 'awaiting_description';
  ctx.session.fileId = photo.file_id;
  ctx.session.fileType = 'photo';
  
  await ctx.reply('Photo received! Please provide a description for this photo.');
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

  // Set session data
  ctx.session.step = 'awaiting_description';
  ctx.session.fileId = video.file_id;
  ctx.session.fileType = 'video';
  
  await ctx.reply('Video received! Please provide a description for this video.');
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

  // Set session data
  ctx.session.step = 'awaiting_description';
  ctx.session.fileId = audio.file_id;
  ctx.session.fileType = 'audio';
  
  await ctx.reply('Audio received! Please provide a description for this audio.');
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

  // Set session data
  ctx.session.step = 'awaiting_description';
  ctx.session.fileType = 'text';
  ctx.session.description = text; // For text, we use the text itself as content
  
  await ctx.reply('Text received! Please provide a description for this text (or send "same" to use the text itself as the description).');
};

/**
 * Finalizes the upload process and saves everything to Kirby
 */
export const finalizeUpload = async (ctx: MyContext): Promise<void> => {
  try {
    // Create a new folder for this upload
    const targetFolder = await createNewFolder();
    ctx.session.targetFolder = targetFolder;
    
    // Handle different file types
    if (ctx.session.fileType === 'text') {
      // For text, we create a text file with the content
      const textFilePath = path.join(targetFolder, 'content.txt');
      await fs.writeFile(textFilePath, ctx.session.description || '', 'utf8');
    } else if (ctx.session.fileId) {
      // For media files, download from Telegram
      const fileInfo = await ctx.api.getFile(ctx.session.fileId);
      
      // Telegram Bot API doesn't provide direct file URLs, so we need to construct it
      const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${fileInfo.file_path}`;
      
      // Get file extension from the original path
      const fileExt = path.extname(fileInfo.file_path || '');
      const fileName = `content${fileExt}`;
      
      // Download the file to a temporary location
      const tempFilePath = path.join(process.cwd(), 'temp', fileName);
      await fs.ensureDir(path.dirname(tempFilePath));
      
      // Use node-fetch to download the file
      const response = await fetch(fileUrl);
      const buffer = await response.arrayBuffer();
      await fs.writeFile(tempFilePath, Buffer.from(buffer));
      
      // Save the file to the target folder
      await saveFile(tempFilePath, targetFolder, fileName);
      
      // Clean up the temporary file
      await fs.remove(tempFilePath);
    }
    
    // Create the note.txt file with all the metadata
    await createNoteFile(targetFolder, {
      description: ctx.session.description || 'No description provided',
      orientation: ctx.session.orientation || 'Not specified',
      tarotCard: ctx.session.tarotCard || 'Not specified',
      fileType: ctx.session.fileType || 'unknown',
      dateUploaded: new Date().toISOString()
    });
    
    // Notify the user
    await ctx.reply(`✅ Upload complete! Your ${ctx.session.fileType} has been saved to Kirby CMS.`);
    
    // Reset session
    ctx.session.step = 'idle';
    ctx.session.fileId = undefined;
    ctx.session.fileType = undefined;
    ctx.session.fileName = undefined;
    ctx.session.filePath = undefined;
    ctx.session.description = undefined;
    ctx.session.orientation = undefined;
    ctx.session.tarotCard = undefined;
    ctx.session.targetFolder = undefined;
    
  } catch (error) {
    console.error('Error finalizing upload:', error);
    await ctx.reply('❌ There was an error saving your upload. Please try again.');
    
    // Reset session on error
    ctx.session.step = 'idle';
  }
}; 