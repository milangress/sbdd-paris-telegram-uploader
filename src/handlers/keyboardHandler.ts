import { Keyboard } from 'grammy';
import type { MyContext } from '../types';
import { MAJOR_ARCANA_CARDS, SUIT_CARDS, type TarotCardInfo } from '../utils/tarotInfo';

/**
 * Show tarot confirmation with card details
 * @param ctx Telegram context
 * @param cardKey The key of the selected tarot card
 */
export async function showTarotConfirmation(ctx: MyContext, cardKey: string): Promise<void> {
  // Import only what we need to avoid circular dependencies
  const { getTarotCardInfo, getSuitInfoForCard } = await import('../utils/tarotInfo');
  
  // Get card info to display to user
  const cardInfo = getTarotCardInfo(cardKey);
  
  if (!cardInfo) {
    await ctx.reply('Error: Card information not found. Please try again.');
    return;
  }
  
  // Create confirmation keyboard
  const keyboard = new Keyboard()
    .text("Yes, use this card")
    .text("No, choose another")
    .resized().oneTime();
  
  let message = `💅 *${cardInfo.name}* 💅\n`;
  
  // Format based on whether it's a suit, a major arcana card, or a minor arcana card
  if (cardInfo.category === 'suit') {
    // It's a suit
    message += `*Themes:* ${cardInfo.themes}\n`;
    message += `*Focus:* ${cardInfo.focus}\n`;
    message += `*Strengths:* ${cardInfo.strengths}\n`;
    message += `*Challenges:* ${cardInfo.challenges}\n\n`;
  } else {
    // It's a card (either major or minor arcana)
    message += `*Upright:* ${cardInfo.upright}\n`;
    message += `*Reversed:* ${cardInfo.reverse}\n\n`;
    
    // Add suit information for minor arcana cards
    if (cardInfo.category !== 'major') {
      const suitInfo = getSuitInfoForCard(cardInfo.key);
      if (suitInfo) {
        message += `*Suit Themes:* ${suitInfo.themes}\n`;
        message += `*Suit Focus:* ${suitInfo.focus}\n`;
      }
    }
  }
  
  message += 'Is this the card you wish to use?';
  
  // Set step to awaiting confirmation
  ctx.session.step = 'awaiting_tarot_confirmation';
  
  // Send confirmation message with keyboard
  await ctx.reply(message, { 
    reply_markup: keyboard,
    parse_mode: 'Markdown'
  });
}

/**
 * Show simplified tarot selection with just major arcana cards and the four suits
 * @param ctx Telegram context
 */
export async function showSimplifiedTarotSelection(ctx: MyContext): Promise<void> {
  // Set step to awaiting tarot card
  ctx.session.step = 'awaiting_tarot_card';

  // Create keyboard with major arcana cards and the four suits
  const keyboard = new Keyboard();
  
  // Add Major Arcana cards with descriptions
  for (let i = 0; i < MAJOR_ARCANA_CARDS.length; i++) {
    const card = MAJOR_ARCANA_CARDS[i];
    keyboard.text(`${card.display} - ↑ ${card.upright} ↓ ${card.reverse}`);
    // Each card gets its own row due to the length
    keyboard.row();
  }
  
  // Add the four suits with descriptions
  for (const suit of SUIT_CARDS) {
    keyboard.text(`${suit.display} - 🎭 ${suit.themes} | ${suit.focus}`);
    keyboard.row();
  }
  
  keyboard.resized().oneTime();
  
  // Add a message explaining the options
  await ctx.reply('Select a tarot card or suit:', { reply_markup: keyboard });
}

/**
 * Show orientation selection
 * @param ctx Telegram context
 * @param orientations Array of orientation options
 */
export async function showOrientationSelection(ctx: MyContext, orientations: string[]): Promise<void> {
  // Set step to awaiting orientation
  ctx.session.step = 'awaiting_orientation';
  
  // Create keyboard with orientation buttons
  const keyboard = new Keyboard();
  
  // Add orientation buttons
  for (const orientation of orientations) {
    keyboard.text(orientation);
  }
  
  keyboard.resized().oneTime();
  
  // Add a message explaining the options
  await ctx.reply('Choose an orientation:', { reply_markup: keyboard });
}

/**
 * Show house selection
 * @param ctx Telegram context
 * @param houses Array of house options
 */
export async function showHouseSelection(ctx: MyContext, houses: string[]): Promise<void> {
  // Set step to awaiting house
  ctx.session.step = 'awaiting_house';
  
  // Create keyboard with house buttons
  const keyboard = new Keyboard();
  
  // Add house buttons in rows of 2
  for (let i = 0; i < houses.length; i++) {
    keyboard.text(houses[i]);
    // Add a row break after every 2 houses
    if ((i + 1) % 2 === 0 && i < houses.length - 1) {
      keyboard.row();
    }
  }
  
  keyboard.resized().oneTime();
  
  // Add a message explaining the options
  await ctx.reply('Choose a house:', { reply_markup: keyboard });
} 