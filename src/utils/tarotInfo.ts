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
    name: "Cups (Water)", 
    display: "Cups (Water)",
    category: 'suit',
    themes: "Emotions, intuition, relationships, and love.", 
    focus: "The inner world, feelings, love, and connections with others.", 
    strengths: "Compassion, imagination, emotional intelligence, empathy.", 
    challenges: "Over-sensitivity, emotional overwhelm, escapism." 
  },
  wands: { 
    key: 'wands',
    name: "Wands (Fire)", 
    display: "Wands (Fire)",
    category: 'suit',
    themes: "Action, passion, movement, energy.", 
    focus: "Inspiration, action, willpower, and spiritual growth.", 
    strengths: "Drive, enthusiasm, confidence, leadership.", 
    challenges: "Impulsiveness, burnout, arrogance, lack of direction." 
  },
  swords: { 
    key: 'swords',
    name: "Swords (Air)", 
    display: "Swords (Air)",
    category: 'suit',
    themes: "Thoughts, communication, intellect, and conflict.", 
    focus: "Mental clarity, truth, decision-making, problem solving.", 
    strengths: "Logic, rationality, analytical thinking.", 
    challenges: "Overthinking, harsh words, conflict, emotional detachment." 
  },
  pentacles: { 
    key: 'pentacles',
    name: "Pentacles (Earth)", 
    display: "Pentacles (Earth)",
    category: 'suit',
    themes: "Finances, work, material possessions, and physical world.", 
    focus: "Practicality, stability, finances, and tangible achievements.", 
    strengths: "Hard work, reliability, resourcefulness, patience.", 
    challenges: "Overemphasis on materialism, stagnation, workaholism." 
  }
};

// Minor Arcana - Cups
export const minorArcanaCups: Record<string, TarotCardInfo> = {
  acecups: {
    key: 'acecups',
    name: "Ace of Cups",
    display: "Ace of Cups",
    category: 'cups',
    upright: "New feelings, new relationships, intuition, emotional fulfillment",
    reverse: "Emotional loss, blocked creativity, emptiness, feeling unloved"
  },
  twocups: {
    key: 'twocups',
    name: "Two of Cups",
    display: "Two of Cups",
    category: 'cups',
    upright: "Unity, partnership, mutual attraction, connection",
    reverse: "Imbalance in relationship, miscommunication, tension"
  },
  threecups: {
    key: 'threecups',
    name: "Three of Cups",
    display: "Three of Cups",
    category: 'cups',
    upright: "Celebration, friendship, community, joy, gatherings",
    reverse: "Overindulgence, gossip, isolation, exclusion"
  },
  fourcups: {
    key: 'fourcups',
    name: "Four of Cups",
    display: "Four of Cups",
    category: 'cups',
    upright: "Contemplation, apathy, reevaluation, discontent",
    reverse: "New perspective, acceptance, moving forward"
  },
  fivecups: {
    key: 'fivecups',
    name: "Five of Cups",
    display: "Five of Cups",
    category: 'cups',
    upright: "Loss, grief, disappointment, regret, focus on the negative",
    reverse: "Acceptance, moving on, finding peace, forgiveness"
  },
  sixcups: {
    key: 'sixcups',
    name: "Six of Cups",
    display: "Six of Cups",
    category: 'cups',
    upright: "Nostalgia, childhood memories, innocence, joy, reunion",
    reverse: "Stuck in the past, unrealistic memories, moving forward"
  },
  sevencups: {
    key: 'sevencups',
    name: "Seven of Cups",
    display: "Seven of Cups",
    category: 'cups',
    upright: "Choices, fantasy, illusion, wishful thinking, options",
    reverse: "Clarity, commitment, purpose, realistic choices"
  },
  eightcups: {
    key: 'eightcups',
    name: "Eight of Cups",
    display: "Eight of Cups",
    category: 'cups',
    upright: "Walking away, disillusionment, leaving behind, seeking truth",
    reverse: "Fear of change, fear of loss, staying in a bad situation"
  },
  ninecups: {
    key: 'ninecups',
    name: "Nine of Cups",
    display: "Nine of Cups",
    category: 'cups',
    upright: "Contentment, satisfaction, gratitude, wish fulfillment",
    reverse: "Dissatisfaction, greed, materialism, overindulgence"
  },
  tencups: {
    key: 'tencups',
    name: "Ten of Cups",
    display: "Ten of Cups",
    category: 'cups',
    upright: "Divine love, blissful relationships, harmony, alignment",
    reverse: "Broken home, separation, domestic conflict, disharmony"
  },
  pagecups: {
    key: 'pagecups',
    name: "Page of Cups",
    display: "Page of Cups",
    category: 'cups',
    upright: "Creative opportunities, intuitive messages, curiosity, possibility",
    reverse: "Emotional immaturity, creative blocks, mood swings"
  },
  knightcups: {
    key: 'knightcups',
    name: "Knight of Cups",
    display: "Knight of Cups",
    category: 'cups',
    upright: "Romantic, imaginative, sensitive, following one's heart",
    reverse: "Moodiness, disappointment, unrealistic expectations"
  },
  queencups: {
    key: 'queencups',
    name: "Queen of Cups",
    display: "Queen of Cups",
    category: 'cups',
    upright: "Compassionate, caring, emotionally stable, intuitive, in flow",
    reverse: "Martyrdom, insecurity, giving too much, emotionally unstable"
  },
  kingcups: {
    key: 'kingcups',
    name: "King of Cups",
    display: "King of Cups",
    category: 'cups',
    upright: "Emotional balance, generosity, diplomatic, wise counsel",
    reverse: "Emotional manipulation, moodiness, coldness"
  }
};

