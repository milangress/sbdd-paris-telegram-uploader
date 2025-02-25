import { InputFile } from 'grammy';
import path from 'path';
import { mkdir } from 'node:fs/promises';
import type { MyContext } from '../types';
import type { FileFlavor } from '@grammyjs/files';
import { createNewFolder, createNoteFile } from '../utils/file';

/**
 * Shared function to handle media uploads
 */
const handleMediaUpload = async (
  ctx: FileFlavor<MyContext>, 
  fileId: string, 
  fileType: 'photo' | 'video' | 'audio',
): Promise<void> => {
  try {
    // Create a new folder for this upload immediately
    const targetFolder = await createNewFolder();
    
    // Download the file directly to the target folder
    const file = await ctx.getFile();
    
    // Extract original filename from file_path if available
    let fileName = 'content';
    
    if (file.file_path) {
      // Get the original filename from the path
      const originalName = path.basename(file.file_path);
      if (originalName) {
        fileName = originalName;
      }
    } else {
      // Fallback to default name with type extension
      fileName = `content.${fileType}`;
    }
    
    const targetPath = path.join(targetFolder, fileName);
    
    // Ensure target directory exists
    await mkdir(path.dirname(targetPath), { recursive: true });
    
    // Download directly to the final location
    await file.download(targetPath);
    
    // Set session data
    ctx.session.step = 'awaiting_description';
    ctx.session.fileId = fileId;
    ctx.session.fileType = fileType;
    ctx.session.targetFolder = targetFolder;
    
    await ctx.reply(`${fileType} received! Please provide a description for this ${fileType}.`);
  } catch (error) {
    console.error(`Error processing ${fileType}:`, error);
    await ctx.reply(`Failed to process ${fileType}. Please try again.`);
  }
};

/**
 * Handles photo uploads
 */
export const handlePhoto = async (ctx: FileFlavor<MyContext>): Promise<void> => {
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
export const handleVideo = async (ctx: FileFlavor<MyContext>): Promise<void> => {
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
export const handleAudio = async (ctx: FileFlavor<MyContext>): Promise<void> => {
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
export const handleText = async (ctx: FileFlavor<MyContext>): Promise<void> => {
  // Only handle text as content if we're in idle state
  if (ctx.session.step !== 'idle') return;
  
  const text = ctx.msg?.text;
  if (!text) {
    await ctx.reply('Failed to process text. Please try again.');
    return;
  }

  try {
    // Create a new folder for this upload immediately
    const targetFolder = await createNewFolder();
    
    // For text, we create a text file with the content right away
    const textFilePath = path.join(targetFolder, 'content.txt');
    await Bun.write(textFilePath, text);
    
    // Set session data
    ctx.session.step = 'awaiting_description';
    ctx.session.fileType = 'text';
    ctx.session.description = text; // For text, we use the text itself as content
    ctx.session.targetFolder = targetFolder;
    
    await ctx.reply('Text received! Please provide a description for this text (or send "same" to use the text itself as the description).');
  } catch (error) {
    console.error('Error processing text:', error);
    await ctx.reply('Failed to process text. Please try again.');
  }
};

/**
 * Finalizes the upload process and saves metadata to Kirby
 */
export const finalizeUpload = async (ctx: FileFlavor<MyContext>): Promise<void> => {
  try {
    // Get the target folder from the session
    const targetFolder = ctx.session.targetFolder;
    
    if (!targetFolder) {
      throw new Error('Target folder not found in session');
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