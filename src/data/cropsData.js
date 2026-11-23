// Comprehensive Crop Database for Indian Agro-Climatic Zones
// Focus on Punjab, Haryana, Rajasthan, UP, MP, and Northern Plains

export const CROPS_DATA = [
  {
    id: 'wheat',
    nameEn: 'Wheat',
    nameHi: 'गेहूं',
    namePa: 'ਕਣਕ',
    icon: '🌾',
    season: 'rabi',
    suitableSoils: ['loamy', 'clay', 'alluvial', 'black'],
    minPh: 6.0,
    maxPh: 7.8,
    waterRequirement: 'moderate', // Needs 4-5 irrigations
    budgetLevel: 'moderate', // ₹16,000 - ₹22,000 per acre
    durationDays: '130 - 150 days',
    seedRateKgPerAcre: 40,
    seedCostPerKg: 42,
    estCostPerAcre: 18500, // Seeds, fertilizer, machinery, labor, irrigation
    yieldMinQtlPerAcre: 20,
    yieldMaxQtlPerAcre: 26,
    avgMandiPricePerQtl: 2425, // Current MSP / Market price
    risk: 'low',
    riskFactors: {
      en: 'Terminal heat in March, Yellow Rust in humid conditions, lodging during late rains.',
      hi: 'मार्च में अचानक गर्मी, नम मौसम में पीला रतुआ, पकते समय तेज हवा से फसल गिरना।',
      pa: 'ਮਾਰਚ ਵਿੱਚ ਅਚਾਨਕ ਗਰਮੀ, ਨਮੀ ਵਾਲੇ ਮੌਸਮ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ, ਪੱਕਣ ਸਮੇਂ ਤੇਜ਼ ਹਵਾ ਨਾਲ ਡਿੱਗਣਾ।'
    },
    varieties: [
      {
        id: 'pbw-826',
        name: 'PBW 826',
        crop: 'Wheat',
        season: 'Rabi (Early & Timely Sown)',
        duration: '148 days',
        seedRate: '40-45 kg / acre',
        approxCost: '₹1,850 / 40kg bag',
        yieldPotential: '24-27 Qtl/Acre',
        characteristics: 'High heat tolerance during grain filling, resistant to yellow and brown rust, bold grains with high protein.',
        source: 'Punjab Agricultural University (PAU), Ludhiana'
      },
      {
        id: 'hd-3086',
        name: 'Pusa Gautami (HD 3086)',
        crop: 'Wheat',
        season: 'Rabi (Timely Sown Irrigated)',
        duration: '140-145 days',
        seedRate: '40 kg / acre',
        approxCost: '₹1,750 / 40kg bag',
        yieldPotential: '22-25 Qtl/Acre',
        characteristics: 'Excellent chapati making quality, high resistance to stripe and leaf rust, responsive to balanced fertilizers.',
        source: 'ICAR - Indian Agricultural Research Institute (IARI), New Delhi'
      },
      {
        id: 'dbw-187',
        name: 'Karan Vandana (DBW 187)',
        crop: 'Wheat',
        season: 'Rabi (Timely Sown)',
        duration: '145 days',
        seedRate: '40 kg / acre',
        approxCost: '₹1,800 / 40kg bag',
        yieldPotential: '25-28 Qtl/Acre',
        characteristics: 'Biofortified with iron and zinc, high disease resistance, exceptional grain weight (test weight > 42g).',
        source: 'ICAR - Indian Institute of Wheat and Barley Research (IIWBR), Karnal'
      }
    ]
  },
  {
    id: 'mustard',
    nameEn: 'Mustard',
    nameHi: 'सरसों',
    namePa: 'ਸਰ੍ਹੋਂ / ਰਾਇਆ',
    icon: '🌼',
    season: 'rabi',
    suitableSoils: ['loamy', 'sandy', 'alluvial'],
    minPh: 5.8,
    maxPh: 8.2,
    waterRequirement: 'low', // Needs 2-3 irrigations only, drought hardy
    budgetLevel: 'low', // ₹10,000 - ₹14,000 per acre
    durationDays: '125 - 145 days',
    seedRateKgPerAcre: 1.5,
    seedCostPerKg: 350,
    estCostPerAcre: 12000,
    yieldMinQtlPerAcre: 8,
    yieldMaxQtlPerAcre: 12,
    avgMandiPricePerQtl: 5650, // MSP & market rates
    risk: 'low',
    riskFactors: {
      en: 'Aphid attack (chepa) during flowering, frost damage during pod formation.',
      hi: 'फूल आने पर चेपा (माहू) का प्रकोप, फलियां बनते समय पाले का खतरा।',
      pa: 'ਫੁੱਲ ਪੈਣ ਵੇਲੇ ਤੇਲੇ (ਚੇਪੇ) ਦਾ ਹਮਲਾ, ਫਲੀਆਂ ਬਣਨ ਵੇਲੇ ਕੋਰੇ ਦਾ ਖਤਰਾ।'
    },
    varieties: [
      {
        id: 'giriraj-mustard',
        name: 'Giriraj (DRMRIJ-31)',
        crop: 'Mustard',
        season: 'Rabi (Oct-Nov Sowing)',
        duration: '135-140 days',
        seedRate: '1.5 kg / acre',
        approxCost: '₹550 / 1.5kg pack',
        yieldPotential: '9-12 Qtl/Acre',
        characteristics: 'High oil content (41.5%), resistant to white rust and Alternaria blight, suited for irrigated areas.',
        source: 'ICAR - Directorate of Rapeseed-Mustard Research (DRMR), Bharatpur'
      },
      {
        id: 'pau-rlc3',
        name: 'RLC 3 (Gobhi Sarson)',
        crop: 'Mustard',
        season: 'Rabi',
        duration: '145-150 days',
        seedRate: '1.5-2 kg / acre',
        approxCost: '₹500 / 1.5kg pack',
        yieldPotential: '8-10 Qtl/Acre',
        characteristics: 'Canola quality, very low erucic acid (<2%), premium price in health oil markets.',
        source: 'Punjab Agricultural University (PAU), Ludhiana'
      }
    ]
  },
  {
    id: 'paddy',
    nameEn: 'Paddy / Basmati',
    nameHi: 'धान / बासमती',
    namePa: 'ਝੋਨਾ / ਬਾਸਮਤੀ',
    icon: '🌱',
    season: 'kharif',
    suitableSoils: ['clay', 'loamy', 'alluvial'],
    minPh: 5.5,
    maxPh: 7.5,
    waterRequirement: 'high', // Requires standing water/assured tubewell
    budgetLevel: 'high', // ₹22,000 - ₹28,000 per acre
    durationDays: '110 - 145 days',
    seedRateKgPerAcre: 5, // for nursery
    seedCostPerKg: 160,
    estCostPerAcre: 24500,
    yieldMinQtlPerAcre: 26,
    yieldMaxQtlPerAcre: 34,
    avgMandiPricePerQtl: 2320, // Non-basmati MSP, Basmati can go ₹3,500-₹4,500
    risk: 'moderate',
    riskFactors: {
      en: 'High electricity/diesel water pumping cost, sheath blight, stem borer, delayed rains.',
      hi: 'पानी खींचने में अधिक बिजली/डीजल खर्च, तना छेदक, शीथ ब्लाइट, देरी से वर्षा।',
      pa: 'ਪਾਣੀ ਲਗਾਉਣ ਲਈ ਵੱਧ ਬਿਜਲੀ/ਡੀਜ਼ਲ ਖਰਚਾ, ਤਣਾ ਛੇਦਕ ਸੁੰਡੀ, ਸ਼ੀਥ ਬਲਾਈਟ, ਬਾਰਿਸ਼ਾਂ ਵਿੱਚ ਦੇਰੀ।'
    },
    varieties: [
      {
        id: 'pr-126',
        name: 'PR 126 (Short Duration Non-Basmati)',
        crop: 'Paddy',
        season: 'Kharif (June 20 - July 10)',
        duration: '123 days (seed to seed, nursery 28 days)',
        seedRate: '4-5 kg / acre',
        approxCost: '₹350 / 5kg bag',
        yieldPotential: '30-34 Qtl/Acre',
        characteristics: 'Saves 3-4 irrigations, matures early, leaves field ready on time for early wheat or potato sowing.',
        source: 'Punjab Agricultural University (PAU), Ludhiana'
      },
      {
        id: 'pusa-1121',
        name: 'Pusa Basmati 1121',
        crop: 'Paddy',
        season: 'Kharif (July Sowing)',
        duration: '140-145 days',
        seedRate: '5 kg / acre',
        approxCost: '₹600 / 5kg bag',
        yieldPotential: '18-22 Qtl/Acre (High value)',
        characteristics: 'World-renowned extra long grain (up to 21mm cooked), aromatic, fetches ₹3,400 - ₹4,400/Qtl in mandi.',
        source: 'ICAR - Indian Agricultural Research Institute (IARI), New Delhi'
      }
    ]
  },
  {
    id: 'potato',
    nameEn: 'Potato',
    nameHi: 'आलू',
    namePa: 'ਆਲੂ',
    icon: '🥔',
    season: 'rabi',
    suitableSoils: ['loamy', 'sandy', 'alluvial'],
    minPh: 5.2,
    maxPh: 6.8,
    waterRequirement: 'moderate',
    budgetLevel: 'high', // ₹45,000 - ₹55,000 per acre (high seed tuber cost)
    durationDays: '85 - 105 days',
    seedRateKgPerAcre: 1200, // Seed tubers in kg
    seedCostPerKg: 22,
    estCostPerAcre: 48000,
    yieldMinQtlPerAcre: 100,
    yieldMaxQtlPerAcre: 140,
    avgMandiPricePerQtl: 950, // Highly fluctuating (₹600 - ₹1,400)
    risk: 'high',
    riskFactors: {
      en: 'High market price volatility, Late Blight disease during cloudy fog, cold storage availability.',
      hi: 'बाजार भाव में भारी उतार-चढ़ाव, कोहरे में पछेती झुलसा रोग, कोल्ड स्टोर की उपलब्धता।',
      pa: 'ਮੰਡੀ ਭਾਅ ਵਿੱਚ ਵੱਡਾ ਉਤਰਾਅ-ਚੜ੍ਹਾਅ, ਧੁੰਦ ਵੇਲੇ ਪਿਛੇਤਾ ਝੁਲਸਾ ਰੋਗ, ਕੋਲਡ ਸਟੋਰ ਦੀ ਲੋੜ।'
    },
    varieties: [
      {
        id: 'kufri-pukhraj',
        name: 'Kufri Pukhraj',
        crop: 'Potato',
        season: 'Rabi (Early Sowing Oct)',
        duration: '75-90 days',
        seedRate: '12-14 Qtl / acre',
        approxCost: '₹22,000 / 12 Qtl',
        yieldPotential: '120-150 Qtl/Acre',
        characteristics: 'Early bulking, large oval tubers with yellow skin, highly popular for table consumption.',
        source: 'ICAR - Central Potato Research Institute (CPRI), Shimla'
      },
      {
        id: 'kufri-jyoti',
        name: 'Kufri Jyoti',
        crop: 'Potato',
        season: 'Rabi',
        duration: '90-105 days',
        seedRate: '12-15 Qtl / acre',
        approxCost: '₹24,000 / 12 Qtl',
        yieldPotential: '100-130 Qtl/Acre',
        characteristics: 'Moderate resistance to late blight, excellent boiling and processing suitability.',
        source: 'ICAR - CPRI Shimla'
      }
    ]
  },
  {
    id: 'cotton',
    nameEn: 'Cotton (Bt / Desi)',
    nameHi: 'कपास / नरमा',
    namePa: 'ਨਰਮਾ / ਕਪਾਹ',
    icon: '☁️',
    season: 'kharif',
    suitableSoils: ['black', 'alluvial', 'loamy'],
    minPh: 6.5,
    maxPh: 8.5,
    waterRequirement: 'moderate',
    budgetLevel: 'high',
    durationDays: '150 - 170 days',
    seedRateKgPerAcre: 1.8,
    seedCostPerKg: 1050,
    estCostPerAcre: 26000,
    yieldMinQtlPerAcre: 8,
    yieldMaxQtlPerAcre: 13,
    avgMandiPricePerQtl: 7100, // MSP & mandi rate
    risk: 'high',
    riskFactors: {
      en: 'Pink bollworm infestation, Cotton Leaf Curl Virus (CLCuV), waterlogging during heavy monsoon.',
      hi: 'गुलाबी सुंडी का हमला, पत्ता मरोड़ वायरस, भारी बारिश में जलभराव।',
      pa: 'ਗੁਲਾਬੀ ਸੁੰਡੀ ਦਾ ਹਮਲਾ, ਪੱਤਾ ਮਰੋੜ ਵਾਇਰਸ (ਚਿੱਟੀ ਮੱਖੀ), ਭਾਰੀ ਮੀਂਹ ਨਾਲ ਪਾਣੀ ਖੜ੍ਹਨਾ।'
    },
    varieties: [
      {
        id: 'rch-659',
        name: 'RCH 659 BG-II',
        crop: 'Cotton',
        season: 'Kharif (April-May)',
        duration: '155-165 days',
        seedRate: '1.8 kg (2 packets) / acre',
        approxCost: '₹1,750 / 2 packets',
        yieldPotential: '9-12 Qtl/Acre',
        characteristics: 'High boll retention, medium-long staple, tolerant to sucking pests.',
        source: 'Rasi Seeds / Authorized Govt Depot'
      }
    ]
  },
  {
    id: 'maize',
    nameEn: 'Maize / Corn',
    nameHi: 'मक्का',
    namePa: 'ਮੱਕੀ',
    icon: '🌽',
    season: 'kharif', // also spring maize
    suitableSoils: ['loamy', 'alluvial', 'sandy'],
    minPh: 5.8,
    maxPh: 7.5,
    waterRequirement: 'moderate',
    budgetLevel: 'moderate',
    durationDays: '95 - 110 days',
    seedRateKgPerAcre: 8,
    seedCostPerKg: 280,
    estCostPerAcre: 15500,
    yieldMinQtlPerAcre: 22,
    yieldMaxQtlPerAcre: 28,
    avgMandiPricePerQtl: 2150,
    risk: 'low',
    riskFactors: {
      en: 'Fall Armyworm pest during knee-high stage, temporary water stagnation.',
      hi: 'घुटने की ऊंचाई पर फॉल आर्मीवर्म का हमला, खेत में पानी भर जाना।',
      pa: 'ਫਾਲ ਆਰਮੀਵਰਮ ਸੁੰਡੀ ਦਾ ਹਮਲਾ, ਮੀਂਹ ਦਾ ਪਾਣੀ ਜ਼ਿਆਦਾ ਸਮਾਂ ਖੜ੍ਹਨਾ।'
    },
    varieties: [
      {
        id: 'pau-pmh1',
        name: 'PMH 1 (Punjab Maize Hybrid 1)',
        crop: 'Maize',
        season: 'Kharif',
        duration: '95 days',
        seedRate: '8 kg / acre',
        approxCost: '₹1,800 / 8kg bag',
        yieldPotential: '23-27 Qtl/Acre',
        characteristics: 'Orange flint grains, tolerant to stalk rot, ideal for food, feed, and silage.',
        source: 'PAU Ludhiana'
      }
    ]
  },
  {
    id: 'tomato',
    nameEn: 'Tomato (Vegetable)',
    nameHi: 'टमाटर',
    namePa: 'ਟਮਾਟਰ',
    icon: '🍅',
    season: 'rabi', // also early summer
    suitableSoils: ['loamy', 'sandy', 'alluvial'],
    minPh: 6.0,
    maxPh: 7.2,
    waterRequirement: 'moderate',
    budgetLevel: 'high',
    durationDays: '110 - 130 days',
    seedRateKgPerAcre: 0.15, // 150 grams hybrid seed
    seedCostPerKg: 35000, // ₹5,000 for 150g
    estCostPerAcre: 38000,
    yieldMinQtlPerAcre: 140,
    yieldMaxQtlPerAcre: 220,
    avgMandiPricePerQtl: 1100, // Highly fluctuating (₹500 - ₹3,000)
    risk: 'high',
    riskFactors: {
      en: 'Early and Late Blight, whitefly leaf curl, severe price drops during peak harvest glut.',
      hi: 'अगेती व पछेती झुलसा रोग, सफेद मक्खी, बंपर आवक के समय दाम तेजी से गिरना।',
      pa: 'ਅਗੇਤਾ ਅਤੇ ਪਿਛੇਤਾ ਝੁਲਸਾ ਰੋਗ, ਚਿੱਟੀ ਮੱਖੀ, ਵਾਢੀ ਵੇਲੇ ਮੰਡੀ ਵਿੱਚ ਭਾਅ ਅਚਾਨਕ ਡਿੱਗਣਾ।'
    },
    varieties: [
      {
        id: 'pusa-ruby',
        name: 'Pusa Ruby & Punjab Ratta',
        crop: 'Tomato',
        season: 'Rabi / Spring',
        duration: '115 days',
        seedRate: '150 g / acre',
        approxCost: '₹1,200 / 150g',
        yieldPotential: '150-180 Qtl/Acre',
        characteristics: 'Uniform red color, thick pericarp suitable for long-distance transport and puree.',
        source: 'IARI / PAU'
      }
    ]
  },
  {
    id: 'moong',
    nameEn: 'Moong (Summer Pulse)',
    nameHi: 'मूंग (दाल)',
    namePa: 'ਮੂੰਗੀ (ਗਰਮੀਆਂ ਦੀ ਦਾਲ)',
    icon: '🥣',
    season: 'zaid',
    suitableSoils: ['loamy', 'alluvial', 'sandy'],
    minPh: 6.2,
    maxPh: 7.5,
    waterRequirement: 'low', // 3-4 light irrigations, fixes nitrogen
    budgetLevel: 'low',
    durationDays: '60 - 70 days', // Catch crop between wheat and paddy
    seedRateKgPerAcre: 12,
    seedCostPerKg: 140,
    estCostPerAcre: 8500,
    yieldMinQtlPerAcre: 4.5,
    yieldMaxQtlPerAcre: 6.5,
    avgMandiPricePerQtl: 8550, // High MSP
    risk: 'low',
    riskFactors: {
      en: 'Pre-monsoon showers during maturity can spoil pods; yellow mosaic virus.',
      hi: 'पकते समय आंधी-बारिश से फलियां खराब होना, पीला मोज़ेक वायरस।',
      pa: 'ਪੱਕਣ ਵੇਲੇ ਬੇਮੌਸਮਾ ਮੀਂਹ ਪੈਣ ਨਾਲ ਫਲੀਆਂ ਖਰਾਬ ਹੋਣਾ, ਪੀਲਾ ਮੋਜ਼ੇਕ ਵਾਇਰਸ।'
    },
    varieties: [
      {
        id: 'sml-668',
        name: 'SML 668 & SML 1827',
        crop: 'Moong',
        season: 'Zaid (Summer: March 20 - April 15)',
        duration: '60-65 days',
        seedRate: '12-15 kg / acre',
        approxCost: '₹1,800 / 12kg pack',
        yieldPotential: '5-7 Qtl/Acre',
        characteristics: 'Short duration, matures synchronously, leaves land ready for basmati or paddy, adds 30kg organic nitrogen.',
        source: 'PAU Ludhiana'
      }
    ]
  }
];
