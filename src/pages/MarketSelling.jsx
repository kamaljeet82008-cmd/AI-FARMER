import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Truck, 
  MapPin, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  Phone,
  Info,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import { CROPS_DATA } from '../data/cropsData';
import { 
  MANDIS_DATA, 
  TRANSPORT_VEHICLES, 
  calculateNetReturn 
} from '../data/mandisData';
import { getFarmerProfile } from '../firebase/offlineStorage';

export const MarketSelling = () => {
  const { t, language } = useLanguage();
  const profile = getFarmerProfile();

  // Step 1: Harvest Inputs
  const [selectedCropId, setSelectedCropId] = useState('wheat');
  const [harvestQuantity, setHarvestQuantity] = useState(75); // e.g. 75 Quintals (from ~3 acres of wheat)
  const [qualityGrade, setQualityGrade] = useState('gradeFAQ');
  const [selectedVehicleId, setSelectedVehicleId] = useState('tractor-trolley');

  const selectedCrop = CROPS_DATA.find(c => c.id === selectedCropId) || CROPS_DATA[0];
  const cropName = language === 'pa' ? selectedCrop.namePa : language === 'hi' ? selectedCrop.nameHi : selectedCrop.nameEn;

  // Grade multiplier / adjustment factor
  const getGradeAdjustment = (grade) => {
    switch (grade) {
      case 'gradeA': return 1.02; // +2% premium for high quality/low moisture
      case 'gradeB': return 0.96; // -4% deduction for slight moisture/discoloration
      case 'gradeFAQ':
      default:
        return 1.0;
    }
  };

  const gradeMultiplier = getGradeAdjustment(qualityGrade);

  // Calculate Net Returns for each Mandi / Buyer
  const comparisonResults = MANDIS_DATA.map(mandi => {
    const rawPriceObj = mandi.cropPrices[selectedCropId] || { min: 2350, max: 2450, modal: 2400 };
    const adjustedModalPrice = Math.round(rawPriceObj.modal * gradeMultiplier);

    const calc = calculateNetReturn({
      harvestQuantityQtl: parseFloat(harvestQuantity) || 1,
      modalPricePerQtl: adjustedModalPrice,
      distanceKm: mandi.distanceKm,
      vehicleId: selectedVehicleId
    });

    return {
      mandi,
      adjustedModalPrice,
      rawPriceObj,
      ...calc
    };
  });

  // Rank by Net Return
  const sortedResults = [...comparisonResults].sort((a, b) => b.netReturn - a.netReturn);
  const bestOption = sortedResults[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 07 • Core Major Feature
            </span>
            <AudioSpeaker textToRead={`${t('mandi.title')}. ${t('mandi.subtitle')}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('mandi.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('mandi.subtitle')}
          </p>
        </div>

        {/* Location Badge */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-center sm:text-right flex-shrink-0">
          <div className="text-[11px] font-bold text-emerald-800 uppercase">
            Origin Farm
          </div>
          <div className="text-base font-black text-emerald-950">
            {profile.village}, {profile.district}
          </div>
          <div className="text-[10px] text-slate-500">
            Road distance calculated from farm gate
          </div>
        </div>
      </div>

      {/* STEP 1: HARVEST PARAMETERS & VEHICLE SELECTOR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span>🌾</span>
            <span>{t('mandi.step1Title')} & {t('mandi.step3Title')}</span>
          </h2>
          <AudioSpeaker textToRead="Select your harvested crop, quantity in quintals, produce quality grade, and your transport vehicle." />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              {t('mandi.cropSelect')}
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {CROPS_DATA.map(c => (
                <option key={c.id} value={c.id}>
                  {language === 'pa' ? c.namePa : language === 'hi' ? c.nameHi : c.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Harvest Quantity */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              {t('mandi.quantity')} *
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                step="5"
                value={harvestQuantity}
                onChange={(e) => setHarvestQuantity(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full text-base font-black px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-3.5 top-3 text-xs font-bold text-slate-500">
                {t('common.quintal')}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">1 Quintal = 100 kg</p>
          </div>

          {/* Quality Grade */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              {t('mandi.qualityGrade')}
            </label>
            <select
              value={qualityGrade}
              onChange={(e) => setQualityGrade(e.target.value)}
              className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="gradeFAQ">{t('mandi.gradeFAQ')}</option>
              <option value="gradeA">{t('mandi.gradeA')}</option>
              <option value="gradeB">{t('mandi.gradeB')}</option>
            </select>
          </div>
        </div>

        {/* Transport Vehicle Selection Cards */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase mb-3">
            {t('mandi.vehicleType')}:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {TRANSPORT_VEHICLES.map(v => {
              const isSelected = selectedVehicleId === v.id;
              const trips = Math.ceil((parseFloat(harvestQuantity) || 1) / v.capacityQuintals);
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicleId(v.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-400 shadow-sm'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">
                      {language === 'pa' ? v.namePa : language === 'hi' ? v.nameHi : v.name}
                    </span>
                    <Truck className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Capacity: <strong className="text-slate-700">{v.capacityQuintals} Qtl</strong> • Rate: ₹{v.ratePerKm}/km
                  </div>
                  <div className="text-[10px] text-emerald-800 font-bold mt-2">
                    {trips} {trips === 1 ? 'Trip Required' : 'Trips Required'} for {harvestQuantity} Qtl
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* INTELLIGENT SELLING RECOMMENDATION BANNER */}
      {bestOption && (
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-700/50">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              ⭐ {t('mandi.bestReturnBadge')}
            </div>

            <h3 className="text-xl sm:text-2xl font-black">
              {bestOption.mandi.name}
            </h3>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Based on live market prices and your estimated vehicle transport cost (₹{bestOption.transportCost.toLocaleString('en-IN')}), selling at <strong>{bestOption.mandi.name}</strong> yields the highest net in-hand return.
            </p>

            <div className="flex flex-wrap gap-4 text-xs pt-1">
              <div>
                Distance: <strong className="text-white">{bestOption.mandi.distanceKm} km</strong>
              </div>
              <div>
                Modal Price: <strong className="text-amber-300">₹{bestOption.adjustedModalPrice}/Qtl</strong>
              </div>
              <div>
                Transport Deducted: <strong className="text-rose-300">₹{bestOption.transportCostPerQtl}/Qtl</strong>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-5 rounded-2xl border border-white/20 text-center md:text-right flex-shrink-0">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              {t('mandi.tableNetReturn')}
            </div>
            <div className="text-3xl font-black text-amber-300 mt-1">
              ₹{bestOption.netReturn.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-emerald-200 mt-0.5">
              Net In-Hand Realization (₹{bestOption.netPerQtl}/Qtl)
            </div>
          </div>
        </div>
      )}

      {/* DETAILED COMPARISON TABLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {t('mandi.step4Title')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('mandi.formulaNote')}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                <th className="py-3 px-3">{t('mandi.tableMandi')}</th>
                <th className="py-3 px-3">Distance</th>
                <th className="py-3 px-3">Modal Price</th>
                <th className="py-3 px-3">{t('mandi.tableRevenue')}</th>
                <th className="py-3 px-3">{t('mandi.tableTransport')}</th>
                <th className="py-3 px-3 text-right">{t('mandi.tableNetReturn')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedResults.map((item, idx) => {
                const isBest = idx === 0;
                return (
                  <tr 
                    key={item.mandi.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isBest ? 'bg-emerald-50/60 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-3">
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        {item.mandi.name}
                        {isBest && (
                          <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                            Best
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.mandi.lastUpdated} • {item.mandi.source}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      {item.mandi.distanceKm} km
                    </td>

                    <td className="py-3.5 px-3 text-slate-800 whitespace-nowrap">
                      <div className="font-extrabold">₹{item.adjustedModalPrice}/Qtl</div>
                      <div className="text-[10px] text-slate-400">
                        Range: ₹{item.rawPriceObj.min} - ₹{item.rawPriceObj.max}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-slate-800 font-bold whitespace-nowrap">
                      ₹{item.grossRevenue.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3.5 px-3 text-rose-700 font-bold whitespace-nowrap">
                      -₹{item.transportCost.toLocaleString('en-IN')}
                      <div className="text-[10px] text-slate-400 font-normal">
                        ({item.tripsNeeded} trip • ₹{item.transportCostPerQtl}/qtl)
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <div className={`font-black text-base ${isBest ? 'text-emerald-700' : 'text-slate-900'}`}>
                        ₹{item.netReturn.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        (₹{item.netPerQtl}/Qtl in hand)
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Critical Insight Note */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Important Distance Insight:</strong> Mandis situated further away (like Karnal at 95km) may quote a slightly higher gross price (+₹30/qtl), but after accounting for truck round-trip diesel and driver wages, your net in-hand earnings may be lower than a closer mandi (like Khanna at 12km). KrishiMitra calculates true net return to ensure you don't lose money on transportation!
          </p>
        </div>
      </div>

      <DisclaimerBadge />

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-between items-center">
        <Link
          to="/value-addition"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors shadow-lg shadow-amber-500/20 active:scale-95 ml-auto"
        >
          <span>Explore Step 8: Value Addition & Processing Opportunities</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
