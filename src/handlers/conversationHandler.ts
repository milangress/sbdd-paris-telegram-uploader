import type { MyContext } from '../types';
import { Keyboard } from 'grammy';
import { ORIENTATIONS, TAROT_CARDS, HOUSES, logMessage } from '../config';
import { finalizeUpload } from './fileHandler';
import { getTarotCardInfo, ALL_TAROT_CARDS } from '../utils/tarotInfo';
import { 
  showTarotConfirmation,
  showOrientationSelection,
  showHouseSelection,
  showSimplifiedTarotSelection
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
 * This is now a simple pass-through to the card selection since we've simplified the flow
 */
export const handleTarotCategory = async (ctx: MyContext): Promise<void> => {
  if (ctx.session.step !== 'awaiting_tarot_category' || !ctx.msg?.text) {
    return;
  }

  // Simply show all cards directly
  ctx.session.step = 'awaiting_tarot_card';
  await showSimplifiedTarotSelection(ctx);
};

/**
 * Handles the tarot card step of the conversation
 */
export const handleTarotCard = async (ctx: MyContext): Promise<void> => {
  if (ctx.session.step !== 'awaiting_tarot_card' || !ctx.msg?.text) {
    return;
  }

  // Extract just the card name by splitting at " - " and taking the first part
  const fullUserInput = ctx.msg.text;
  // If the text contains " - ", extract just the card name before it
  const userInput = fullUserInput.includes(" - ") ? 
    fullUserInput.split(" - ")[0].trim() : 
    fullUserInput.trim();
  
  // Check if it's one of the four suits
  if (userInput === "Cups" || userInput === "Wands" || userInput === "Swords" || userInput === "Pentacles") {
    // It's a suit, save the key (lowercase)
    ctx.session.tarotCard = userInput.toLowerCase();
    
    // Show confirmation with suit details
    await showTarotConfirmation(ctx, userInput.toLowerCase());
    return;
  }
  
  // Try to find the card by display name (for Major Arcana)
  const cardByDisplay = TAROT_CARDS.find(card => 
    card.display.toLowerCase() === userInput.toLowerCase().trim() && card.category === 'major'
  );
  
  if (cardByDisplay) {
    // Found by display name, save the key
    ctx.session.tarotCard = cardByDisplay.key;
 
    // Show confirmation with card details
    await showTarotConfirmation(ctx, cardByDisplay.key);
    return;
  } else {
    await logMessage(`Invalid tarot card selection attempt: "${userInput}" (from full input: "${fullUserInput}")`);
    // If it's not a valid card, ask again
    await ctx.reply(`"${userInput}" is not a recognized tarot card or suit. Please select a valid option.`);
    // Show the card selection again
    await showSimplifiedTarotSelection(ctx);
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
    // User wants to choose another card, go back to card selection
    await showSimplifiedTarotSelection(ctx);
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
  
  // Get the tarot card display name
  const tarotCardInfo = getTarotCardInfo(ctx.session.tarotCard || '');
  const tarotCardDisplay = tarotCardInfo ? tarotCardInfo.display : 'Unknown Card';
  
  // Log the complete metadata
  await logMessage(`Upload metadata complete - House: ${house}, Card: ${tarotCardDisplay}, Type: ${ctx.session.fileType} Session: ${JSON.stringify(ctx.session)}`);
  
  // Show summary of selected values
  await ctx.reply(
    `✨ 🏛️ Your destiny unfolds:

${ctx.session.fileType} (like the ${ctx.session.fileType === 'photo' ? 'reflection in Helen\'s mirror' : ctx.session.fileType === 'video' ? 'dance of the nymphs' : ctx.session.fileType === 'audio' ? 'songs of the sirens' : 'scrolls of prophecy'}!)
${ctx.session.description ? `"${ctx.session.description}" (as you described)` : ''}
${ctx.session.orientation} (as the fates have aligned)
${tarotCardDisplay} (your cosmic guide)
${house} (your sanctuary)

Your offering is being woven into the tapestry of paris...`
  );
  
  // Finalize the upload
  await finalizeUpload(ctx);
}; 