// Minor Arcana - Wands
export const minorArcanaWands: Record<string, TarotCardInfo> = {
  acewands: {
    key: 'acewands',
    name: "Ace of Wands",
    display: "Ace of Wands",
    category: 'wands',
    upright: "Inspiration, new opportunities, growth, potential",
    reverse: "Delays, blocks, lack of energy, lack of passion"
  },
  twowands: {
    key: 'twowands',
    name: "Two of Wands",
    display: "Two of Wands",
    category: 'wands',
    upright: "Future planning, progress, decisions, discovery",
    reverse: "Fear of change, playing it safe, bad planning"
  },
  threewands: {
    key: 'threewands',
    name: "Three of Wands",
    display: "Three of Wands",
    category: 'wands',
    upright: "Expansion, foresight, overseas opportunities, preparation",
    reverse: "Obstacles, delays, frustration, lack of foresight"
  },
  fourwands: {
    key: 'fourwands',
    name: "Four of Wands",
    display: "Four of Wands",
    category: 'wands',
    upright: "Celebration, harmony, marriage, home, community",
    reverse: "Lack of support, transience, home conflicts"
  },
  fivewands: {
    key: 'fivewands',
    name: "Five of Wands",
    display: "Five of Wands",
    category: 'wands',
    upright: "Conflict, disagreements, competition, tension, diversity",
    reverse: "Conflict avoidance, tension release, compromise"
  },
  sixwands: {
    key: 'sixwands',
    name: "Six of Wands",
    display: "Six of Wands",
    category: 'wands',
    upright: "Success, public recognition, progress, self-confidence",
    reverse: "Fall from grace, egotism, doubts, impostor syndrome"
  },
  sevenwands: {
    key: 'sevenwands',
    name: "Seven of Wands",
    display: "Seven of Wands",
    category: 'wands',
    upright: "Challenge, competition, protection, perseverance",
    reverse: "Giving up, overwhelmed, self-doubt, yielding"
  },
  eightwands: {
    key: 'eightwands',
    name: "Eight of Wands",
    display: "Eight of Wands",
    category: 'wands',
    upright: "Speed, action, air travel, movement, quick decisions",
    reverse: "Delays, frustration, scattered energy, slowing down"
  },
  ninewands: {
    key: 'ninewands',
    name: "Nine of Wands",
    display: "Nine of Wands",
    category: 'wands',
    upright: "Resilience, courage, persistence, test of faith, boundaries",
    reverse: "Exhaustion, giving up, overwhelmed, defensive"
  },
  tenwands: {
    key: 'tenwands',
    name: "Ten of Wands",
    display: "Ten of Wands",
    category: 'wands',
    upright: "Burden, responsibility, hard work, stress, achievement",
    reverse: "Failure to delegate, overstressed, burned out, giving up"
  },
  pagewands: {
    key: 'pagewands',
    name: "Page of Wands",
    display: "Page of Wands",
    category: 'wands',
    upright: "Exploration, excitement, freedom, adventure, potential",
    reverse: "Lack of direction, procrastination, hastiness"
  },
  knightwands: {
    key: 'knightwands',
    name: "Knight of Wands",
    display: "Knight of Wands",
    category: 'wands',
    upright: "Energy, passion, inspired action, adventure, impulsiveness",
    reverse: "Anger, impulsivity, recklessness, lack of direction"
  },
  queenwands: {
    key: 'queenwands',
    name: "Queen of Wands",
    display: "Queen of Wands",
    category: 'wands',
    upright: "Courage, confidence, independence, social butterfly, determination",
    reverse: "Demanding, vengeful, entitled, jealous, insecure"
  },
  kingwands: {
    key: 'kingwands',
    name: "King of Wands",
    display: "King of Wands",
    category: 'wands',
    upright: "Natural-born leader, vision, entrepreneur, honor, big picture",
    reverse: "Impulsive, overbearing, unachievable expectations, tyrannical"
  }
};

