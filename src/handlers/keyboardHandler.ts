import { Keyboard } from 'grammy';
import type { MyContext } from '../types';
import { MAJOR_ARCANA_CARDS, CUPS_CARDS, WANDS_CARDS, SWORDS_CARDS, PENTACLES_CARDS, type TarotCardInfo } from '../utils/tarotInfo';

/**
 * Show tarot card category selection
 * @param ctx Telegram context
 */
export async function showTarotCardSelection(ctx: MyContext): Promise<void> {
  // Set step to awaiting tarot category
  ctx.session.step = 'awaiting_tarot_category';

  // Create keyboard with category buttons
  const keyboard = new Keyboard();
  
  // Add category buttons with Major Arcana on its own line
  keyboard
    .text("✨ Major Arcana ✨")
    .row()
    .text("🌊 Cups 🌊")
    .text("🔥 Wands 🔥")
    .row()
    .text("⚔️ Swords ⚔️")
    .text("💎 Pentacles 💎")
    .row();
  
  // Add a message explaining the categories
  await ctx.reply('Choose your path:', { reply_markup: keyboard });
}

/**
 * Show Major Arcana card selection
 * @param ctx Telegram context
 */
export async function showMajorArcanaSelection(ctx: MyContext): Promise<void> {
  // Set step to awaiting tarot card
  ctx.session.step = 'awaiting_tarot_card';

  // Create keyboard for Major Arcana cards
  const keyboard = new Keyboard();

  // Add Major Arcana cards in rows of 2
  for (let i = 0; i < MAJOR_ARCANA_CARDS.length; i++) {
    keyboard.text(MAJOR_ARCANA_CARDS[i].display);
    // Add a row break after every 2 cards
    if ((i + 1) % 2 === 0 && i < MAJOR_ARCANA_CARDS.length - 1) {
      keyboard.row();
    }
  }
  
  // Add back button
  keyboard.row().text("← Back to Categories");
  
  keyboard.resized().oneTime();

  await ctx.reply('Select a Major Arcana card:', { reply_markup: keyboard });
}

/**
 * Show suit card selection
 * @param ctx Telegram context
 * @param suit The suit to show cards for (cups, wands, swords, pentacles)
 */
export async function showSuitCardSelection(ctx: MyContext, suit: 'cups' | 'wands' | 'swords' | 'pentacles'): Promise<void> {
  // Set step to awaiting tarot card
  ctx.session.step = 'awaiting_tarot_card';

  // Get the appropriate cards array based on the suit
  let cards: TarotCardInfo[] = [];
  switch (suit) {
    case 'cups':
      cards = CUPS_CARDS;
      break;
    case 'wands':
      cards = WANDS_CARDS;
      break;
    case 'swords':
      cards = SWORDS_CARDS;
      break;
    case 'pentacles':
      cards = PENTACLES_CARDS;
      break;
  }

  // Create keyboard for the selected suit
  const keyboard = new Keyboard();

  // Add suit cards in rows of 2
  for (let i = 0; i < cards.length; i++) {
    keyboard.text(cards[i].display);
    // Add a row break after every 2 cards
    if ((i + 1) % 2 === 0 && i < cards.length - 1) {
      keyboard.row();
    }
  }
  
  // Add back button
  keyboard.row().text("← Back to Categories");
  
  keyboard.resized().oneTime();

  // Format the suit name for display (capitalize first letter)
  const formattedSuit = suit.charAt(0).toUpperCase() + suit.slice(1);
  
  await ctx.reply(`Select a ${formattedSuit} card:`, { reply_markup: keyboard });
}

/**
 * Create orientation selection keyboard
 * @param ctx Telegram context
 * @param orientations Array of orientation options
 */
export async function showOrientationSelection(ctx: MyContext, orientations: string[]): Promise<void> {
  // Set step to awaiting orientation
  ctx.session.step = 'awaiting_orientation';
  
  // Create orientation keyboard
  const keyboard = new Keyboard();
  orientations.forEach(orientation => {
    keyboard.text(orientation).row();
  });
  keyboard.resized().oneTime();
  
  // Ask for orientation
  await ctx.reply('Please select the orientation:', { reply_markup: keyboard });
}

/**
 * Create house selection keyboard
 * @param ctx Telegram context
 * @param houses Array of house options
 */
export async function showHouseSelection(ctx: MyContext, houses: string[]): Promise<void> {
  // Set step to awaiting house
  ctx.session.step = 'awaiting_house';
  
  // Create house keyboard
  const keyboard = new Keyboard();
  houses.forEach(house => {
    keyboard.text(house).row();
  });
  keyboard.resized().oneTime();
  
  // Ask for house
  await ctx.reply('Please select a house:', { reply_markup: keyboard });
}

/**
 * Create tarot card confirmation keyboard
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
  
  let message = `🔮 *${cardInfo.name}* 🔮\n\n`;
  message += `💅 by divine sight 💅\n\n`;
  
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
        message += `*Suit:* ${suitInfo.name}\n`;
        message += `*Suit Themes:* ${suitInfo.themes}\n`;
        message += `*Suit Focus:* ${suitInfo.focus}\n`;
        message += `*Suit Strengths:* ${suitInfo.strengths}\n`;
        message += `*Suit Challenges:* ${suitInfo.challenges}\n\n`;
      }
    }
  }
  
  message += "Shall we weave this card into our destiny? 🏛️";
  
  // Move to confirmation step
  ctx.session.step = 'awaiting_tarot_confirmation';
  
  // Show card info and ask for confirmation
  await ctx.reply(message, { 
    parse_mode: 'Markdown',
    reply_markup: keyboard
  });
} 