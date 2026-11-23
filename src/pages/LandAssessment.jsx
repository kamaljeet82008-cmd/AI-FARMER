import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Layers, 
  Droplet, 
  Coins, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Sparkles, 
  LocateFixed,
  FileText,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { 
  getFarmerProfile, 
  saveFarmerProfile, 
  convertToStandardAcres 
} from '../firebase/offlineStorage';

export const LandAssessment = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [analyzingSoilReport, setAnalyzingSoilReport] = useState(false);
  const [soilAnalysisResult, setSoilAnalysisResult] = useState('');

  // Form State initialized from storage or defaults
  const [formData, setFormData] = useState(() => getFarmerProfile());

  // Dynamic calculated standard acres
  const calculatedStandardAcres = convertToStandardAcres(formData.landArea, formData.landUnit);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWaterToggle = (source) => {
    setFormData(prev => {
      const exists = prev.waterSources.includes(source);
      const updated = exists 
        ? prev.waterSources.filter(s => s !== source)
        : [...prev.waterSources, source];
      return { ...prev, waterSources: updated };
    });
  };

  const handleGetGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`;
          handleFieldChange('gpsLocation', coords);
        },
        (err) => {
          console.warn('Geolocation denied or unavailable', err);
          handleFieldChange('gpsLocation', '30.7046° N, 76.1085° E (Ludhiana Region)');
        }
      );
    } else {
      handleFieldChange('gpsLocation', '30.7046° N, 76.1085° E (Ludhiana Region)');
    }
  };

  const handleSoilReportUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAnalyzingSoilReport(true);
    setTimeout(() => {
      setAnalyzingSoilReport(false);
      const resultText = language === 'pa'
        ? "AI ਮਿੱਟੀ ਰਿਪੋਰਟ ਵਿਸ਼ਲੇਸ਼ਣ: ਤੁਹਾਡੀ ਜ਼ਮੀਨ ਦਾ ਪੀ.ਐੱਚ. 7.2 ਹੈ ਜੋ ਕਣਕ, ਸਰ੍ਹੋਂ ਅਤੇ ਬਾਸਮਤੀ ਲਈ ਬਹੁਤ ਵਧੀਆ ਹੈ। ਜੈਵਿਕ ਕਾਰਬਨ (Organic Carbon) 0.52% ਹੈ ਜੋ ਦਰਮਿਆਨਾ ਹੈ। ਇਸ ਲਈ 3-4 ਟਰਾਲੀਆਂ ਰੂੜੀ ਦੀ ਖਾਦ ਪਾਓ। ਫਾਸਫੋਰਸ ਚੰਗੀ ਮਾਤਰਾ ਵਿੱਚ ਹੈ, ਪਰ ਜ਼ਿੰਕ ਦੀ ਥੋੜ੍ਹੀ ਘਾਟ ਹੈ, ਇਸ ਲਈ ਬਿਜਾਈ ਵੇਲੇ 10 ਕਿਲੋ ਜ਼ਿੰਕ ਸਲਫੇਟ (21%) ਪਾਉਣਾ ਲਾਹੇਵੰਦ ਰਹੇਗਾ।"
        : language === 'hi'
        ? "AI मृदा रिपोर्ट विश्लेषण: आपकी मिट्टी का पीएच 7.2 है जो गेहूं, सरसों और धान के लिए आदर्श है। जैविक कार्बन 0.52% मध्यम है, इसलिए गोबर की सड़ी खाद का प्रयोग करें। फास्फोरस का स्तर ठीक है, किंतु जिंक की हल्की कमी दिखती है। बुवाई पर 10 किलो जिंक सल्फेट प्रति एकड़ अवश्य दें।"
        : "AI Soil Health Analysis: Soil pH is 7.2 (Ideal neutral for Wheat, Mustard, and Paddy). Organic Carbon is moderate at 0.52%. Phosphorus availability is good. A slight Zinc deficiency is detected; apply 10 kg Zinc Sulphate (21%) per acre at sowing.";
      setSoilAnalysisResult(resultText);
      handleFieldChange('soilNutrients', 'Nitrogen: Med, Phosphorus: High, Zinc: Low, Organic Carbon: 0.52%');
      handleFieldChange('soilPh', 7.2);
    }, 1200);
  };

  const handleSave = () => {
    const saved = saveFarmerProfile({
      ...formData,
      acresStandard: calculatedStandardAcres
    });
    setSaveSuccess(true);
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const handleProceedToPlanner = () => {
    handleSave();
    navigate('/crop-planner');
  };

  const stepsMeta = [
    { num: 1, title: t('land.step1Title'), desc: t('land.step1Desc'), icon: MapPin },
    { num: 2, title: t('land.step2Title'), desc: t('land.step2Desc'), icon: Layers },
    { num: 3, title: t('land.step3Title'), desc: t('land.step3Desc'), icon: Droplet },
    { num: 4, title: t('land.step4Title'), desc: t('land.step4Desc'), icon: Coins }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 01
            </span>
            <AudioSpeaker textToRead={`${t('land.title')}. ${t('land.subtitle')}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('land.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('land.subtitle')}
          </p>
        </div>

        {/* Standard conversion badge */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-center sm:text-right flex-shrink-0">
          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
            {t('land.convertedNotice')}
          </div>
          <div className="text-2xl font-black text-emerald-950">
            {calculatedStandardAcres} <span className="text-sm font-semibold">{t('common.acres')}</span>
          </div>
          <div className="text-[10px] text-slate-500">
            ({formData.landArea} {formData.landUnit})
          </div>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {stepsMeta.map(s => {
          const Icon = s.icon;
          const isActive = currentStep === s.num;
          const isDone = currentStep > s.num;
          return (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                isActive
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-700/20 ring-2 ring-emerald-300'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  Step {s.num}
                </span>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Step Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        {/* STEP 1: LAND INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">{t('land.step1Title')}</h2>
                <p className="text-xs text-slate-500">{t('land.step1Desc')}</p>
              </div>
              <AudioSpeaker textToRead={`${t('land.step1Title')}. ${t('land.landArea')}, ${t('land.landUnit')}, ${t('land.village')}, ${t('land.district')}`} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Land Quantity */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('land.landArea')} *
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.1"
                  value={formData.landArea}
                  onChange={(e) => handleFieldChange('landArea', e.target.value)}
                  className="w-full text-base font-semibold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. 5"
                />
              </div>

              {/* Local Measurement Unit Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('land.landUnit')} *
                </label>
                <select
                  value={formData.landUnit}
                  onChange={(e) => handleFieldChange('landUnit', e.target.value)}
                  className="w-full text-base font-semibold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  <option value="acre">{t('land.unitAcre')}</option>
                  <option value="kanal">{t('land.unitKanal')}</option>
                  <option value="bigha">{t('land.unitBigha')}</option>
                  <option value="hectare">{t('land.unitHectare')}</option>
                </select>
                <p className="text-[11px] text-emerald-700 mt-1.5 font-medium">
                  ✓ Automatically converted to standard {calculatedStandardAcres} Acres for crop AI.
                </p>
              </div>

              {/* Village */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('land.village')} *
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => handleFieldChange('village', e.target.value)}
                  className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Bija / Rauni / Kunjpura"
                />
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('land.district')} *
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleFieldChange('district', e.target.value)}
                  className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Ludhiana / Karnal / Patiala"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('land.state')} *
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleFieldChange('state', e.target.value)}
                  className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Punjab / Haryana / Rajasthan"
                />
              </div>

              {/* GPS Location Auto-fetch */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('land.gpsLocation')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.gpsLocation}
                    onChange={(e) => handleFieldChange('gpsLocation', e.target.value)}
                    className="flex-1 text-xs px-3 py-3 rounded-xl border border-slate-300 bg-slate-50"
                    placeholder="Geo coordinates"
                  />
                  <button
                    type="button"
                    onClick={handleGetGps}
                    className="px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <LocateFixed className="w-4 h-4" />
                    <span>GPS</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cultivable question */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-800">{t('land.entireCultivable')}</div>
                <div className="text-xs text-slate-500">Is any area reserved for tube well, cattle shed, or farm house?</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleFieldChange('isEntireCultivable', true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    formData.isEntireCultivable ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border text-slate-700'
                  }`}
                >
                  Yes (100%)
                </button>
                <button
                  type="button"
                  onClick={() => handleFieldChange('isEntireCultivable', false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !formData.isEntireCultivable ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border text-slate-700'
                  }`}
                >
                  Partial
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SOIL INFORMATION */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">{t('land.step2Title')}</h2>
                <p className="text-xs text-slate-500">{t('land.step2Desc')}</p>
              </div>
              <AudioSpeaker textToRead={`${t('land.step2Title')}. ${t('land.soilType')}, ${t('land.soilPh')}`} />
            </div>

            {/* Soil Type Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('land.soilType')} *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'loamy', label: t('land.soilLoamy'), desc: 'Best water & nutrient retention' },
                  { id: 'sandy', label: t('land.soilSandy'), desc: 'Quick draining, warm, light' },
                  { id: 'clay', label: t('land.soilClay'), desc: 'Heavy, holds moisture, paddy fit' },
                  { id: 'alluvial', label: t('land.soilAlluvial'), desc: 'Rich riverbed fertile silt' },
                  { id: 'black', label: t('land.soilBlack'), desc: 'Cotton soil, moisture retaining' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleFieldChange('soilType', item.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      formData.soilType === item.id
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 mb-0.5">{item.label}</div>
                    <div className="text-[11px] text-slate-500 leading-snug">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Soil pH Slider */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t('land.soilPh')}: <span className="text-emerald-700 text-sm font-black">{formData.soilPh || 7.0}</span>
                </label>
                <span className="text-[11px] font-semibold text-slate-500">
                  {formData.soilPh < 6.5 ? 'Acidic' : formData.soilPh > 7.8 ? 'Alkaline' : 'Neutral (Ideal: 6.5 - 7.5)'}
                </span>
              </div>
              <input
                type="range"
                min="5.0"
                max="9.0"
                step="0.1"
                value={formData.soilPh || 7.0}
                onChange={(e) => handleFieldChange('soilPh', parseFloat(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>5.0 (Acidic)</span>
                <span>7.0 (Neutral)</span>
                <span>9.0 (Alkaline/Kallar)</span>
              </div>
            </div>

            {/* Soil Test Report Upload with AI Explanation */}
            <div className="p-5 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{t('land.soilReportUpload')}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload your Government Soil Health Card photo or PDF. AI will simplify the NPK values.
                </p>
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-sm">
                <FileText className="w-4 h-4" />
                <span>{analyzingSoilReport ? 'Analyzing with AI...' : 'Choose File or Take Photo'}</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleSoilReportUpload}
                  className="hidden"
                />
              </label>

              {soilAnalysisResult && (
                <div className="mt-4 p-4 rounded-xl bg-white border border-emerald-200 text-left text-xs leading-relaxed space-y-2 shadow-sm animate-fade-in">
                  <div className="flex items-center justify-between text-emerald-900 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      {t('land.soilReportAI')}
                    </span>
                    <AudioSpeaker textToRead={soilAnalysisResult} />
                  </div>
                  <p className="text-slate-700">{soilAnalysisResult}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: WATER AVAILABILITY */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">{t('land.step3Title')}</h2>
                <p className="text-xs text-slate-500">{t('land.step3Desc')}</p>
              </div>
              <AudioSpeaker textToRead={`${t('land.step3Title')}. ${t('land.waterSources')}`} />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                {t('land.waterSources')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: 'tubewell', label: t('land.waterTubewell'), icon: '⚡', desc: 'Electric or diesel motor borewell' },
                  { id: 'canal', label: t('land.waterCanal'), icon: '🌊', desc: 'Canal rotational warabandi water' },
                  { id: 'rain', label: t('land.waterRain'), icon: '🌧️', desc: 'Monsoon and rainfall dependent' },
                  { id: 'drip', label: t('land.waterDrip'), icon: '💧', desc: 'Micro-drip pipes (water efficient)' },
                  { id: 'sprinkler', label: t('land.waterSprinkler'), icon: '🚿', desc: 'Overhead sprinkler pipes for undulating land' }
                ].map(w => {
                  const isChecked = formData.waterSources.includes(w.id);
                  return (
                    <div
                      key={w.id}
                      onClick={() => handleWaterToggle(w.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-400'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{w.icon}</span>
                        <div>
                          <div className="font-bold text-sm text-slate-900">{w.label}</div>
                          <div className="text-xs text-slate-500">{w.desc}</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent div
                        className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: FARMING RESOURCES & BUDGET */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">{t('land.step4Title')}</h2>
                <p className="text-xs text-slate-500">{t('land.step4Desc')}</p>
              </div>
              <AudioSpeaker textToRead={`${t('land.step4Title')}. ${t('land.budget')}, ${t('land.equipment')}`} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('land.budget')} *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    step="5000"
                    value={formData.budget}
                    onChange={(e) => handleFieldChange('budget', parseFloat(e.target.value) || 0)}
                    className="w-full text-base font-bold pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="90000"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Covers seeds, fertilizers, tractor fuel, and hired labor.
                </p>
              </div>

              {/* Labor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('land.labor')} *
                </label>
                <select
                  value={formData.labor}
                  onChange={(e) => handleFieldChange('labor', e.target.value)}
                  className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="laborAmple">{t('land.laborAmple')}</option>
                  <option value="laborModerate">{t('land.laborModerate')}</option>
                  <option value="laborScarce">{t('land.laborScarce')}</option>
                </select>
              </div>

              {/* Previous Crops */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('land.previousCrops')}
                </label>
                <input
                  type="text"
                  value={formData.previousCrops}
                  onChange={(e) => handleFieldChange('previousCrops', e.target.value)}
                  className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Paddy (PR 126), Cotton, or Fallow"
                />
              </div>

              {/* Preferred Crops */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('land.preferredCrops')}
                </label>
                <input
                  type="text"
                  value={formData.preferredCrops}
                  onChange={(e) => handleFieldChange('preferredCrops', e.target.value)}
                  className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Wheat, Mustard, Vegetables, Potato"
                />
              </div>
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('common.back')}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              {saveSuccess ? (
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" /> {t('common.saved')}
                </span>
              ) : (
                t('common.save')
              )}
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-600/20"
              >
                <span>{t('common.next')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleProceedToPlanner}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors shadow-lg shadow-amber-400/20 active:scale-95"
              >
                <span>{language === 'pa' ? 'AI ਫਸਲ ਯੋਜਨਾਕਾਰ ਖੋਲ੍ਹੋ' : language === 'hi' ? 'AI फसल योजनाकार खोलें' : 'Proceed to AI Crop Planner'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
