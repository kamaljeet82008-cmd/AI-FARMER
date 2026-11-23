import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Navigation, 
  Check, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { CROPS_DATA } from '../data/cropsData';
import { NEARBY_SEED_SHOPS, ONLINE_SEED_PRODUCTS } from '../data/seedShopsData';
import { getFarmerProfile, getSavedCropPlan } from '../firebase/offlineStorage';

export const SeedFinder = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const queryCrop = searchParams.get('crop');

  const profile = getFarmerProfile();
  const cropPlan = getSavedCropPlan();

  // Find default crop from plan or query or fallback to wheat
  const defaultCropId = queryCrop || (cropPlan?.allocations?.[0]?.cropId) || 'wheat';
  const [selectedCropId, setSelectedCropId] = useState(defaultCropId);

  const selectedCrop = CROPS_DATA.find(c => c.id === selectedCropId) || CROPS_DATA[0];

  // Calculate allocated acres for this crop
  const allocatedAcres = cropPlan?.allocations?.find(a => a.cropId === selectedCropId)?.acres || profile.acresStandard || 3.0;

  // Filter nearby shops that carry this crop's seeds
  const matchingShops = NEARBY_SEED_SHOPS.filter(shop => 
    shop.cropSpecialty.some(s => s.toLowerCase() === selectedCrop.nameEn.toLowerCase() || s.toLowerCase().includes(selectedCrop.nameEn.toLowerCase()))
  );

  // Filter online products for this crop
  const matchingOnline = ONLINE_SEED_PRODUCTS.filter(prod =>
    prod.crop.toLowerCase() === selectedCrop.nameEn.toLowerCase()
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 03
            </span>
            <AudioSpeaker textToRead={`${t('seeds.title')}. ${t('seeds.subtitle')}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('seeds.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('seeds.subtitle')}
          </p>
        </div>

        {/* Land Context Badge */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-center sm:text-right flex-shrink-0">
          <div className="text-[11px] font-bold text-emerald-800 uppercase">
            Allocated Land
          </div>
          <div className="text-2xl font-black text-emerald-950">
            {allocatedAcres} <span className="text-sm font-semibold">{t('common.acres')}</span>
          </div>
          <div className="text-[10px] text-slate-500">
            Seed calculations tailored to your farm
          </div>
        </div>
      </div>

      {/* Crop Selector Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>{t('seeds.filterCrop')}:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {CROPS_DATA.map(crop => {
            const cropName = language === 'pa' ? crop.namePa : language === 'hi' ? crop.nameHi : crop.nameEn;
            const isSelected = selectedCropId === crop.id;
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCropId(crop.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{crop.icon}</span>
                <span>{cropName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: RECOMMENDED CERTIFIED SEED VARIETIES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              {t('seeds.varietiesTitle')} ({language === 'pa' ? selectedCrop.namePa : language === 'hi' ? selectedCrop.nameHi : selectedCrop.nameEn})
            </h2>
            <p className="text-xs text-slate-500">
              Officially recognized and certified high-yielding varieties tested by ICAR and State Agricultural Universities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {selectedCrop.varieties?.map(v => {
            const requiredSeed = Math.round(selectedCrop.seedRateKgPerAcre * allocatedAcres);
            const estSeedCost = Math.round(requiredSeed * selectedCrop.seedCostPerKg);

            return (
              <div 
                key={v.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {v.crop}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {v.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-1">
                    {v.name}
                  </h3>
                  <div className="text-xs font-semibold text-amber-700 mb-3">
                    {v.source}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {v.characteristics}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-700 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t('seeds.seedRate')}:</span>
                      <span className="font-bold">{v.seedRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Yield Potential:</span>
                      <span className="font-bold text-emerald-700">{v.yieldPotential}</span>
                    </div>
                  </div>
                </div>

                {/* Farmer-Specific Seed Calculation */}
                <div className="pt-3 border-t border-slate-100 bg-emerald-50/50 -mx-6 -mb-6 p-4 rounded-b-3xl space-y-1">
                  <div className="flex justify-between text-xs font-bold text-emerald-950">
                    <span>Required for your {allocatedAcres} Acres:</span>
                    <span className="text-emerald-700 font-black">{requiredSeed} kg</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Approximate Seed Cost:</span>
                    <span className="font-extrabold text-slate-900">₹{estSeedCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: NEARBY VERIFIED SEED SHOPS */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>{t('seeds.nearbyShopsTitle')}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {t('seeds.nearbyShopsDesc')}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Sorted by distance from {profile.district || 'Punjab'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(matchingShops.length > 0 ? matchingShops : NEARBY_SEED_SHOPS).map(shop => (
            <div
              key={shop.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      {shop.type}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      • {shop.distanceKm} km away
                    </span>
                  </div>
                  <h3 className="font-black text-base text-slate-900">
                    {shop.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {shop.address}
                  </p>
                </div>
              </div>

              {/* Verified Seeds in Stock */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase">
                  Available Verified Stocks:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {shop.availableSeeds.map((s, idx) => (
                    <span key={idx} className="text-[11px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-800">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timings and Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                <div className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{shop.timings}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${shop.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{shop.phone}</span>
                  </a>

                  <a
                    href={shop.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t('common.getDirections')}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: AUTHORIZED ONLINE SEED PURCHASING */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-600" />
              <span>{t('seeds.onlineShoppingTitle')}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {t('seeds.onlineDesc')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(matchingOnline.length > 0 ? matchingOnline : ONLINE_SEED_PRODUCTS).map(prod => (
            <div 
              key={prod.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {prod.brand}
                  </span>
                  <span>{prod.deliveryDays}</span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 mb-1">
                  {prod.productName}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  {prod.details}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs mb-4">
                  <span className="text-slate-500">{t('seeds.packSize')}:</span>
                  <span className="font-bold text-slate-800">{prod.packSize}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{t('seeds.price')}</div>
                  <div className="text-xl font-black text-slate-900">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <a
                  href={prod.productUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <span>{t('seeds.buyNow')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-end">
        <Link
          to={`/crop-guide?crop=${selectedCropId}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors shadow-lg shadow-emerald-600/20 active:scale-95"
        >
          <span>Proceed to Step 4: Complete Crop Growth Guide</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
