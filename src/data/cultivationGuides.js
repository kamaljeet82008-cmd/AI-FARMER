// Comprehensive 6-Stage Crop Cultivation Lifecycle Guides

export const CULTIVATION_GUIDES = {
  wheat: {
    cropNameEn: 'Wheat',
    cropNameHi: 'गेहूं',
    cropNamePa: 'ਕਣਕ',
    stages: [
      {
        stageNumber: 1,
        titleEn: 'Stage 1: Land Preparation & Pre-Sowing Irrigation',
        titleHi: 'चरण 1: खेत की तैयारी एवं रौणी (पलेवा)',
        titlePa: 'ਪੜਾਅ 1: ਖੇਤ ਦੀ ਤਿਆਰੀ ਅਤੇ ਰੌਣੀ (ਪਲੇਵਾ)',
        durationDays: 'Day -10 to Day 0',
        tasks: [
          'Incorporate previous crop residue using a Super Seeder, Happy Seeder, or MB Plough.',
          'Apply Rauni (pre-sowing irrigation) 7-10 days before sowing to ensure optimum seedbed moisture.',
          'Apply 1 bag DAP (50kg) or 3 bags Single Super Phosphate (SSP) + 1 bag MOP (Potash) per acre before final harrowing.',
          'Level the field evenly using laser land leveler to save 20-25% irrigation water.'
        ]
      },
      {
        stageNumber: 2,
        titleEn: 'Stage 2: Seed Treatment & Sowing',
        titleHi: 'चरण 2: बीज उपचार एवं बुवाई',
        titlePa: 'ਪੜਾਅ 2: ਬੀਜ ਸੋਧ ਅਤੇ ਬਿਜਾਈ',
        durationDays: 'Day 0 to Day 5 (Ideal window: Oct 25 - Nov 15)',
        tasks: [
          'Seed Rate: 40-45 kg per acre for certified varieties like PBW 826 or HD 3086.',
          'Mandatory Seed Treatment: Treat seed with Vitavax / Raxil (Tebuconazole 2g/kg seed) to prevent Loose Smut and Flag Smut.',
          'Spacing: 20-22 cm row-to-row spacing using seed-cum-fertilizer drill.',
          'Depth: Sow at 4-5 cm depth into moist soil layer. Avoid deeper sowing to prevent delayed emergence.'
        ]
      },
      {
        stageNumber: 3,
        titleEn: 'Stage 3: Crown Root Initiation (CRI) & 1st Irrigation',
        titleHi: 'चरण 3: ताज जड़ विकास (CRI) एवं पहली सिंचाई',
        titlePa: 'ਪੜਾਅ 3: ਸ਼ਾਖਾਵਾਂ ਫੁੱਟਣਾ (CRI) ਅਤੇ ਪਹਿਲਾ ਪਾਣੀ',
        durationDays: 'Day 20 to Day 25',
        tasks: [
          'Most Critical Stage: Crown roots begin forming 21 days after sowing.',
          'Apply 1st Irrigation precisely between 21-25 days. Do not delay, as delay drastically reduces tillers.',
          'Apply first dose of Nitrogen: 1 bag Urea (45kg) per acre just after or along with 1st irrigation.',
          'Check for early termite or pink stem borer activity.'
        ]
      },
      {
        stageNumber: 4,
        titleEn: 'Stage 4: Tillering, Jointing & Weed Management',
        titleHi: 'चरण 4: कल्ले निकलना, गांठें बनना व खरपतवार नियंत्रण',
        titlePa: 'ਪੜਾਅ 4: ਬੂਟਾ ਮਾਰਨਾ (ਫੁਟਾਰਾ) ਅਤੇ ਗੁੱਲੀ-ਡੰਡੇ ਦੀ ਰੋਕਥਾਮ',
        durationDays: 'Day 30 to Day 65',
        tasks: [
          'Weed Control: Spray for Gullidanda (Phalaris minor) between 30-35 days using recommended post-emergence weedicide (Clodinafop / Pinoxaden / Shaked).',
          'Broadleaf Weeds: Spray 2,4-D or Metsulfuron Methyl if bathua or wild spinach is present.',
          'Apply second dose of Nitrogen: 1 bag Urea (45kg) at 40-45 days during tillering stage.',
          'Apply 2nd irrigation at late tillering (Day 45) and 3rd irrigation at jointing/booting stage (Day 65-70).'
        ]
      },
      {
        stageNumber: 5,
        titleEn: 'Stage 5: Flowering, Grain Filling & Disease Monitoring',
        titleHi: 'चरण 5: बालियां निकलना, दाना भराव व रोग निगरानी',
        titlePa: 'ਪੜਾਅ 5: ਨਿਸਾਰਾ, ਦੁੱਧ ਭਰਨਾ ਅਤੇ ਪੀਲੀ ਕੁੰਗੀ ਦੀ ਨਿਗਰਾਨੀ',
        durationDays: 'Day 75 to Day 110',
        tasks: [
          'Yellow Rust Alert: Regularly inspect under-leaf surfaces for yellow stripe pustules, especially in humid foggy mornings.',
          'Preventive Spray: If yellow rust spots appear, spray Propiconazole 25% EC (Tilt) @ 200 ml in 200 liters of water per acre immediately.',
          'Apply 4th irrigation at flowering and 5th irrigation during milk/dough grain filling stage.',
          'Avoid heavy irrigation on windy days to prevent crop lodging (falling).'
        ]
      },
      {
        stageNumber: 6,
        titleEn: 'Stage 6: Maturity, Harvesting & Safe Grain Storage',
        titleHi: 'चरण 6: कटाई, गहाई एवं सुरक्षित अनाज भंडारण',
        titlePa: 'ਪੜਾਅ 6: ਫਸਲ ਦੀ ਪਕਾਈ, ਵਾਢੀ ਅਤੇ ਸੁਰੱਖਿਅਤ ਸਾਂਭ-ਸੰਭਾਲ',
        durationDays: 'Day 125 to Day 145',
        tasks: [
          'Signs of Maturity: Grains turn hard, golden-yellow, and snap between teeth with a sharp crack.',
          'Harvesting: Harvest using Combine Harvester fitted with SMS (Straw Management System) when grain moisture is below 12%.',
          'Do not burn straw: Use Baler to bundle straw for cattle fodder or bio-energy, earning extra ₹1,500-₹2,000/acre.',
          'Storage: Clean bins with Malathion 50% EC spray. Store dry grain with neem leaves or Celphos tablets against grain weevils.'
        ]
      }
    ],
    defaultReminders: [
      { day: 21, task: '1st Irrigation at CRI Stage + 1 Bag Urea (Most critical for yield)' },
      { day: 32, task: 'Gullidanda weed spray (Pinoxaden/Clodinafop) in moist field' },
      { day: 45, task: '2nd Irrigation + 2nd Bag Urea application' },
      { day: 75, task: '3rd Irrigation at Booting Stage + Inspect field for Yellow Rust' },
      { day: 95, task: '4th Irrigation during Milk filling stage (Gentle water, calm wind)' },
      { day: 135, task: 'Check grain hardness for harvest when moisture < 12%' }
    ]
  },
  mustard: {
    cropNameEn: 'Mustard',
    cropNameHi: 'सरसों',
    cropNamePa: 'ਸਰ੍ਹੋਂ / ਰਾਇਆ',
    stages: [
      {
        stageNumber: 1,
        titleEn: 'Stage 1: Field Preparation & Basal Fertilizers',
        titleHi: 'चरण 1: खेत की तैयारी व बुनियादी खाद',
        titlePa: 'ਪੜਾਅ 1: ਖੇਤ ਦੀ ਤਿਆਰੀ ਅਤੇ ਮੁੱਢਲੀ ਖਾਦ',
        durationDays: 'Day -7 to Day 0',
        tasks: [
          'Mustard requires fine, pulverized, firm seedbed with adequate soil moisture.',
          'Apply 100 kg Single Super Phosphate (SSP) - SSP is superior because it provides 12% vital Sulphur for high oil content.',
          'Apply 25 kg Urea and 10 kg Zinc Sulphate 21% per acre.'
        ]
      },
      {
        stageNumber: 2,
        titleEn: 'Stage 2: Sowing & Seed Treatment',
        titleHi: 'चरण 2: बुवाई एवं बीज उपचार',
        titlePa: 'ਪੜਾਅ 2: ਬਿਜਾਈ ਅਤੇ ਬੀਜ ਸੋਧ',
        durationDays: 'Day 0 to Day 5 (Best: Oct 1 - Oct 25)',
        tasks: [
          'Seed Rate: Exactly 1.5 kg per acre. Avoid dense sowing which causes weak stems and aphid infestation.',
          'Seed Treatment: Treat seed with Thiram or Carbendazim @ 2g/kg seed.',
          'Row Spacing: 30-45 cm apart, plant-to-plant 10-15 cm at 3-4 cm depth.'
        ]
      },
      {
        stageNumber: 3,
        titleEn: 'Stage 3: Thinning & First Irrigation',
        titleHi: 'चरण 3: छंटाई (विरलीकरण) एवं पहली सिंचाई',
        titlePa: 'ਪੜਾਅ 3: ਵਿਰਲਾ ਕਰਨਾ ਅਤੇ ਪਹਿਲਾ ਪਾਣੀ',
        durationDays: 'Day 15 to Day 30',
        tasks: [
          'Mandatory Thinning at 15-20 days: Remove extra crowded seedlings, maintaining 10-12 cm space between plants.',
          'First Irrigation: Apply at 28-35 days after sowing (before flowering).',
          'Top dress 25 kg Urea immediately after 1st irrigation.'
        ]
      },
      {
        stageNumber: 4,
        titleEn: 'Stage 4: Flowering & Pod Formation',
        titleHi: 'चरण 4: फूल आना एवं फलियां बनना',
        titlePa: 'ਪੜਾਅ 4: ਫੁੱਲ ਪੈਣਾ ਅਤੇ ਫਲੀਆਂ ਬਣਨਾ',
        durationDays: 'Day 45 to Day 80',
        tasks: [
          'Second Irrigation: Apply during pod initiation (siliquae formation) around 60-70 days.',
          'Never give heavy flood irrigation during flowering to prevent flower drop.'
        ]
      },
      {
        stageNumber: 5,
        titleEn: 'Stage 5: Aphid (Chepa) & Frost Protection',
        titleHi: 'चरण 5: चेपा (माहू) नियंत्रण व पाले से बचाव',
        titlePa: 'ਪੜਾਅ 5: ਤੇਲੇ (ਚੇਪੇ) ਦੀ ਰੋਕਥਾਮ ਅਤੇ ਕੋਰੇ ਤੋਂ ਬਚਾਅ',
        durationDays: 'Day 70 to Day 105',
        tasks: [
          'Aphid / Mahu Alert: If more than 20 aphids appear on 10cm central shoot tip, spray Thiamethoxam 25% WG @ 80g or Dimethoate 30% EC @ 250ml per acre.',
          'Frost Protection: If temperature drops below 3°C, provide light evening irrigation or burn biomass along field borders.'
        ]
      },
      {
        stageNumber: 6,
        titleEn: 'Stage 6: Harvesting & Drying',
        titleHi: 'चरण 6: कटाई एवं सुखाना',
        titlePa: 'ਪੜਾਅ 6: ਵਾਢੀ ਅਤੇ ਸੁਕਾਉਣਾ',
        durationDays: 'Day 125 to Day 140',
        tasks: [
          'Harvest when 75% of pods turn golden-yellow in morning hours to prevent seed shattering.',
          'Sun dry crop bundles for 4-5 days, then thresh using mechanical thresher.',
          'Dry cleaned seeds to 8% moisture before storing or selling.'
        ]
      }
    ],
    defaultReminders: [
      { day: 18, task: 'Thinning operation: remove excess plants to 10-12 cm spacing' },
      { day: 30, task: '1st Irrigation + 25 kg Urea application' },
      { day: 65, task: '2nd Irrigation at pod formation stage' },
      { day: 75, task: 'Inspect central shoots for Aphid / Chepa colony' },
      { day: 130, task: 'Morning harvest when 75% siliquae turn golden' }
    ]
  }
};
