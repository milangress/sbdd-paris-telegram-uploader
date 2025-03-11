/**
 * Tarot card information utility
 */

// Define a type for tarot card information
export type TarotCardInfo = {
  key: string;
  name: string;
  display: string;
  category: 'major' | 'cups' | 'wands' | 'swords' | 'pentacles' | 'suit';
  upright?: string;
  reverse?: string;
  themes?: string;
  focus?: string;
  strengths?: string;
  challenges?: string;
};

// Tarot suits information
export const tarotSuits: Record<string, TarotCardInfo> = {
  cups: { 
    key: 'cups',
    name: "Cups", 
    display: "Cups",
    category: 'suit',
    themes: "Emotions, intuition, relationships, and love.", 
    focus: "The inner world, feelings, love, and connections with others.", 
    strengths: "Compassion, imagination, emotional intelligence, empathy.", 
    challenges: "Over-sensitivity, emotional overwhelm, escapism." 
  },
  wands: { 
    key: 'wands',
    name: "Wands", 
    display: "Wands",
    category: 'suit',
    themes: "Action, passion, movement, energy.", 
    focus: "Inspiration, action, willpower, and spiritual growth.", 
    strengths: "Drive, enthusiasm, confidence, leadership.", 
    challenges: "Impulsiveness, burnout, arrogance, lack of direction." 
  },
  swords: { 
    key: 'swords',
    name: "Swords", 
    display: "Swords",
    category: 'suit',
    themes: "Thoughts, communication, intellect, and conflict.", 
    focus: "Mental clarity, truth, decision-making, problem solving.", 
    strengths: "Logic, rationality, analytical thinking.", 
    challenges: "Overthinking, harsh words, conflict, emotional detachment." 
  },
  pentacles: { 
    key: 'pentacles',
    name: "Pentacles", 
    display: "Pentacles",
    category: 'suit',
    themes: "Finances, work, material possessions, and physical world.", 
    focus: "Practicality, stability, finances, and tangible achievements.", 
    strengths: "Hard work, reliability, resourcefulness, patience.", 
    challenges: "Overemphasis on materialism, stagnation, workaholism." 
  }
};

