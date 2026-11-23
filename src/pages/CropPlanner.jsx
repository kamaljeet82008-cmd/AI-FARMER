import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  Coins, 
  Sprout, 
  ArrowRight, 
  RefreshCw,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import { CROPS_DATA } from '../data/cropsData';
import { 
  getFarmerProfile, 
  getSavedCropPlan, 
  saveCropPlan 
} from '../firebase/offlineStorage';

export const CropPlanner = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const profile = getFarmerProfile();
  const totalLandAcres = profile.acresStandard || 5.0;

  // Selected agricultural season (defaults to Rabi for winter or user choice)
  const [selectedSeason, setSelectedSeason] = useState('rabi');

  // Multi-crop allocations state: map of cropId -> acres
  const [allocations, setAllocations] = useState(() => {
    const saved = getSavedCropPlan();
    if (saved && saved.allocations && saved.allocations.length > 0) {
      const map = {};
      saved.allocations.forEach(a => { map[a.cropId] = a.acres; });
      return map;
    }
    // Default smart AI allocation for 5 acres:
    return {
      wheat: Math.round(totalLandAcres * 0.6 * 10) / 10,
      mustard: Math.round(totalLandAcres * 0.3 * 10) / 10,
      potato: Math.round(totalLandAcres * 0.1 * 10) / 10
    };
  });

  const [savedNotification, setSavedNotification] = useState(false);

  // Filter crops suitable for selected season
  const seasonalCrops = CROPS_DATA.filter(c => c.season === selectedSeason);

  // Total allocated acres
  const totalAllocated = Object.entries(allocations).reduce((sum, [cropId, acres]) => {
    // Only count if this crop belongs to current season or has positive acres
    return sum + (parseFloat(acres) || 0);
  }, 0);

  const unallocatedAcres = +(totalLandAcres - totalAllocated).toFixed(2);

  const handleAllocationChange = (cropId, value) => {
    const num = Math.max(0, parseFloat(value) || 0);
    setAllocations(prev => ({
      ...prev,
      [cropId]: num
    }));
  };

  const handleResetAIRecommended = () => {
    if (selectedSeason === 'rabi') {
      setAllocations({
        wheat: +(totalLandAcres * 0.6).toFixed(1),
        mustard: +(totalLandAcres * 0.3).toFixed(1),
        potato: +(totalLandAcres * 0.1).toFixed(1)
      });
    } else if (selectedSeason === 'kharif') {
      setAllocations({
        paddy: +(totalLandAcres * 0.6).toFixed(1),
        maize: +(totalLandAcres * 0.4).toFixed(1)
      });
    } else {
      setAllocations({
        moong: +(totalLandAcres * 0.7).toFixed(1)
      });
    }
  };

  const handleSavePlan = () => {
    const planArray = Object.entries(allocations)
      .filter(([_, acres]) => acres > 0)
      .map(([cropId, acres]) => ({ cropId, acres }));

    saveCropPlan({
      totalAcres: totalLandAcres,
      season: selectedSeason,
      allocations: planArray
    });

    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  // Portfolio Totals calculation
  let portfolioTotalCost = 0;
  let portfolioMinRevenue = 0;
  let portfolioMaxRevenue = 0;

  Object.entries(allocations).forEach(([cropId, acres]) => {
    const crop = CROPS_DATA.find(c => c.id === cropId);
    if (crop && acres > 0) {
      portfolioTotalCost += crop.estCostPerAcre * acres;
      portfolioMinRevenue += (crop.yieldMinQtlPerAcre * acres) * crop.avgMandiPricePerQtl;
      portfolioMaxRevenue += (crop.yieldMaxQtlPerAcre * acres) * crop.avgMandiPricePerQtl;
    }
  });

  const portfolioMinProfit = Math.round(portfolioMinRevenue - portfolioTotalCost);
  const portfolioMaxProfit = Math.round(portfolioMaxRevenue - portfolioTotalCost);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 02 • Core Feature
            </span>
            <AudioSpeaker textToRead={`${t('planner.title')}. ${t('planner.subtitle')}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('planner.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('planner.subtitle')}
          </p>
        </div>

        {/* Farmer Land Context Badge */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-4 flex-shrink-0">
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase">
              Total Farm Land
            </div>
            <div className="text-2xl font-black text-emerald-950">
              {totalLandAcres} <span className="text-sm font-semibold">{t('common.acres')}</span>
            </div>
            <div className="text-[10px] text-slate-600">
              {profile.village}, {profile.district} • Soil: <span className="capitalize font-semibold">{profile.soilType}</span>
            </div>
          </div>
          <Link
            to="/land-assessment"
            className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline"
          >
            Edit
          </Link>
        </div>
      </div>

      {/* Season Selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          {t('planner.currentSeason')}:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'rabi', label: t('planner.rabi') },
            { id: 'kharif', label: t('planner.kharif') },
            { id: 'zaid', label: t('planner.zaid') },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedSeason(s.id);
                // Adjust default allocation for season
                if (s.id === 'rabi') {
                  setAllocations({ wheat: +(totalLandAcres * 0.6).toFixed(1), mustard: +(totalLandAcres * 0.3).toFixed(1), potato: +(totalLandAcres * 0.1).toFixed(1) });
                } else if (s.id === 'kharif') {
                  setAllocations({ paddy: +(totalLandAcres * 0.6).toFixed(1), maize: +(totalLandAcres * 0.4).toFixed(1) });
                } else {
                  setAllocations({ moong: +(totalLandAcres * 0.8).toFixed(1) });
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSeason === s.id
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Land Allocation Status Strip */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors ${
        unallocatedAcres === 0
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
          : unallocatedAcres < 0
          ? 'bg-red-50 border-red-300 text-red-900'
          : 'bg-amber-50 border-amber-200 text-amber-900'
      }`}>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
          {unallocatedAcres === 0 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          )}
          <span>
            {unallocatedAcres === 0
              ? `All ${totalLandAcres} acres successfully allocated across crop portfolio.`
              : unallocatedAcres < 0
              ? `Warning: Over-allocated by ${Math.abs(unallocatedAcres)} acres (Total: ${totalAllocated} / ${totalLandAcres} Acres)!`
              : `${unallocatedAcres} acres remain unallocated out of ${totalLandAcres} total acres.`}
          </span>
        </div>

        <button
          onClick={handleResetAIRecommended}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t('planner.resetDefault')}</span>
        </button>
      </div>

      {/* Interactive Land Division Table & Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">
            {t('planner.landDivisionTitle')}
          </h2>
          <AudioSpeaker textToRead={`${t('planner.landDivisionTitle')}. Adjust acres for each crop below to see seed, cost, and profit projections.`} />
        </div>

        <div className="grid grid-cols-1 gap-5">
          {seasonalCrops.map(crop => {
            const cropName = language === 'pa' ? crop.namePa : language === 'hi' ? crop.nameHi : crop.nameEn;
            const allocatedAcres = allocations[crop.id] || 0;
            const estSeedReq = Math.round(crop.seedRateKgPerAcre * allocatedAcres);
            const estCost = Math.round(crop.estCostPerAcre * allocatedAcres);
            const yieldMin = Math.round(crop.yieldMinQtlPerAcre * allocatedAcres);
            const yieldMax = Math.round(crop.yieldMaxQtlPerAcre * allocatedAcres);
            const revMin = Math.round(yieldMin * crop.avgMandiPricePerQtl);
            const revMax = Math.round(yieldMax * crop.avgMandiPricePerQtl);
            const profitMin = revMin - estCost;
            const profitMax = revMax - estCost;

            return (
              <div 
                key={crop.id}
                className={`bg-white rounded-3xl p-6 border transition-all ${
                  allocatedAcres > 0
                    ? 'border-emerald-300 shadow-md ring-1 ring-emerald-200'
                    : 'border-slate-200/80 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Crop Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-slate-50 rounded-2xl border border-slate-100">
                      {crop.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-lg text-slate-900">{cropName}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          crop.risk === 'low' ? 'bg-emerald-100 text-emerald-800' : crop.risk === 'moderate' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {crop.risk === 'low' ? t('planner.riskLow') : crop.risk === 'moderate' ? t('planner.riskMed') : t('planner.riskHigh')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Duration: {crop.durationDays} • Water Need: <span className="capitalize font-semibold">{crop.waterRequirement}</span>
                      </div>
                    </div>
                  </div>

                  {/* Allocation Acre Input / Slider */}
                  <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 whitespace-nowrap pl-1">
                      {t('planner.allocatedLand')}:
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max={totalLandAcres}
                      value={allocatedAcres}
                      onChange={(e) => handleAllocationChange(crop.id, e.target.value)}
                      className="w-20 text-center font-black text-sm bg-white border border-slate-300 rounded-xl py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-bold text-slate-500 pr-1">{t('common.acres')}</span>
                  </div>
                </div>

                {/* Economic Breakdown Metrics */}
                {allocatedAcres > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 text-center">
                    {/* Seed Requirement */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">{t('planner.seedRequirement')}</div>
                      <div className="text-sm font-black text-slate-900 mt-1">
                        {estSeedReq} kg
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        ({crop.seedRateKgPerAcre} kg/acre)
                      </div>
                    </div>

                    {/* Cultivation Cost */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">{t('planner.estCost')}</div>
                      <div className="text-sm font-black text-rose-700 mt-1">
                        ₹{estCost.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        (₹{crop.estCostPerAcre.toLocaleString('en-IN')}/acre)
                      </div>
                    </div>

                    {/* Estimated Yield */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">{t('planner.estYield')}</div>
                      <div className="text-sm font-black text-emerald-800 mt-1">
                        {yieldMin} - {yieldMax} Qtl
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        ({crop.yieldMinQtlPerAcre}-{crop.yieldMaxQtlPerAcre} Qtl/acre)
                      </div>
                    </div>

                    {/* Gross Revenue */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">{t('planner.estRevenue')}</div>
                      <div className="text-sm font-black text-slate-800 mt-1">
                        ₹{revMin.toLocaleString('en-IN')} - ₹{revMax.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        (@ ₹{crop.avgMandiPricePerQtl}/Qtl)
                      </div>
                    </div>

                    {/* Net Profit Range */}
                    <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 col-span-2 sm:col-span-1">
                      <div className="text-[10px] font-bold text-emerald-800 uppercase">{t('planner.estProfit')}</div>
                      <div className="text-sm font-black text-emerald-950 mt-1">
                        ₹{profitMin.toLocaleString('en-IN')} - ₹{profitMax.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                        Net Estimated Return
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-3 text-center text-xs text-slate-400 italic">
                    Set acres above to include {cropName} in your land division plan.
                  </div>
                )}

                {/* Risk and Suitability Note */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
                  <div className="flex items-start gap-1.5">
                    <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-700">Suitability & Risks:</strong> {crop.riskFactors[language] || crop.riskFactors.en}
                    </span>
                  </div>
                  <Link
                    to={`/seed-finder?crop=${crop.id}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 whitespace-nowrap"
                  >
                    View Certified Seeds →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Portfolio Financial Overview Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Complete Farm Portfolio Summary
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Total Expected Season Returns ({totalAllocated} Acres)
            </h3>
          </div>
          <button
            onClick={handleSavePlan}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors shadow-md active:scale-95"
          >
            {savedNotification ? '✓ Plan Saved!' : 'Save This Crop Plan'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 font-bold uppercase">Total Cultivation Cost</div>
            <div className="text-2xl font-black text-rose-400 mt-1">
              ₹{portfolioTotalCost.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Seeds, fertilizer, machinery, labor</div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 font-bold uppercase">Estimated Gross Revenue</div>
            <div className="text-2xl font-black text-amber-300 mt-1">
              ₹{portfolioMinRevenue.toLocaleString('en-IN')} - ₹{portfolioMaxRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Based on prevailing mandi benchmark</div>
          </div>

          <div className="bg-emerald-500/20 p-4 rounded-2xl border border-emerald-400/30">
            <div className="text-xs text-emerald-300 font-bold uppercase">Estimated Net Realization</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              ₹{portfolioMinProfit.toLocaleString('en-IN')} - ₹{portfolioMaxProfit.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-200 mt-0.5">Projected Net Farm Income</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            * Estimates are calculated using regional ICAR/PAU cultivation cost norms and current APMC modal prices. Actual profits depend on seasonal rains, pest attacks, and daily market arrivals.
          </p>

          <button
            onClick={() => {
              handleSavePlan();
              navigate('/seed-finder');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors shadow-lg shadow-amber-400/20 whitespace-nowrap active:scale-95"
          >
            <span>Proceed to Step 3: Find Seeds & Shops</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <DisclaimerBadge />
    </div>
  );
};
