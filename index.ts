import { Bot, session, GrammyError, HttpError } from 'grammy';
import { hydrateFiles } from '@grammyjs/files';
import { mkdir } from 'node:fs/promises';
import path from 'path';
import { resetSession } from './src/utils/reset';

// Import configuration
import { BOT_TOKEN, ALLOWED_USER_IDS } from './src/config';
import type { MyContext, SessionData } from './src/types';

// Import handlers
import { handlePhoto, handleVideo, handleAudio, handleText } from './src/handlers/fileHandler';
import { handleDescription, handleOrientation, handleTarotCard } from './src/handlers/conversationHandler';

// Create a bot instance with the combined MyContext type
const bot = new Bot<MyContext>(BOT_TOKEN as string);

// Use the file plugin
bot.api.config.use(hydrateFiles(BOT_TOKEN as string));

// Create a temp directory for file downloads
mkdir(path.join(process.cwd(), 'temp'), { recursive: true });

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

await bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Show help text" },
  { command: "reset", description: "Upload a new file" },
]);

// Command handlers
bot.command('start', async (ctx) => {
  await ctx.reply(
    'Welcome to the Kirby CMS Uploader Bot! 👋\n\nThis bot helps you upload content to Kirby CMS. Send me a photo, video, audio, or text message to begin uploading.',
  );
});

bot.command('reset', async (ctx) => {
  // Reset the session
  await resetSession(ctx);
});

bot.command('help', async (ctx) => {
  await ctx.reply(
    'This bot helps you upload content to Kirby CMS.\n\n' +
    'Available commands:\n' +
    '/start - Start the bot\n' +
    '/reset - Reset your current session\n' +
    '/help - Show this help message'
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