// Major Arcana tarot cards
export const majorArcana: Record<string, TarotCardInfo> = {
  fool: { 
    key: 'fool',
    name: "The Fool", 
    display: "The Fool",
    category: 'major',
    upright: "Innocence, freedom, originality, adventure, potential", 
    reverse: "Recklessness, carelessness, negligence, risk-taking" 
  },
  magician: { 
    key: 'magician',
    name: "The Magician", 
    display: "The Magician",
    category: 'major',
    upright: "Power, influence, willpower, resourcefulness, manifestation", 
    reverse: "Manipulation, greed, unused ability, trickery" 
  },
  highpriestess: { 
    key: 'highpriestess',
    name: "The High Priestess", 
    display: "The High Priestess",
    category: 'major',
    upright: "Desirability, unattainability, mystery...", 
    reverse: "Repression for intuition, blocked psychic powers..." 
  },
  empress: { 
    key: 'empress',
    name: "The Empress", 
    display: "The Empress",
    category: 'major',
    upright: "Pregnancy, fertility, motherhood...", 
    reverse: "Insecurity, infertility, lack of confidence..." 
  },
  emperor: { 
    key: 'emperor',
    name: "The Emperor", 
    display: "The Emperor",
    category: 'major',
    upright: "Older man, stability, dependability...", 
    reverse: "Abuse of power, excessively controlling..." 
  },
  hierophant: { 
    key: 'hierophant',
    name: "The Hierophant", 
    display: "The Hierophant",
    category: 'major',
    upright: "Traditional institutions, traditional values, conventional, conformity...", 
    reverse: "Challenging tradition, unconventional lifestyles, unconventional relationships..." 
  },
  lovers: { 
    key: 'lovers',
    name: "The Lovers", 
    display: "The Lovers",
    category: 'major',
    upright: "Love, soulmates, kindred spirits, perfect unions...", 
    reverse: "Disharmony, trust issues, imbalance, conflict..." 
  },
  chariot: { 
    key: 'chariot',
    name: "The Chariot", 
    display: "The Chariot",
    category: 'major',
    upright: "Victory, overcoming obstacles, success, ambition...", 
    reverse: "Forcefulness, lack of direction, lack of self-control..." 
  },
  strength: { 
    key: 'strength',
    name: "Strength", 
    display: "Strength",
    category: 'major',
    upright: "Inner strength, courage, bravery, confidence...", 
    reverse: "Vulnerability, self-doubt, weakness, low self-esteem..." 
  },
  hermit: { 
    key: 'hermit',
    name: "The Hermit", 
    display: "The Hermit",
    category: 'major',
    upright: "Spiritual enlightenment, soul searching, self-reflection...", 
    reverse: "Loneliness, paranoia, isolation, being reclusive..." 
  },
  wheeloffortune: { 
    key: 'wheeloffortune',
    name: "Wheel of Fortune", 
    display: "Wheel of Fortune",
    category: 'major',
    upright: "Good luck, destiny, change, karma...", 
    reverse: "Bad luck, upheaval, disorder, external forces..." 
  },
  justice: { 
    key: 'justice',
    name: "Justice", 
    display: "Justice",
    category: 'major',
    upright: "Justice, karmic justice, consequences, legal disputes...", 
    reverse: "Injustice, karmic retribution, dishonesty, corruption..." 
  },
  hangedman: { 
    key: 'hangedman',
    name: "The Hanged Man", 
    display: "The Hanged Man",
    category: 'major',
    upright: "Feeling trapped, confined, self-limiting, uncertainty...", 
    reverse: "Discontentment, apathy, disinterest, stagnation..." 
  },
  death: { 
    key: 'death',
    name: "Death", 
    display: "Death",
    category: 'major',
    upright: "Spiritual transformation, new beginnings, letting go...", 
    reverse: "Inability to move forward, fear of beginnings..." 
  },
  temperance: { 
    key: 'temperance',
    name: "Temperance", 
    display: "Temperance",
    category: 'major',
    upright: "Balance, peace, patience, moderation, inner calm...", 
    reverse: "Imbalance, self-indulgence, excess, clashing..." 
  },
  devil: { 
    key: 'devil',
    name: "The Devil", 
    display: "The Devil",
    category: 'major',
    upright: "Addiction, depression, mental health issues, secrecy...", 
    reverse: "Detachment, independence, overcoming addiction..." 
  },
  tower: { 
    key: 'tower',
    name: "The Tower", 
    display: "The Tower",
    category: 'major',
    upright: "Chaos, destruction, sudden upheaval, trauma...", 
    reverse: "Resisting change, averting disaster, avoiding tragedy..." 
  },
  star: { 
    key: 'star',
    name: "The Star", 
    display: "The Star",
    category: 'major',
    upright: "Hope, inspiration, creativity, calm, contentment...", 
    reverse: "Hopelessness, despair, focusing on the negative..." 
  },
  moon: { 
    key: 'moon',
    name: "The Moon", 
    display: "The Moon",
    category: 'major',
    upright: "Intuition, illusion, dreams, vagueness, instability...", 
    reverse: "Releasing fear, unveiling secrets, subsiding anxiety..." 
  },
  sun: { 
    key: 'sun',
    name: "The Sun", 
    display: "The Sun",
    category: 'major',
    upright: "Positivity, freedom, fun, success, optimism...", 
    reverse: "Lack of enthusiasm, excessive enthusiasm, sadness..." 
  },
  judgment: { 
    key: 'judgment',
    name: "Judgment", 
    display: "Judgment",
    category: 'major',
    upright: "Judgment, self-evaluation, awakening, renewal...", 
    reverse: "Indecisiveness, self-doubt, malicious gossip..." 
  },
  world: { 
    key: 'world',
    name: "The World", 
    display: "The World",
    category: 'major',
    upright: "Success, achievement, accomplishment, travel...", 
    reverse: "Lack of success, stagnation, lack of achievement..." 
  }
};

