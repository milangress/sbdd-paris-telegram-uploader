/**
 * Tarot card information utility
 */

// Tarot suits information
export const tarotSuits = {
  swords: { 
    name: "Swords (Air)", 
    themes: "Thoughts, communication, intellect, and conflict.", 
    focus: "Mental clarity, truth, decision-making, problem solving.", 
    strengths: "Logic, rationality, analytical thinking.", 
    challenges: "Overthinking, harsh words, conflict, emotional detachment." 
  },
  wands: { 
    name: "Wands (Fire)", 
    themes: "Action, passion, movement, energy.", 
    focus: "Inspiration, action, willpower, and spiritual growth.", 
    strengths: "Drive, enthusiasm, confidence, leadership.", 
    challenges: "Impulsiveness, burnout, arrogance, lack of direction." 
  },
  cups: { 
    name: "Cups (Water)", 
    themes: "Emotions, intuition, relationships, and love.", 
    focus: "The inner world, feelings, love, and connections with others.", 
    strengths: "Compassion, imagination, emotional intelligence, empathy.", 
    challenges: "Over-sensitivity, emotional overwhelm, escapism." 
  },
  pentacles: { 
    name: "Pentacles (Earth)", 
    themes: "Finances, work, material possessions, and physical world.", 
    focus: "Practicality, stability, finances, and tangible achievements.", 
    strengths: "Hard work, reliability, resourcefulness, patience.", 
    challenges: "Overemphasis on materialism, stagnation, workaholism." 
  }
};

// Major Arcana tarot cards
export const majorArcana = {
  fool: { 
    name: "The Fool", 
    upright: "Innocence, freedom, originality, adventure...", 
    reverse: "Recklessness, carelessness, negligence..." 
  },
  magician: { 
    name: "The Magician", 
    upright: "Power, influence, willpower, resourcefulness...", 
    reverse: "Manipulation, greed, unused ability..." 
  },
  highpriestess: { 
    name: "The High Priestess", 
    upright: "Desirability, unattainability, mystery...", 
    reverse: "Repression for intuition, blocked psychic powers..." 
  },
  empress: { 
    name: "The Empress", 
    upright: "Pregnancy, fertility, motherhood...", 
    reverse: "Insecurity, infertility, lack of confidence..." 
  },
  emperor: { 
    name: "The Emperor", 
    upright: "Older man, stability, dependability...", 
    reverse: "Abuse of power, excessively controlling..." 
  },
  hierophant: { 
    name: "The Hierophant", 
    upright: "Traditional institutions, traditional values, conventional, conformity...", 
    reverse: "Challenging tradition, unconventional lifestyles, unconventional relationships..." 
  },
  lovers: { 
    name: "The Lovers", 
    upright: "Love, soulmates, kindred spirits, perfect unions...", 
    reverse: "Disharmony, trust issues, imbalance, conflict..." 
  },
  chariot: { 
    name: "The Chariot", 
    upright: "Victory, overcoming obstacles, success, ambition...", 
    reverse: "Forcefulness, lack of direction, lack of self-control..." 
  },
  strength: { 
    name: "Strength", 
    upright: "Inner strength, courage, bravery, confidence...", 
    reverse: "Vulnerability, self-doubt, weakness, low self-esteem..." 
  },
  hermit: { 
    name: "The Hermit", 
    upright: "Spiritual enlightenment, soul searching, self-reflection...", 
    reverse: "Loneliness, paranoia, isolation, being reclusive..." 
  },
  wheeloffortune: { 
    name: "Wheel of Fortune", 
    upright: "Good luck, destiny, change, karma...", 
    reverse: "Bad luck, upheaval, disorder, external forces..." 
  },
  justice: { 
    name: "Justice", 
    upright: "Justice, karmic justice, consequences, legal disputes...", 
    reverse: "Injustice, karmic retribution, dishonesty, corruption..." 
  },
  hangedman: { 
    name: "The Hanged Man", 
    upright: "Feeling trapped, confined, self-limiting, uncertainty...", 
    reverse: "Discontentment, apathy, disinterest, stagnation..." 
  },
  death: { 
    name: "Death", 
    upright: "Spiritual transformation, new beginnings, letting go...", 
    reverse: "Inability to move forward, fear of beginnings..." 
  },
  temperance: { 
    name: "Temperance", 
    upright: "Balance, peace, patience, moderation, inner calm...", 
    reverse: "Imbalance, self-indulgence, excess, clashing..." 
  },
  devil: { 
    name: "The Devil", 
    upright: "Addiction, depression, mental health issues, secrecy...", 
    reverse: "Detachment, independence, overcoming addiction..." 
  },
  tower: { 
    name: "The Tower", 
    upright: "Chaos, destruction, sudden upheaval, trauma...", 
    reverse: "Resisting change, averting disaster, avoiding tragedy..." 
  },
  star: { 
    name: "The Star", 
    upright: "Hope, inspiration, creativity, calm, contentment...", 
    reverse: "Hopelessness, despair, focusing on the negative..." 
  },
  moon: { 
    name: "The Moon", 
    upright: "Intuition, illusion, dreams, vagueness, instability...", 
    reverse: "Releasing fear, unveiling secrets, subsiding anxiety..." 
  },
  sun: { 
    name: "The Sun", 
    upright: "Positivity, freedom, fun, success, optimism...", 
    reverse: "Lack of enthusiasm, excessive enthusiasm, sadness..." 
  },
  judgment: { 
    name: "Judgment", 
    upright: "Judgment, self-evaluation, awakening, renewal...", 
    reverse: "Indecisiveness, self-doubt, malicious gossip..." 
  },
  world: { 
    name: "The World", 
    upright: "Success, achievement, accomplishment, travel...", 
    reverse: "Lack of success, stagnation, lack of achievement..." 
  }
};

