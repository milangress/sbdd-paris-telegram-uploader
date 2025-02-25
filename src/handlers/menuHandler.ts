import { Menu } from '@grammyjs/menu';
import type { MyContext } from '../types';
import type { FileFlavor } from '@grammyjs/files';

// Create a simple menu for commands
export const mainMenu = new Menu<FileFlavor<MyContext>>('main-menu')
  .text('📷 Upload Content', async (ctx) => {
    await ctx.reply('Send me a photo, video, audio, or text message to begin uploading.');
  })
  .row()
  .text('🔄 Reset Session', async (ctx) => {
    // Reset the session
    ctx.session.step = 'idle';
    ctx.session.fileId = undefined;
    ctx.session.fileType = undefined;
    ctx.session.fileName = undefined;
    ctx.session.filePath = undefined;
    ctx.session.description = undefined;
    ctx.session.orientation = undefined;
    ctx.session.tarotCard = undefined;
    ctx.session.targetFolder = undefined;
    
    await ctx.reply('Session reset. You can start a new upload now.');
  });

// Simple start menu
export const startMenu = new Menu<FileFlavor<MyContext>>('start-menu')
  .text('Start Uploading', async (ctx) => {
    await ctx.reply('Send me a photo, video, audio, or text message to begin uploading.');
  }); 