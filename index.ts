import { Bot, session, GrammyError, HttpError } from 'grammy';
import { Menu } from '@grammyjs/menu';
import fs from 'fs-extra';
import path from 'path';

// Import configuration
import { BOT_TOKEN, ALLOWED_USER_IDS } from './src/config';
import type { MyContext, SessionData } from './src/types';

// Import handlers
import { handlePhoto, handleVideo, handleAudio, handleText } from './src/handlers/fileHandler';
import { handleDescription, handleOrientation, handleTarotCard } from './src/handlers/conversationHandler';
import { mainMenu, startMenu } from './src/handlers/menuHandler';

// Create a bot instance
// BOT_TOKEN is checked in config, so we can safely assert it's not undefined
const bot = new Bot<MyContext>(BOT_TOKEN as string);

// Create a temp directory for file downloads
fs.ensureDirSync(path.join(process.cwd(), 'temp'));

// Middleware to check if user is allowed (if ALLOWED_USER_IDS is not empty)
bot.use(async (ctx, next) => {
  if (ALLOWED_USER_IDS.length > 0) {
    const userId = ctx.from?.id;
    if (!userId || !ALLOWED_USER_IDS.includes(userId)) {
      await ctx.reply('You are not authorized to use this bot.');
      return;
    }
  }
  await next();
});

// Configure session
bot.use(session({
  initial(): SessionData {
    return {
      step: 'idle'
    };
  }
}));

// Register menus
bot.use(mainMenu);
bot.use(startMenu);

// Command handlers
bot.command('start', async (ctx) => {
  await ctx.reply(
    `Welcome to the Kirby CMS Uploader Bot! 👋

This bot helps you upload content to Kirby CMS.
You can send photos, videos, audio, or text messages.

What would you like to do?`,
    { reply_markup: startMenu }
  );
});

bot.command('menu', async (ctx) => {
  await ctx.reply('Main Menu:', { reply_markup: mainMenu });
});

bot.command('reset', async (ctx) => {
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
});

bot.command('help', async (ctx) => {
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

// Media handlers
bot.on('message:photo', handlePhoto);
bot.on('message:video', handleVideo);
bot.on('message:audio', handleAudio);
bot.on('message:voice', handleAudio);

// Text handler (only if we're in idle state)
bot.on('message:text', async (ctx, next) => {
  // Skip command messages
  if (ctx.msg.text.startsWith('/')) {
    await next();
    return;
  }
  
  // Handle conversation steps
  if (ctx.session.step === 'awaiting_description') {
    await handleDescription(ctx);
  } else if (ctx.session.step === 'awaiting_orientation') {
    await handleOrientation(ctx);
  } else if (ctx.session.step === 'awaiting_tarot_card') {
    await handleTarotCard(ctx);
  } else {
    // If we're in idle state, treat text as content
    await handleText(ctx);
  }
});

// Error handling
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

// Start the bot
console.log('Starting Kirby CMS Uploader Bot...');
bot.start();