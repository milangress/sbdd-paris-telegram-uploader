import type { MyContext } from '../types';
import { Keyboard } from 'grammy';
import { ORIENTATIONS, TAROT_CARDS, HOUSES } from '../config';
import { finalizeUpload } from './fileHandler';
import { getTarotCardInfo, ALL_TAROT_CARDS } from '../utils/tarotInfo';
import { 
  showTarotCardSelection, 
  showMajorArcanaSelection, 
  showSuitCardSelection,
  showOrientationSelection,
  showHouseSelection,
  showTarotConfirmation
} from './keyboardHandler';

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
  await showHouseSelection(ctx, HOUSES);
};

/**
 * Handles the tarot category selection step of the conversation
 */
export const handleTarotCategory = async (ctx: MyContext): Promise<void> => {
  if (ctx.session.step !== 'awaiting_tarot_category' || !ctx.msg?.text) {
    return;
  }

  const userInput = ctx.msg.text;
  
  // Handle category selection
  if (userInput === "Major Arcana") {
    await showMajorArcanaSelection(ctx);
    return;
  } else if (userInput === "Cups") {
    await showSuitCardSelection(ctx, 'cups');
    return;
  } else if (userInput === "Wands") {
    await showSuitCardSelection(ctx, 'wands');
    return;
  } else if (userInput === "Swords") {
    await showSuitCardSelection(ctx, 'swords');
    return;
  } else if (userInput === "Pentacles") {
    await showSuitCardSelection(ctx, 'pentacles');
    return;
  } else {
    // If it's not a valid category, ask again
    await ctx.reply(`"${userInput}" is not a recognized tarot category. Please select a valid category.`);
    
    // Show the category selection again
    await showTarotCardSelection(ctx);
    return;
  }
};

/**
 * Handles the tarot card step of the conversation
 */
export const handleTarotCard = async (ctx: MyContext): Promise<void> => {
  if (ctx.session.step !== 'awaiting_tarot_card' || !ctx.msg?.text) {
    return;
  }

  const userInput = ctx.msg.text;
  
  // Handle back button
  if (userInput === "← Back to Categories") {
    // Go back to category selection
    await showTarotCardSelection(ctx);
    return;
  }

  // Try to find the card by display name
  const cardByDisplay = TAROT_CARDS.find(card => 
    card.display.toLowerCase() === userInput.toLowerCase().trim()
  );
  
  if (cardByDisplay) {
    // Found by display name, save the key
    ctx.session.tarotCard = cardByDisplay.key;
 
    // Show confirmation with card details
    await showTarotConfirmation(ctx, cardByDisplay.key);
    return;
  } else {
    // If it's not a valid card, ask again
    await ctx.reply(`"${userInput}" is not a recognized tarot card. Please select a valid tarot card or go back to categories.`);
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
    await showOrientationSelection(ctx, ORIENTATIONS);
  } else {
    // User wants to choose another card, go back to category selection
    await showTarotCardSelection(ctx);
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
  
  // Get card info from our unified structure
  const cardInfo = getTarotCardInfo(ctx.session.tarotCard || '');
  if (cardInfo) {
    tarotCardDisplay = cardInfo.display;
  }
  
  // Show summary
  await ctx.reply(
    `📝 Summary of your upload:
    
Type: ${ctx.session.fileType}
Description: ${ctx.session.description}
Orientation: ${ctx.session.orientation}
Tarot Card: ${tarotCardDisplay}
House: ${ctx.session.house}

Finalizing your upload...`
  );
  
  // Finalize the upload
  await finalizeUpload(ctx);
}; 