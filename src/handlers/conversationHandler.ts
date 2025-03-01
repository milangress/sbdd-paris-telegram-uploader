import type { MyContext } from '../types';
import { Keyboard } from 'grammy';
import { ORIENTATIONS, TAROT_CARDS, HOUSES } from '../config';
import { finalizeUpload } from './fileHandler';

/**
 * Handles the orientation step of the conversation
 */
export const handleOrientation = async (ctx: MyContext): Promise<void> => {
  if (ctx.session.step !== 'awaiting_orientation' || !ctx.msg?.text) {
    return;
  }

  const orientation = ctx.msg.text.toLowerCase();
  
  // Set the orientation
  ctx.session.orientation = orientation;
  
  // Move to the next step - ask for house
  ctx.session.step = 'awaiting_house';
  
  // Create house keyboard
  const keyboard = new Keyboard();
  HOUSES.forEach(house => {
    keyboard.text(house).row();
  });
  keyboard.resized().oneTime();
  
  // Ask for house
  await ctx.reply('Please select a house:', { reply_markup: keyboard });
};

/**
 * Handles the tarot card step of the conversation
 */
export const handleTarotCard = async (ctx: MyContext): Promise<void> => {
  if (ctx.session.step !== 'awaiting_tarot_card' || !ctx.msg?.text) {
    return;
  }

  const tarotCardInput = ctx.msg.text;

  // First, try to find the card by display name
  const cardByDisplay = TAROT_CARDS.find(card => 
    card.display.toLowerCase() === tarotCardInput.toLowerCase().trim()
  );
  
  if (cardByDisplay) {
    // Found by display name, save the key
    ctx.session.tarotCard = cardByDisplay.key;
 
    // Get card info to display to user
    const { getTarotCardInfo } = await import('../utils/tarotInfo');
    const cardInfo = getTarotCardInfo(cardByDisplay.key);
    
    if (cardInfo) {
      // Create confirmation keyboard
      const keyboard = new Keyboard()
        .text("Yes, use this card")
        .text("No, choose another card")
        .resized().oneTime();
      
      let message = `🔮 *${cardInfo.name}* 🔮\n\n`;
      
      // Format based on whether it's a suit or a major arcana card
      if ('themes' in cardInfo && 'focus' in cardInfo) {
        // It's a suit
        message += `*Themes:* ${cardInfo.themes}\n`;
        message += `*Focus:* ${cardInfo.focus}\n`;
        message += `*Strengths:* ${cardInfo.strengths}\n`;
        message += `*Challenges:* ${cardInfo.challenges}\n\n`;
      } else if ('upright' in cardInfo && 'reverse' in cardInfo) {
        // It's a major arcana card
        message += `*Upright:* ${cardInfo.upright}\n`;
        message += `*Reversed:* ${cardInfo.reverse}\n\n`;
      }
      
      message += "Is this the card you want to use?";
      
      // Move to confirmation step
      ctx.session.step = 'awaiting_tarot_confirmation';
      
      // Show card info and ask for confirmation
      await ctx.reply(message, { 
        parse_mode: 'Markdown',
        reply_markup: keyboard
      });
      return;
    }
  } else {
    // If it's not a valid card, ask again
    await ctx.reply(`"${tarotCardInput}" is not a recognized tarot card. Please select a valid tarot card:`);
    return;
  }
};

/**
 * Handles the tarot card confirmation step
 */
export const handleTarotConfirmation = async (ctx: MyContext): Promise<void> => {
  if (ctx.session.step !== 'awaiting_tarot_confirmation' || !ctx.msg?.text) {
    return;
  }

  const response = ctx.msg.text.toLowerCase();
  
  if (response.includes('yes')) {
    // User confirmed the card, move to orientation selection
    ctx.session.step = 'awaiting_orientation';
    
    // Create orientation keyboard using Keyboard class
    const keyboard = new Keyboard();
    ORIENTATIONS.forEach(orientation => {
      keyboard.text(orientation).row();
    });
    keyboard.resized().oneTime();
    
    // Ask for orientation
    await ctx.reply('Please select the orientation:', { reply_markup: keyboard });
  } else {
    // User wants to choose another card, go back to card selection
    ctx.session.step = 'awaiting_tarot_card';
    
    // Create tarot card keyboard again
    const keyboard = new Keyboard();
    
    // Add Major Arcana cards (first 22 cards)
    for (let i = 0; i < 22; i++) {
      keyboard.text(TAROT_CARDS[i].display);
      // Add a row break after every 2 cards
      if ((i + 1) % 2 === 0 && i < 21) {
        keyboard.row();
      }
    }
    
    // Add a row break after Major Arcana
    keyboard.row();
    
    // Add Tarot Suits (last 4 items)
    for (let i = 22; i < TAROT_CARDS.length; i++) {
      keyboard.text(TAROT_CARDS[i].display);
      if ((i + 1) % 2 === 0 && i < TAROT_CARDS.length - 1) {
        keyboard.row();
      }
    }
    
    keyboard.resized().oneTime();
    
    // Ask for tarot card again
    await ctx.reply('Please select a different tarot card:', { reply_markup: keyboard });
  }
};

/**
 * Handles the house step of the conversation
 */
export const handleHouse = async (ctx: MyContext): Promise<void> => {
  if (ctx.session.step !== 'awaiting_house' || !ctx.msg?.text) {
    return;
  }

  const house = ctx.msg.text;
  
  // Set the house
  ctx.session.house = house;
  
  // Get the display name for the tarot card
  let tarotCardDisplay = ctx.session.tarotCard || 'Unknown';
  
  // Find the display name from the TAROT_CARDS array
  const tarotCard = TAROT_CARDS.find(card => card.key === ctx.session.tarotCard);
  if (tarotCard) {
    tarotCardDisplay = tarotCard.display;
  } else if (ctx.session.tarotCard) {
    // If not found in the array, try to get it from the tarot info utility
    const { getTarotCardInfo } = await import('../utils/tarotInfo');
    const cardInfo = getTarotCardInfo(ctx.session.tarotCard);
    if (cardInfo && cardInfo.name) {
      tarotCardDisplay = cardInfo.name;
    }
  }
  
  // Show summary
  await ctx.reply(
    `📝 Summary of your upload:
    
Type: ${ctx.session.fileType}
Description: ${ctx.session.description}
Orientation: ${ctx.session.orientation}
Tarot Card: ${tarotCardDisplay}
House: ${ctx.session.house}

Saving to Kirby CMS...`
  );
  
  // Finalize the upload
  await finalizeUpload(ctx);
}; 