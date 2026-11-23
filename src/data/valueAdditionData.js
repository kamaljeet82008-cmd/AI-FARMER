// High-Value Agro-Processing & Value Addition Database

export const VALUE_ADDITION_DATA = [
  {
    id: 'va-wheat-atta',
    cropId: 'wheat',
    titleEn: 'Stone-Ground Chakki Whole Wheat Atta & Multigrain Flour',
    titleHi: 'पारंपरिक चक्की का शुद्ध गेहूं व मल्टीग्रेन आटा',
    titlePa: 'ਪੱਥਰ ਦੀ ਚੱਕੀ ਦਾ ਸ਼ੁੱਧ ਆਟਾ ਅਤੇ ਮਲਟੀਗ੍ਰੇਨ ਆਟਾ',
    icon: '🌾',
    rawCropName: 'Wheat (Grade A Clean Grain)',
    rawQuantityBenchmark: '100 Quintals (10,000 kg)',
    rawMandiRevenue: 242500, // 100 Qtl @ ₹2,425/Qtl
    equipmentNeeded: 'Commercial Stone Chakki (10 HP), Vibratory Grain Cleaner & Destoner, Semi-automatic 5kg/10kg Pouch Packing Machine.',
    estEquipmentCost: '₹1,80,000 - ₹2,50,000 (Eligible for 35% PM-FME Subsidy)',
    processingCost: 35000, // Grinding electricity, labor, packaging bags (₹3.5/kg)
    processedYield: '9,700 kg Atta (3% moisture/bran separation) packaged in 5kg/10kg bags',
    processedSellingPricePerKg: 38, // Branded farm-fresh unadulterated whole wheat flour sells at ₹38-₹42/kg
    processedGrossRevenue: 368600, // 9,700 * ₹38
    netAdditionalMargin: 91100, // Revenue difference minus processing costs
    percentageMarginGain: '37.5% higher net return over selling raw grain',
    packagingAndCompliance: 'High-density woven poly bags or food-grade paper bags. FSSAI Basic Registration required (₹100/yr), barcoding optional.',
    salesChannels: 'Direct to residential societies in nearby cities, local Kirana stores, FPO counters, farm gate sales.'
  },
  {
    id: 'va-tomato-puree',
    cropId: 'tomato',
    titleEn: 'Concentrated Tomato Puree & Paste in Glass Jars / Pouches',
    titleHi: 'गाढ़ी टमाटर प्यूरी व पेस्ट (कांच के जार व पाउच)',
    titlePa: 'ਗਾੜ੍ਹੀ ਟਮਾਟਰ ਪਿਊਰੀ ਅਤੇ ਪੇਸਟ (ਜਾਰ ਅਤੇ ਪਾਊਚ)',
    icon: '🍅',
    rawCropName: 'Tomato (Ripe Red Grade B & Surplus)',
    rawQuantityBenchmark: '50 Quintals (5,000 kg)',
    rawMandiRevenue: 50000, // During peak glut when mandi price crashes to ₹10/kg (₹1,000/Qtl)
    equipmentNeeded: 'Stainless Steel Pulper & Seed Separator (2 HP), Steam Jacketed Kettle for Concentration, Vacuum Capping Machine.',
    estEquipmentCost: '₹1,50,000 - ₹2,20,000 (PMFME grant available)',
    processingCost: 28000, // Sterilization, 1000ml pouches/jars, citric acid, labor (₹5.6/kg)
    processedYield: '1,800 kg Concentrated Puree (28° Brix) filled into 1,800 pouches (1kg each)',
    processedSellingPricePerKg: 75, // Wholesale to restaurants/hotels at ₹75/kg
    processedGrossRevenue: 135000,
    netAdditionalMargin: 57000,
    percentageMarginGain: '114% profit increase, completely eliminates losses from market price crashes',
    packagingAndCompliance: 'Retort pouches or sterilized glass bottles. FSSAI state food license, shelf life up to 12 months with natural preservatives.',
    salesChannels: 'Local Dhaba associations, fast food chains, catering businesses, wholesale grocery distribution.'
  },
  {
    id: 'va-mustard-oil',
    cropId: 'mustard',
    titleEn: 'Cold-Pressed (Kachi Ghani) Mustard Oil & Protein Cattle Cake',
    titleHi: 'कोल्ड-प्रेस्ड (कच्ची घानी) सरसों तेल व पौष्टिक खल',
    titlePa: 'ਕੋਲਡ-ਪ੍ਰੈੱਸਡ (ਕੱਚੀ ਘਾਣੀ) ਸਰ੍ਹੋਂ ਦਾ ਤੇਲ ਅਤੇ ਪਸ਼ੂਆਂ ਦੀ ਖਲ',
    icon: '🌼',
    rawCropName: 'Mustard (Cleaned Seeds with 40%+ oil)',
    rawQuantityBenchmark: '50 Quintals (5,000 kg)',
    rawMandiRevenue: 282500, // 50 Qtl @ ₹5,650/Qtl
    equipmentNeeded: 'Cold-press Wooden Kolhu or Low-RPM SS Oil Expeller (5 HP), Filter Press, 1-Liter/5-Liter Tin/PET Can Filler.',
    estEquipmentCost: '₹2,20,000 - ₹3,10,000',
    processingCost: 24000, // ₹4.8 per kg expelling, filter paper, bottles, labels
    processedYield: '1,750 Liters Pure Mustard Oil + 3,100 kg High-Protein Cattle Feed Cake (Khal)',
    processedSellingPricePerKg: 185, // Pure Kachi Ghani Oil sells at ₹185/liter, Oilcake sells at ₹28/kg
    processedGrossRevenue: 410550, // (1750 * 185) + (3100 * 28) = 323,750 + 86,800 = 410,550
    netAdditionalMargin: 104050,
    percentageMarginGain: '36.8% higher net income from dual product streams (Oil + Feed Cake)',
    packagingAndCompliance: 'Food-grade transparent PET bottles or traditional tin containers. FSSAI registration & AGMARK quality seal.',
    salesChannels: 'Direct farm sales to organic consumers, local milk dairies (for cattle cake), specialty grocery marts.'
  },
  {
    id: 'va-potato-chips',
    cropId: 'potato',
    titleEn: 'Artisanal Farm-Fresh Potato Chips & Dehydrated Flakes',
    titleHi: 'खेत से ताजे आलू चिप्स व डिहाइड्रेटेड पापड़',
    titlePa: 'ਖੇਤ ਦੇ ਤਾਜ਼ੇ ਆਲੂਆਂ ਦੇ ਚਿਪਸ ਅਤੇ ਪਾਪੜ',
    icon: '🥔',
    rawCropName: 'Potato (Kufri Chipsona / Jyoti)',
    rawQuantityBenchmark: '40 Quintals (4,000 kg)',
    rawMandiRevenue: 38000, // 40 Qtl @ ₹950/Qtl
    equipmentNeeded: 'Potato Washer & Peeler, High-Precision Slicer, Blanching Tank, Spin Dryer, Batch Fryer / Solar Dryer.',
    estEquipmentCost: '₹1,20,000 - ₹1,90,000',
    processingCost: 26000, // Cooking oil, salt, spices, nitrogen-flushed printed foil pouches
    processedYield: '1,100 kg Crispy Chips (22,000 packets of 50g)',
    processedSellingPricePerKg: 90, // Bulk price ₹90/kg or ₹10 MRP packets at ₹6.50 wholesale
    processedGrossRevenue: 143000,
    netAdditionalMargin: 79000,
    percentageMarginGain: '107% higher return compared to distress wholesale potato sales',
    packagingAndCompliance: 'Nitrogen-flushed aluminized foil packets to prevent sogginess. FSSAI Basic, shelf life 6 months.',
    salesChannels: 'School canteens, highway dhabas, local grocery shops, weekly farmers markets (Kisan Mandis).'
  }
];