// Minor Arcana - Swords
export const minorArcanaSwords: Record<string, TarotCardInfo> = {
  aceswords: {
    key: 'aceswords',
    name: "Ace of Swords",
    display: "Ace of Swords",
    category: 'swords',
    upright: "Breakthrough, clarity, sharp mind, truth, mental strength",
    reverse: "Confusion, brutality, chaos, misuse of power"
  },
  twoswords: {
    key: 'twoswords',
    name: "Two of Swords",
    display: "Two of Swords",
    category: 'swords',
    upright: "Difficult choices, indecision, stalemate, denial, blocked emotions",
    reverse: "Indecision, confusion, information overload, no right choice"
  },
  threeswords: {
    key: 'threeswords',
    name: "Three of Swords",
    display: "Three of Swords",
    category: 'swords',
    upright: "Heartbreak, emotional pain, sorrow, grief, hurt",
    reverse: "Healing, forgiveness, recovery, moving on"
  },
  fourswords: {
    key: 'fourswords',
    name: "Four of Swords",
    display: "Four of Swords",
    category: 'swords',
    upright: "Rest, restoration, contemplation, recuperation, passive meditation",
    reverse: "Restlessness, burnout, exhaustion, stagnation"
  },
  fiveswords: {
    key: 'fiveswords',
    name: "Five of Swords",
    display: "Five of Swords",
    category: 'swords',
    upright: "Conflict, tension, loss, defeat, winning at all costs",
    reverse: "Reconciliation, making amends, past resentment"
  },
  sixswords: {
    key: 'sixswords',
    name: "Six of Swords",
    display: "Six of Swords",
    category: 'swords',
    upright: "Transition, change, rite of passage, releasing baggage",
    reverse: "Stuck in transition, unfinished business, baggage"
  },
  sevenswords: {
    key: 'sevenswords',
    name: "Seven of Swords",
    display: "Seven of Swords",
    category: 'swords',
    upright: "Deception, trickery, tactics, strategy, resourcefulness",
    reverse: "Confession, conscience, regret, exposure"
  },
  eightswords: {
    key: 'eightswords',
    name: "Eight of Swords",
    display: "Eight of Swords",
    category: 'swords',
    upright: "Imprisonment, entrapment, self-victimization, limiting beliefs",
    reverse: "Self-acceptance, new perspective, freedom, release"
  },
  nineswords: {
    key: 'nineswords',
    name: "Nine of Swords",
    display: "Nine of Swords",
    category: 'swords',
    upright: "Anxiety, worry, fear, depression, nightmares",
    reverse: "Hope, reaching out, despair, healing"
  },
  tenswords: {
    key: 'tenswords',
    name: "Ten of Swords",
    display: "Ten of Swords",
    category: 'swords',
    upright: "Painful endings, deep wounds, betrayal, loss, crisis",
    reverse: "Recovery, regeneration, resisting an inevitable end"
  },
  pageswords: {
    key: 'pageswords',
    name: "Page of Swords",
    display: "Page of Swords",
    category: 'swords',
    upright: "New ideas, curiosity, thirst for knowledge, new ways of communicating",
    reverse: "Deception, manipulation, all talk and no action"
  },
  knightswords: {
    key: 'knightswords',
    name: "Knight of Swords",
    display: "Knight of Swords",
    category: 'swords',
    upright: "Action, impulsiveness, defending beliefs, swift change",
    reverse: "No direction, disregard for consequences, unpredictability"
  },
  queenswords: {
    key: 'queenswords',
    name: "Queen of Swords",
    display: "Queen of Swords",
    category: 'swords',
    upright: "Independent, unbiased judgment, clear boundaries, direct communication",
    reverse: "Overly emotional, easily influenced, cold, bitter"
  },
  kingswords: {
    key: 'kingswords',
    name: "King of Swords",
    display: "King of Swords",
    category: 'swords',
    upright: "Mental clarity, intellectual power, authority, truth",
    reverse: "Manipulation, tyranny, cold and ruthless"
  }
};

