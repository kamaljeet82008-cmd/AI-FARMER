// Official agriculture support directory.
// Only verified public resources are listed. No personal names or phone numbers are invented.
// "Nearby" offices are found live through a map search using the farmer's district.

export const KISAN_CALL_CENTRE = {
  number: '1800-180-1551',
  hours: '6:00 AM - 10:00 PM',
  note: 'Toll free. Farmers can ask in Punjabi, Hindi and other languages.',
};

export const OFFICIAL_PORTALS = [
  { id: 'kvk-locator', title: 'KVK Locator (ICAR)', url: 'https://kvk.icar.gov.in', note: 'Official list of all Krishi Vigyan Kendras with contact details.' },
  { id: 'farmer-portal', title: 'Farmers Portal (Govt. of India)', url: 'https://farmer.gov.in', note: 'Schemes, advisories and official contacts.' },
  { id: 'mkisan', title: 'mKisan Portal', url: 'https://mkisan.gov.in', note: 'Free SMS advisories from agriculture departments.' },
];

// Each entry becomes a "find near me" card. {place} is replaced with the farmer's district/state.
export const EXPERT_SEARCHES = [
  { id: 's-kvk', category: 'catExtension', title: 'Krishi Vigyan Kendra (KVK)', desc: 'Government farm science centre with crop, soil and training experts.', query: 'Krishi Vigyan Kendra {place}', specialties: ['Crop advisory', 'Training', 'Soil & plant testing'] },
  { id: 's-dao', category: 'catExtension', title: 'District Agriculture Office / Agriculture Officer', desc: 'Block and district agriculture officers, subsidies and schemes.', query: 'Chief Agriculture Officer office {place}', specialties: ['Schemes & subsidies', 'Local crop advisory'] },
  { id: 's-disease', category: 'catDisease', title: 'Plant Protection / Plant Pathology (University)', desc: 'Agricultural university departments for crop disease and pest problems.', query: 'agricultural university plant pathology {place}', specialties: ['Crop disease', 'Pest management'] },
  { id: 's-soil', category: 'catSoil', title: 'Soil Testing Laboratory', desc: 'Government soil health labs for soil test and fertilizer advice.', query: 'soil testing laboratory agriculture department {place}', specialties: ['Soil test', 'Soil health card'] },
  { id: 's-irrigation', category: 'catIrrigation', title: 'Soil & Water Conservation / Irrigation Office', desc: 'Drip, sprinkler, tubewell and water management support.', query: 'soil and water conservation department {place}', specialties: ['Drip / sprinkler', 'Water management'] },
  { id: 's-horti', category: 'catHorticulture', title: 'Horticulture Department Office', desc: 'Vegetables, fruits and orchard crops advice and schemes.', query: 'horticulture department office {place}', specialties: ['Vegetables', 'Fruits', 'Orchards'] },
];

export const mapsSearchUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
