import { Menu } from '@grammyjs/menu';
import type { MyContext } from '../types';

// Create a menu for commands
export const mainMenu = new Menu<MyContext>('main-menu')
  .text('📷 Upload Instructions', async (ctx) => {
    await ctx.reply(
      `To upload content to Kirby CMS, follow these steps:

1. Send a photo, video, audio, or text message to this bot
2. Provide a description when prompted
3. Select the orientation (landscape or portrait)
4. Choose a tarot card from the list
5. Wait for confirmation that your content has been saved

Your content will be saved to the Kirby CMS with all the provided information.`
    );
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
    
    await ctx.reply('Session reset. You can start a new upload now.', {
      reply_markup: { remove_keyboard: true }
    });
  })
  .row()
  .text('❓ Help', async (ctx) => {
    await ctx.reply(
      `This bot helps you upload content to Kirby CMS.

Available commands:
/start - Start the bot and see the main menu
/menu - Show the main menu
/reset - Reset your current session
/help - Show this help message

If you encounter any issues, please contact the administrator.`
    );
  });

// Create a menu for the start command
export const startMenu = new Menu<MyContext>('start-menu')
  .text('📷 Start Uploading', async (ctx) => {
    await ctx.reply(
      `Ready to upload! Send me a photo, video, audio, or text message to begin.`,
      { reply_markup: { remove_keyboard: true } }
    );
  })
  .row()
  .text('❓ Help', async (ctx) => {
    await ctx.reply(
      `This bot helps you upload content to Kirby CMS.

Available commands:
/start - Start the bot and see the main menu
/menu - Show the main menu
/reset - Reset your current session
/help - Show this help message

If you encounter any issues, please contact the administrator.`
    );
  }); 