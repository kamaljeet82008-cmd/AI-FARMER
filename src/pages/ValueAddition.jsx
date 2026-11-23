import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  ArrowRight, 
  TrendingUp, 
  Settings, 
  Package, 
  Store, 
  Coins, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import { VALUE_ADDITION_DATA } from '../data/valueAdditionData';

export const ValueAddition = () => {
  const { t, language } = useLanguage();
  const [selectedId, setSelectedId] = useState('va-wheat-atta');

  const selectedItem = VALUE_ADDITION_DATA.find(v => v.id === selectedId) || VALUE_ADDITION_DATA[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 08 • Agro-Processing
            </span>
            <AudioSpeaker textToRead={`${t('valueAddition.title')}. ${t('valueAddition.subtitle')}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('valueAddition.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('valueAddition.subtitle')}
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-center sm:text-right flex-shrink-0">
          <div className="text-[11px] font-bold text-amber-800 uppercase">
            Potential Margin Uplift
          </div>
          <div className="text-2xl font-black text-amber-950">
            +35% to +100%
          </div>
          <div className="text-[10px] text-slate-500">
            Over raw distress mandi selling
          </div>
        </div>
      </div>

      {/* Pathways Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {VALUE_ADDITION_DATA.map(item => {
          const isSelected = selectedId === item.id;
          const title = language === 'pa' ? item.titlePa : language === 'hi' ? item.titleHi : item.titleEn;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-300'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2">
                {title}
              </div>
              <div className="text-[10px] text-emerald-700 font-extrabold mt-2">
                {item.netAdditionalMargin ? `+₹${item.netAdditionalMargin.toLocaleString('en-IN')} Margin` : ''}
              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE PROCESSING BUSINESS MODEL CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        {/* Model Title & Overview */}
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{selectedItem.icon}</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {language === 'pa' ? selectedItem.titlePa : language === 'hi' ? selectedItem.titleHi : selectedItem.titleEn}
                </h2>
                <div className="text-xs text-slate-500 mt-0.5">
                  Benchmark Batch: <strong className="text-slate-800">{selectedItem.rawQuantityBenchmark}</strong> ({selectedItem.rawCropName})
                </div>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {selectedItem.percentageMarginGain}
          </span>
        </div>

        {/* COMPARISON METRICS: RAW MANDI vs VALUE ADDED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Selling Raw Crop */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('valueAddition.rawSellingRevenue')}
            </div>
            <div className="text-2xl font-black text-slate-800">
              ₹{selectedItem.rawMandiRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standard wholesale realization selling unprocessed produce at local APMC grain market.
            </p>
          </div>

          {/* Value-Added Packaged Product */}
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-2">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              {t('valueAddition.processedRevenue')}
            </div>
            <div className="text-2xl font-black text-amber-950">
              ₹{selectedItem.processedGrossRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yields: {selectedItem.processedYield}. Packaged and branded for retail/local consumer markets.
            </p>
          </div>

          {/* Net Extra Margin */}
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-300 space-y-2">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              {t('valueAddition.netAdditionalMargin')}
            </div>
            <div className="text-2xl font-black text-emerald-700">
              +₹{selectedItem.netAdditionalMargin.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-emerald-900 font-medium leading-relaxed">
              Calculated after subtracting processing electricity, labor, packaging pouches, and depreciation.
            </p>
          </div>
        </div>

        {/* Equipment & Operational Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Machinery & Setup */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-700" />
              <span>{t('valueAddition.equipmentRequired')}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedItem.equipmentNeeded}
            </p>
            <div className="pt-2 border-t border-slate-200 text-xs">
              <span className="text-slate-500">{t('valueAddition.estEquipmentCost')}: </span>
              <strong className="text-slate-900">{selectedItem.estEquipmentCost}</strong>
            </div>
          </div>

          {/* Packaging, Compliance & FSSAI */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-700" />
              <span>{t('valueAddition.packagingStorage')}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedItem.packagingAndCompliance}
            </p>
            <div className="pt-2 border-t border-slate-200 text-xs">
              <span className="text-slate-500">Processing Cost: </span>
              <strong className="text-rose-700">₹{selectedItem.processingCost.toLocaleString('en-IN')}</strong> per batch
            </div>
          </div>
        </div>

        {/* Sales Channels */}
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-950 flex items-start gap-3">
          <Store className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-extrabold text-sm mb-1">{t('valueAddition.salesChannels')}</div>
            <p className="leading-relaxed text-teal-900">
              {selectedItem.salesChannels}
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBadge customMessage="Notice: Agro-processing requires upfront machinery investment, food safety registration (FSSAI), steady hygienic electricity, quality storage packaging, and active marketing. Calculations are indicative business models based on Ministry of Food Processing Industries (MoFPI) norms." />

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-between items-center">
        <Link
          to="/crop-alerts"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors shadow-lg shadow-emerald-600/20 active:scale-95 ml-auto"
        >
          <span>Proceed to Step 9: Live Crop & Weather Alerts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
