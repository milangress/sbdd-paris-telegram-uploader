import type { MyContext } from '../types';
import { Keyboard } from 'grammy';
import { ORIENTATIONS, TAROT_CARDS, HOUSES } from '../config';
import { finalizeUpload } from './fileHandler';

/**
 * Handles the description step of the conversation
 */
export const handleDescription = async (ctx: MyContext): Promise<void> => {
  if (ctx.session.step !== 'awaiting_description' || !ctx.msg?.text) {
    return;
  }

  // Handle special case for text uploads
  if (ctx.session.fileType === 'text' && ctx.msg.text.toLowerCase() === 'same') {
    // Use the original text as description
    // (description is already set in handleText)
  } else {
    // Set the description from the user's message
    ctx.session.description = ctx.msg.text;
  }

  // Move to the next step
  ctx.session.step = 'awaiting_orientation';
  
  // Create orientation keyboard using Keyboard class
  const keyboard = new Keyboard();
  ORIENTATIONS.forEach(orientation => {
    keyboard.text(orientation).row();
  });
  keyboard.resized().oneTime();
  
  // Ask for orientation
  await ctx.reply('Please select the orientation:', { reply_markup: keyboard });
};

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
  
  // Move to the next step
  ctx.session.step = 'awaiting_tarot_card';
  
  // Create tarot card keyboard using Keyboard class
  const keyboard = new Keyboard();
  for (let i = 0; i < TAROT_CARDS.length; i++) {
    keyboard.text(TAROT_CARDS[i]);
    // Add a row break after every 3 cards
    if ((i + 1) % 3 === 0 && i < TAROT_CARDS.length - 1) {
      keyboard.row();
    }
  }
  keyboard.resized().oneTime();
  
  // Ask for tarot card
  await ctx.reply('Please select a tarot card:', { reply_markup: keyboard });
};

/**
 * Handles the tarot card step of the conversation
 */
export const handleTarotCard = async (ctx: MyContext): Promise<void> => {
  if (ctx.session.step !== 'awaiting_tarot_card' || !ctx.msg?.text) {
    return;
  }

  const tarotCard = ctx.msg.text;

  // Set the tarot card
  ctx.session.tarotCard = tarotCard;
  
  // Move to the next step - ask for house
  ctx.session.step = 'awaiting_house';
  
  // Create house keyboard
  const keyboard = new Keyboard();
  HOUSES.forEach(house => {
    keyboard.text(house).row();
  });
  keyboard.resized().oneTime();
  
  // Ask for house
  await ctx.reply('Please select a house (house1, house2, house3, or house4):', { reply_markup: keyboard });
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
  
  // Show summary
  await ctx.reply(
    `📝 Summary of your upload:
    
Type: ${ctx.session.fileType}
Description: ${ctx.session.description}
Orientation: ${ctx.session.orientation}
Tarot Card: ${ctx.session.tarotCard}
House: ${ctx.session.house}

Saving to Kirby CMS...`
  );
  
  // Finalize the upload
  await finalizeUpload(ctx);
}; 