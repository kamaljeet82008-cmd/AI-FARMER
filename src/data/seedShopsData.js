// Verified Agricultural Seed Shops & Authorized Online Vendors
// Only verified government depots, KVK counters, and authorized state seed corporations

export const NEARBY_SEED_SHOPS = [
  {
    id: 'shop-1',
    name: 'Punjab State Seeds Corporation (PUNSEED) Depot',
    cropSpecialty: ['Wheat', 'Paddy', 'Mustard', 'Moong'],
    district: 'Ludhiana',
    state: 'Punjab',
    address: 'Near Grain Market, GT Road, Khanna, District Ludhiana, Punjab 141401',
    distanceKm: 8.5,
    phone: '+91-1628-226014',
    timings: '09:00 AM - 05:00 PM (Mon-Sat)',
    verified: true,
    type: 'Government Seed Corporation',
    directionsUrl: 'https://maps.google.com/?q=PUNSEED+Khanna+Punjab',
    availableSeeds: ['PBW 826 Wheat', 'PR 126 Paddy', 'Pusa Basmati 1121', 'Giriraj Mustard']
  },
  {
    id: 'shop-2',
    name: 'KVK Farm Store & Seed Counter (PAU)',
    cropSpecialty: ['Wheat', 'Mustard', 'Vegetables', 'Moong'],
    district: 'Ludhiana',
    state: 'Punjab',
    address: 'PAU Campus, Ferozepur Road, Ludhiana, Punjab 141004',
    distanceKm: 14.2,
    phone: '+91-161-2401960',
    timings: '09:30 AM - 04:30 PM (Mon-Fri)',
    verified: true,
    type: 'State Agricultural University / ICAR KVK',
    directionsUrl: 'https://maps.google.com/?q=PAU+Ludhiana+Seed+Shop',
    availableSeeds: ['PBW 826 Certified', 'RLC 3 Gobhi Sarson', 'PMH 1 Maize', 'Punjab Ratta Tomato']
  },
  {
    id: 'shop-3',
    name: 'IFFCO Kisan Seva Kendra & Seed Hub',
    cropSpecialty: ['Wheat', 'Mustard', 'Paddy', 'Pulses'],
    district: 'Karnal',
    state: 'Haryana',
    address: 'Kunjpura Road, Near APMC Anaj Mandi, Karnal, Haryana 132001',
    distanceKm: 19.8,
    phone: '+91-184-2254390',
    timings: '08:30 AM - 06:00 PM (Daily)',
    verified: true,
    type: 'Cooperative Farmers Outlet',
    directionsUrl: 'https://maps.google.com/?q=IFFCO+Kisan+Seva+Kendra+Karnal',
    availableSeeds: ['DBW 187 Wheat', 'HD 3086 Wheat', 'Giriraj Mustard', 'Certified Urea/DAP']
  },
  {
    id: 'shop-4',
    name: 'National Seeds Corporation (NSC) Regional Store',
    cropSpecialty: ['Wheat', 'Paddy', 'Cotton', 'Maize'],
    district: 'Bathinda',
    state: 'Punjab',
    address: 'Grain Market Yard, Mansa Road, Bathinda, Punjab 151001',
    distanceKm: 26.5,
    phone: '+91-164-2240182',
    timings: '09:00 AM - 05:00 PM (Mon-Sat)',
    verified: true,
    type: 'National Seeds Corporation (Govt of India)',
    directionsUrl: 'https://maps.google.com/?q=National+Seeds+Corporation+Bathinda',
    availableSeeds: ['Certified HD 3086', 'RCH 659 Bt Cotton', 'PR 126 Paddy', 'Certified Moong']
  },
  {
    id: 'shop-5',
    name: 'Central Potato Research Station (CPRI) Seed Depot',
    cropSpecialty: ['Potato'],
    district: 'Jalandhar',
    state: 'Punjab',
    address: 'Post Bag No 1, Model Town, Jalandhar, Punjab 144003',
    distanceKm: 38.0,
    phone: '+91-181-2791474',
    timings: '09:30 AM - 05:00 PM',
    verified: true,
    type: 'ICAR Central Potato Research Institute',
    directionsUrl: 'https://maps.google.com/?q=CPRI+Jalandhar+Seed',
    availableSeeds: ['Kufri Pukhraj (Virus Free Seed)', 'Kufri Jyoti (Breeder Seed)', 'Kufri Chipsona']
  }
];

export const ONLINE_SEED_PRODUCTS = [
  {
    id: 'online-1',
    productName: 'Certified PBW 826 High Yield Wheat Seed',
    brand: 'PUNSEED / NSC Official',
    crop: 'Wheat',
    variety: 'PBW 826',
    packSize: '40 kg Sealed Bag',
    price: 1850,
    seller: 'National Seeds Corporation Portal (Govt of India)',
    deliveryDays: '3 - 5 business days',
    verifiedSeller: true,
    productUrl: 'https://www.indiaseeds.com',
    details: 'Certified foundation seed with 98% germination guarantee, treated with Vitavax fungicide.'
  },
  {
    id: 'online-2',
    productName: 'Giriraj Mustard Seed (DRMRIJ-31)',
    brand: 'DRMR Certified / IFFCO',
    crop: 'Mustard',
    variety: 'Giriraj',
    packSize: '1.5 kg Moisture-Proof Pouch',
    price: 520,
    seller: 'IFFCO Bazar Official Portal',
    deliveryDays: '2 - 4 business days (Free Delivery to Village)',
    verifiedSeller: true,
    productUrl: 'https://www.iffcobazar.in',
    details: 'High oil percentage (41.5%), bold seeds, packaged under strict quarantine standards.'
  },
  {
    id: 'online-3',
    productName: 'Pusa Basmati 1121 Breeder/Certified Seed',
    brand: 'IARI / AgroStar Partner',
    crop: 'Paddy',
    variety: 'Pusa Basmati 1121',
    packSize: '10 kg Bag',
    price: 1150,
    seller: 'AgroStar Agri-Commerce Verified',
    deliveryDays: '3 - 4 business days',
    verifiedSeller: true,
    productUrl: 'https://www.agrostar.in',
    details: 'Pure traditional aroma, guaranteed 100% varietal purity, tested for bacterial leaf blight tolerance.'
  },
  {
    id: 'online-4',
    productName: 'PMH 1 Hybrid Maize Seed',
    brand: 'PAU Certified / BigHaat',
    crop: 'Maize',
    variety: 'PMH 1',
    packSize: '4 kg Pack (Sows 0.5 Acre)',
    price: 920,
    seller: 'BigHaat India Agriculture Store',
    deliveryDays: '3 - 5 business days',
    verifiedSeller: true,
    productUrl: 'https://www.bighaat.com',
    details: 'Vigorous hybrid with sturdy stalk, high cob shelling percentage, treated with Cruiser for shoot fly protection.'
  }
];
