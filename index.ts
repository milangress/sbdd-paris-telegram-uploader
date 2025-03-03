import { Bot, session, GrammyError, HttpError } from 'grammy';
import { hydrateFiles } from '@grammyjs/files';
import { mkdir } from 'node:fs/promises';
import path from 'path';
import { resetSession } from './src/utils/reset';
import { lockBot, unlockBot, isBotLocked } from './src/utils/lockState';
import { getAllTarotInfo } from './src/utils/tarotInfo';

// Import configuration
import { BOT_TOKEN, ALLOWED_USER_IDS } from './src/config';
import type { MyContext, SessionData } from './src/types';

// Import handlers
import { handlePhoto, handleVideo, handleAudio, handleText } from './src/handlers/fileHandler';
import { 
  handleOrientation, 
  handleTarotCard, 
  handleTarotConfirmation, 
  handleHouse,
  handleTarotCategory 
} from './src/handlers/conversationHandler';

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
  { command: "reset", description: "Upload a new file" },
  { command: "tarot", description: "Show tarot card information" },
  { command: "lock", description: "Lock the bot for everybody" },
  { command: "unlock", description: "Unlock the bot everybody" },
]);

// Command handlers
bot.command('start', async (ctx) => {
  await ctx.reply('Paris, Paris who is the most beautiful of us all? 🍎🍎🍎')
  await ctx.reply('How should I know? My cards are all empty ')
  await ctx.reply(
    'sry wrong paris here — just end me a photo, video, audio, or text message to begin uploading.',
  );
});

bot.command('reset', async (ctx) => {
  // Reset the session
  await resetSession(ctx);
});

// Tarot info commands
bot.command('tarot', async (ctx) => {
  // Show all tarot info as multiple messages
  const messages = getAllTarotInfo();
  
  // Send each message in sequence
  for (const message of messages) {
    await ctx.reply(message, { parse_mode: 'Markdown' });
  }
});

// Lock and unlock commands
bot.command('lock', async (ctx) => {
  lockBot();
  await ctx.reply('🔒 👹 Bot is now in simple upload mode. Files will be saved without metadata collection.');
});

bot.command('unlock', async (ctx) => {
  unlockBot();
  await ctx.reply('🔓 🐲 Bot is now unlocked. Users can upload content again.');
});

// Middleware to check if bot is locked before processing media or text
bot.use(async (ctx, next) => {
  // Skip lock check for commands
  if (ctx.message?.text?.startsWith('/')) {
    await next();
    return;
  }
  
  // Check if bot is locked and we're in a metadata collection step
  if (isBotLocked() && ctx.session.step !== 'idle') {
    await ctx.reply('🔒 Metadata collection is disabled in simple upload mode.');
    await resetSession(ctx);
    return;
  }
  
  await next();
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
  if (ctx.session.step === 'awaiting_orientation') {
    await handleOrientation(ctx);
  } else if (ctx.session.step === 'awaiting_tarot_category') {
    await handleTarotCategory(ctx);
  } else if (ctx.session.step === 'awaiting_tarot_card') {
    await handleTarotCard(ctx);
  } else if (ctx.session.step === 'awaiting_tarot_confirmation') {
    await handleTarotConfirmation(ctx);
  } else if (ctx.session.step === 'awaiting_house') {
    await handleHouse(ctx);
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