// Combine all cards into a single collection
export const ALL_TAROT_CARDS: Record<string, TarotCardInfo> = {
  ...majorArcana,
  ...tarotSuits
};

// Create arrays of cards by category for easy access
export const MAJOR_ARCANA_CARDS = Object.values(majorArcana);
export const SUIT_CARDS = Object.values(tarotSuits);

/**
 * Get information about a specific tarot card
 * @param cardKey The key of the tarot card
 * @returns Information about the tarot card or undefined if not found
 */
export function getTarotCardInfo(cardKey: string): TarotCardInfo | undefined {
  return ALL_TAROT_CARDS[cardKey];
}

/**
 * Get information about a suit based on a card from that suit
 * @param cardKey The key of a card
 * @returns The suit information for the card's suit
 */
export function getSuitInfoForCard(cardKey: string): TarotCardInfo | undefined {
  const card = ALL_TAROT_CARDS[cardKey];
  if (!card) return undefined;
  
  // If it's already a suit, return it
  if (card.category === 'suit') return card;
  
  // Otherwise, return the suit info based on the card's category
  return tarotSuits[card.category];
}

/**
 * Get formatted messages with information about all tarot cards
 * @returns An array of formatted messages with tarot card information
 */
export function getAllTarotInfo(): string[] {
  const messages: string[] = [];
  
  // Introduction message
  messages.push('🔮 *Tarot Card Information* 🔮\n\nUse /tarot to view information about all tarot cards.');
  
  // Suits information message
  let suitsMessage = '*Tarot Suits*\n\n';
  
  for (const suit of SUIT_CARDS) {
    suitsMessage += `*${suit.name}*\n`;
    suitsMessage += `Themes: ${suit.themes}\n`;
    suitsMessage += `Focus: ${suit.focus}\n`;
    suitsMessage += `Strengths: ${suit.strengths}\n`;
    suitsMessage += `Challenges: ${suit.challenges}\n\n`;
  }
  
  messages.push(suitsMessage);
  
  // Major Arcana information - split into multiple messages
  // First part of Major Arcana (cards 0-7)
  let majorArcana1 = '*Major Arcana (Part 1)*\n\n';
  
  for (let i = 0; i < 8; i++) {
    const card = MAJOR_ARCANA_CARDS[i];
    majorArcana1 += `*${card.name}*\n`;
    majorArcana1 += `Upright: ${card.upright}\n`;
    majorArcana1 += `Reversed: ${card.reverse}\n\n`;
  }
  
  messages.push(majorArcana1);
  
  // Second part of Major Arcana (cards 8-15)
  let majorArcana2 = '*Major Arcana (Part 2)*\n\n';
  
  for (let i = 8; i < 16; i++) {
    const card = MAJOR_ARCANA_CARDS[i];
    majorArcana2 += `*${card.name}*\n`;
    majorArcana2 += `Upright: ${card.upright}\n`;
    majorArcana2 += `Reversed: ${card.reverse}\n\n`;
  }
  
  messages.push(majorArcana2);
  
  // Third part of Major Arcana (cards 16-21)
  let majorArcana3 = '*Major Arcana (Part 3)*\n\n';
  
  for (let i = 16; i < MAJOR_ARCANA_CARDS.length; i++) {
    const card = MAJOR_ARCANA_CARDS[i];
    majorArcana3 += `*${card.name}*\n`;
    majorArcana3 += `Upright: ${card.upright}\n`;
    majorArcana3 += `Reversed: ${card.reverse}\n\n`;
  }
  
  messages.push(majorArcana3);
  
  return messages;
} 