/**
 * Get information about a specific tarot card
 * @param cardName The name of the tarot card
 * @returns Information about the tarot card or undefined if not found
 */
export function getTarotCardInfo(cardName: string): any {
  const normalizedName = cardName.toLowerCase().replace(/\s+/g, '');
  
  // Check if it's a major arcana card
  if (normalizedName in majorArcana) {
    return majorArcana[normalizedName as keyof typeof majorArcana];
  }
  
  // Check if it's a suit
  if (normalizedName in tarotSuits) {
    return tarotSuits[normalizedName as keyof typeof tarotSuits];
  }
  
  return undefined;
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
  
  for (const [key, suit] of Object.entries(tarotSuits)) {
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
  const majorArcanaValues = Object.values(majorArcana);
  
  for (let i = 0; i < 8; i++) {
    const card = majorArcanaValues[i];
    majorArcana1 += `*${card.name}*\n`;
    majorArcana1 += `Upright: ${card.upright}\n`;
    majorArcana1 += `Reversed: ${card.reverse}\n\n`;
  }
  
  messages.push(majorArcana1);
  
  // Second part of Major Arcana (cards 8-15)
  let majorArcana2 = '*Major Arcana (Part 2)*\n\n';
  
  for (let i = 8; i < 16; i++) {
    const card = majorArcanaValues[i];
    majorArcana2 += `*${card.name}*\n`;
    majorArcana2 += `Upright: ${card.upright}\n`;
    majorArcana2 += `Reversed: ${card.reverse}\n\n`;
  }
  
  messages.push(majorArcana2);
  
  // Third part of Major Arcana (cards 16-21)
  let majorArcana3 = '*Major Arcana (Part 3)*\n\n';
  
  for (let i = 16; i < majorArcanaValues.length; i++) {
    const card = majorArcanaValues[i];
    majorArcana3 += `*${card.name}*\n`;
    majorArcana3 += `Upright: ${card.upright}\n`;
    majorArcana3 += `Reversed: ${card.reverse}\n\n`;
  }
  
  messages.push(majorArcana3);
  
  return messages;
} 