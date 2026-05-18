export interface Prompt {
  left: string;
  right: string;
  nepali?: string;
}

export const WAVELENGTH_PROMPTS: Prompt[] = [
  // ─── classic pairs ───
  { left: 'Cold',                   right: 'Hot' },
  { left: 'Underrated',             right: 'Overrated' },
  { left: 'Useless',                right: 'Useful' },
  { left: 'Cheap',                  right: 'Expensive' },
  { left: 'Tastes bad',             right: 'Tastes good' },
  { left: 'Bad gift',               right: 'Good gift' },
  { left: 'Bad first date',         right: 'Good first date' },
  { left: 'Bad pet',                right: 'Good pet' },
  { left: 'Common',                 right: 'Rare' },
  { left: 'Soft',                   right: 'Hard' },
  { left: 'Boring job',             right: 'Cool job' },
  { left: 'Useless in a fight',     right: 'Useful in a fight' },
  { left: 'Childish',               right: 'Grown-up' },
  { left: 'Sounds like a villain',  right: 'Sounds like a hero' },
  { left: 'Smells bad',             right: 'Smells good' },
  { left: 'Embarrassing to admit',  right: 'Brag-worthy' },
  { left: 'Slow',                   right: 'Fast' },
  { left: 'Quiet',                  right: 'Loud' },
  { left: 'Skip it',                right: 'Must-watch' },
  { left: 'Introvert',              right: 'Extrovert' },
  { left: 'Chaotic',                right: 'Organized' },
  { left: 'Traditional',            right: 'Modern' },
  { left: 'Flexible',               right: 'Stubborn' },
  { left: 'Tourist trap',           right: 'Hidden gem' },

  // ─── nepali / kathmandu flavored ───
  { left: 'Gaun',                   right: 'Sahar',               nepali: 'गाउँ ↔ शहर' },
  { left: 'Newari thing',           right: 'Bahun-Chhetri thing', nepali: 'नेवारी ↔ बाहुन-क्षेत्री' },
  { left: 'Pasal item',             right: 'Mall item',           nepali: 'पसल ↔ मल' },
  { left: 'Bhatti vibe',            right: 'Cafe vibe',           nepali: 'भट्टी ↔ क्याफे' },
  { left: 'Plus 2 energy',          right: "Bachelor's energy" },
  { left: 'New Road',               right: 'Durbarmarg',          nepali: 'न्यूरोड ↔ दरबारमार्ग' },
  { left: 'Thamel',                 right: 'Patan',               nepali: 'थमेल ↔ पाटन' },
  { left: '90s Nepal',              right: '2020s Nepal' },
  { left: 'Dashain feeling',        right: 'Tihar feeling',       nepali: 'दशैंको मन ↔ तिहारको मन' },
  { left: 'Bagmati',                right: 'Phewa',               nepali: 'बागमती ↔ फेवा' },
  { left: 'Local bus',              right: 'Pathao',              nepali: 'लोकल बस ↔ पाठाओ' },
  { left: 'Dhido',                  right: 'Pizza',               nepali: 'ढिडो ↔ पिज्जा' },
  { left: 'Tarkari',                right: 'Snacks',              nepali: 'तरकारी ↔ स्न्याक्स' },
  { left: 'Mom loves it',           right: 'Dad loves it' },
  { left: 'Nepali movie logic',     right: 'Hollywood logic' },

  // ─── relationships ───
  { left: 'Red flag',               right: 'Green flag' },
  { left: 'One-night stand',        right: 'Marriage material' },
  { left: 'Will text back',         right: 'Will block you' },
  { left: 'Broke student',          right: 'Rich uncle' },
  { left: 'Situationship',          right: 'Soulmate' },
  { left: 'Friend zone',            right: 'Wife zone' },
  { left: 'Sneaky link',            right: 'Husband material' },
  { left: '"Sathi" zone',           right: '"Dai" zone',          nepali: '"साथी" ↔ "दाइ"' },
];