// Minor Arcana - Pentacles
export const minorArcanaPentacles: Record<string, TarotCardInfo> = {
  acepentacles: {
    key: 'acepentacles',
    name: "Ace of Pentacles",
    display: "Ace of Pentacles",
    category: 'pentacles',
    upright: "New financial opportunity, manifestation, abundance, security",
    reverse: "Lost opportunity, lack of planning, scarcity mindset"
  },
  twopentacles: {
    key: 'twopentacles',
    name: "Two of Pentacles",
    display: "Two of Pentacles",
    category: 'pentacles',
    upright: "Balance, adaptability, time management, prioritization",
    reverse: "Imbalance, disorganization, overwhelmed, juggling priorities"
  },
  threepentacles: {
    key: 'threepentacles',
    name: "Three of Pentacles",
    display: "Three of Pentacles",
    category: 'pentacles',
    upright: "Teamwork, collaboration, learning, implementation",
    reverse: "Lack of teamwork, disorganized, competition, lack of skill"
  },
  fourpentacles: {
    key: 'fourpentacles',
    name: "Four of Pentacles",
    display: "Four of Pentacles",
    category: 'pentacles',
    upright: "Security, conservation, frugality, boundaries",
    reverse: "Greed, materialism, possessiveness, blocked change"
  },
  fivepentacles: {
    key: 'fivepentacles',
    name: "Five of Pentacles",
    display: "Five of Pentacles",
    category: 'pentacles',
    upright: "Financial loss, poverty, lack mindset, isolation, worry",
    reverse: "Recovery, spiritual growth, asking for help"
  },
  sixpentacles: {
    key: 'sixpentacles',
    name: "Six of Pentacles",
    display: "Six of Pentacles",
    category: 'pentacles',
    upright: "Giving, receiving, sharing wealth, generosity, charity",
    reverse: "Strings attached, stinginess, power and domination"
  },
  sevenpentacles: {
    key: 'sevenpentacles',
    name: "Seven of Pentacles",
    display: "Seven of Pentacles",
    category: 'pentacles',
    upright: "Long-term view, sustainable results, perseverance, investment",
    reverse: "Lack of reward, unrealistic expectations, limited success"
  },
  eightpentacles: {
    key: 'eightpentacles',
    name: "Eight of Pentacles",
    display: "Eight of Pentacles",
    category: 'pentacles',
    upright: "Apprenticeship, repetition, mastery, skill development",
    reverse: "Perfectionism, no ambition, uninspired, no motivation"
  },
  ninepentacles: {
    key: 'ninepentacles',
    name: "Nine of Pentacles",
    display: "Nine of Pentacles",
    category: 'pentacles',
    upright: "Abundance, luxury, self-sufficiency, financial independence",
    reverse: "Showing off, superficial, living beyond means, financial dependence"
  },
  tenpentacles: {
    key: 'tenpentacles',
    name: "Ten of Pentacles",
    display: "Ten of Pentacles",
    category: 'pentacles',
    upright: "Wealth, family, establishment, retirement, ancestors",
    reverse: "Family disputes, bankruptcy, loss of home, financial failure"
  },
  pagepentacles: {
    key: 'pagepentacles',
    name: "Page of Pentacles",
    display: "Page of Pentacles",
    category: 'pentacles',
    upright: "Manifestation, financial opportunity, skill development",
    reverse: "Lack of progress, procrastination, learn from failure"
  },
  knightpentacles: {
    key: 'knightpentacles',
    name: "Knight of Pentacles",
    display: "Knight of Pentacles",
    category: 'pentacles',
    upright: "Hard work, productivity, routine, conservatism",
    reverse: "Workaholic, stagnation, boredom, feeling stuck"
  },
  queenpentacles: {
    key: 'queenpentacles',
    name: "Queen of Pentacles",
    display: "Queen of Pentacles",
    category: 'pentacles',
    upright: "Nurturing, practical, providing financially, security",
    reverse: "Financial independence, self-care, work-home conflict"
  },
  kingpentacles: {
    key: 'kingpentacles',
    name: "King of Pentacles",
    display: "King of Pentacles",
    category: 'pentacles',
    upright: "Wealth, business, leadership, security, discipline, abundance",
    reverse: "Financially inept, obsessed with wealth, stubborn, greedy"
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
  ...minorArcanaCups,
  ...minorArcanaWands,
  ...minorArcanaSwords,
  ...minorArcanaPentacles,
  ...tarotSuits
};

// Create arrays of cards by category for easy access
export const MAJOR_ARCANA_CARDS = Object.values(majorArcana);
export const CUPS_CARDS = Object.values(minorArcanaCups);
export const WANDS_CARDS = Object.values(minorArcanaWands);
export const SWORDS_CARDS = Object.values(minorArcanaSwords);
export const PENTACLES_CARDS = Object.values(minorArcanaPentacles);
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
  
  // Minor Arcana - Cups
  let cupCards = '*Minor Arcana - Cups*\n\n';
  
  for (const card of CUPS_CARDS) {
    cupCards += `*${card.name}*\n`;
    cupCards += `Upright: ${card.upright}\n`;
    cupCards += `Reversed: ${card.reverse}\n\n`;
  }
  
  messages.push(cupCards);
  
  // Minor Arcana - Wands
  let wandCards = '*Minor Arcana - Wands*\n\n';
  
  for (const card of WANDS_CARDS) {
    wandCards += `*${card.name}*\n`;
    wandCards += `Upright: ${card.upright}\n`;
    wandCards += `Reversed: ${card.reverse}\n\n`;
  }
  
  messages.push(wandCards);
  
  // Minor Arcana - Swords
  let swordCards = '*Minor Arcana - Swords*\n\n';
  
  for (const card of SWORDS_CARDS) {
    swordCards += `*${card.name}*\n`;
    swordCards += `Upright: ${card.upright}\n`;
    swordCards += `Reversed: ${card.reverse}\n\n`;
  }
  
  messages.push(swordCards);
  
  // Minor Arcana - Pentacles
  let pentacleCards = '*Minor Arcana - Pentacles*\n\n';
  
  for (const card of PENTACLES_CARDS) {
    pentacleCards += `*${card.name}*\n`;
    pentacleCards += `Upright: ${card.upright}\n`;
    pentacleCards += `Reversed: ${card.reverse}\n\n`;
  }
  
  messages.push(pentacleCards);
  
  return messages;
} 