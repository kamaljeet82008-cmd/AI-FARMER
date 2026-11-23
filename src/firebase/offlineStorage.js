// Resilient Offline-First Storage Engine for KrishiMitra AI
// Supports seamless local persistence with automatic Firebase Sync ready

const STORAGE_KEYS = {
  PROFILE: 'krishimitra_farmer_profile',
  CROP_PLAN: 'krishimitra_crop_plan',
  EXPENSES: 'krishimitra_expenses',
  ACTIVITIES: 'krishimitra_activities',
  DISEASE_HISTORY: 'krishimitra_disease_history',
  IRRIGATIONS: 'krishimitra_irrigations',
  SOWING_DETAILS: 'krishimitra_sowing_details'
};

// Default Realistic Profile for Immediate Demonstration
const DEFAULT_PROFILE = {
  landArea: 5,
  landUnit: 'acre',
  acresStandard: 5.0,
  village: 'Bija',
  district: 'Ludhiana',
  state: 'Punjab',
  gpsLocation: '30.7046° N, 76.1085° E',
  isEntireCultivable: true,
  cultivableArea: 5.0,
  soilType: 'loamy',
  soilPh: 7.2,
  soilNutrients: 'Nitrogen: Medium, Phosphorus: High, Potash: Adequate, Organic Carbon: 0.52%',
  waterSources: ['tubewell', 'canal'],
  budget: 95000,
  equipment: ['Tractor (50 HP)', 'Rotavator', 'Seed Drill', 'Laser Leveler available on rent'],
  labor: 'laborModerate',
  previousCrops: 'Paddy (PR 126) followed by Wheat (PBW 826)',
  preferredCrops: 'Wheat, Mustard, Vegetables'
};

// Unit conversion helper
export const convertToStandardAcres = (value, unit) => {
  const num = parseFloat(value) || 0;
  switch (unit) {
    case 'hectare':
      return +(num * 2.47105).toFixed(2);
    case 'kanal':
      // 8 Kanals = 1 Acre in Punjab/Haryana/North India
      return +(num / 8.0).toFixed(2);
    case 'bigha':
      // Standard Pucca Bigha in North India is ~0.4 Acre (2.5 Bigha = 1 Acre)
      return +(num / 2.5).toFixed(2);
    case 'acre':
    default:
      return +num.toFixed(2);
  }
};

// Profile Operations
export const getFarmerProfile = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) return JSON.parse(raw);
    return DEFAULT_PROFILE;
  } catch (e) {
    console.error('Storage get error', e);
    return DEFAULT_PROFILE;
  }
};

export const saveFarmerProfile = (profileData) => {
  try {
    const acresStandard = convertToStandardAcres(profileData.landArea, profileData.landUnit);
    const updated = {
      ...profileData,
      acresStandard,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Storage save error', e);
    return profileData;
  }
};

// Crop Plan Operations
export const getSavedCropPlan = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CROP_PLAN);
    if (raw) return JSON.parse(raw);
    // Default 5-acre division
    return {
      totalAcres: 5.0,
      allocations: [
        { cropId: 'wheat', acres: 3.0 },
        { cropId: 'mustard', acres: 1.5 },
        { cropId: 'potato', acres: 0.5 }
      ],
      updatedAt: new Date().toISOString()
    };
  } catch (e) {
    return null;
  }
};

export const saveCropPlan = (plan) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CROP_PLAN, JSON.stringify(plan));
    return plan;
  } catch (e) {
    return null;
  }
};

// Expenses Operations
export const getExpenses = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    if (raw) return JSON.parse(raw);
    // Pre-populate with realistic recorded farm entries
    const initialExpenses = [
      { id: 'exp-1', date: '2026-11-02', category: 'catSeeds', amount: 5550, notes: '3 Bags PBW 826 Certified Wheat Seed from PUNSEED' },
      { id: 'exp-2', date: '2026-11-04', category: 'catFertilizer', amount: 4050, notes: '3 Bags DAP (IFFCO) for basal application' },
      { id: 'exp-3', date: '2026-11-05', category: 'catMachinery', amount: 3500, notes: 'Diesel for field rauni and rotavator harrowing' },
      { id: 'exp-4', date: '2026-11-08', category: 'catLabor', amount: 2400, notes: 'Sowing and field leveling labour wages' }
    ];
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(initialExpenses));
    return initialExpenses;
  } catch (e) {
    return [];
  }
};

export const addExpense = (expense) => {
  try {
    const current = getExpenses();
    const newEntry = {
      ...expense,
      id: 'exp-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    const updated = [newEntry, ...current];
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

// Activity Tracker
export const getActivities = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (raw) return JSON.parse(raw);
    const initial = [
      { id: 'act-1', date: '2026-11-06', type: 'Sowing Completed', notes: 'Sowed 3 acres wheat with PBW 826 and 1.5 acres Giriraj mustard under excellent soil moisture.', photoUrl: null },
      { id: 'act-2', date: '2026-11-14', type: 'Germination Inspection', notes: 'Healthy emergence observed across all rows. No bird damage.', photoUrl: null }
    ];
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(initial));
    return initial;
  } catch (e) {
    return [];
  }
};

export const addActivity = (activity) => {
  try {
    const current = getActivities();
    const entry = { ...activity, id: 'act-' + Date.now(), createdAt: new Date().toISOString() };
    const updated = [entry, ...current];
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

// Sowing and Irrigation Tracking
export const getSowingDetails = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SOWING_DETAILS);
    if (raw) return JSON.parse(raw);
    return {
      cropId: 'wheat',
      sowingDate: '2026-11-05',
      variety: 'PBW 826',
      irrigations: [
        { id: 'irr-1', date: '2026-11-01', type: 'Pre-sowing Rauni', source: 'Canal water' }
      ]
    };
  } catch (e) {
    return { cropId: 'wheat', sowingDate: '2026-11-05', irrigations: [] };
  }
};

export const saveSowingDetails = (details) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SOWING_DETAILS, JSON.stringify(details));
    return details;
  } catch (e) {
    return details;
  }
};

// Disease Scan History
export const getDiseaseHistory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DISEASE_HISTORY);
    if (raw) return JSON.parse(raw);
    return [];
  } catch (e) {
    return [];
  }
};

export const saveDiseaseDiagnosis = (scan) => {
  try {
    const current = getDiseaseHistory();
    const entry = { ...scan, id: 'scan-' + Date.now(), timestamp: new Date().toISOString() };
    const updated = [entry, ...current];
    localStorage.setItem(STORAGE_KEYS.DISEASE_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};
