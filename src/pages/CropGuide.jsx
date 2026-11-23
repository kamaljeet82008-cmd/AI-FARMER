import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Droplet, 
  Plus, 
  Camera, 
  CheckCircle2, 
  Clock, 
  Bell, 
  ChevronDown, 
  ChevronUp,
  FileCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { CULTIVATION_GUIDES } from '../data/cultivationGuides';
import { 
  getSowingDetails, 
  saveSowingDetails, 
  getActivities, 
  addActivity 
} from '../firebase/offlineStorage';

export const CropGuide = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const cropParam = searchParams.get('crop') || 'wheat';

  const guideData = CULTIVATION_GUIDES[cropParam] || CULTIVATION_GUIDES.wheat;
  const cropName = language === 'pa' ? guideData.cropNamePa : language === 'hi' ? guideData.cropNameHi : guideData.cropNameEn;

  // Active accordion stage
  const [activeStage, setActiveStage] = useState(1);

  // Sowing Details State
  const [sowingState, setSowingState] = useState(() => getSowingDetails());
  const [newSowingDate, setNewSowingDate] = useState(sowingState.sowingDate || '2026-11-05');
  const [savedSowingNotice, setSavedSowingNotice] = useState(false);

  // Activity Log State
  const [activities, setActivities] = useState(() => getActivities());
  const [activityType, setActivityType] = useState('Fertilizer Application');
  const [activityNotes, setActivityNotes] = useState('');
  const [activityDate, setActivityDate] = useState(new Date().toISOString().split('T')[0]);

  // Calculate Days After Sowing (DAS)
  const calculateDAS = (sowingDateStr) => {
    try {
      const sowing = new Date(sowingDateStr);
      const today = new Date();
      const diffTime = today - sowing;
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, days);
    } catch (e) {
      return 18;
    }
  };

  const daysAfterSowing = calculateDAS(newSowingDate);

  const handleUpdateSowing = (e) => {
    e.preventDefault();
    const updated = saveSowingDetails({
      ...sowingState,
      sowingDate: newSowingDate
    });
    setSowingState(updated);
    setSavedSowingNotice(true);
    setTimeout(() => setSavedSowingNotice(false), 3000);
  };

  const handleAddIrrigation = () => {
    const today = new Date().toISOString().split('T')[0];
    const newIrr = {
      id: 'irr-' + Date.now(),
      date: today,
      type: `Irrigation at Day ${daysAfterSowing}`,
      source: 'Tube well & canal'
    };
    const updated = {
      ...sowingState,
      irrigations: [newIrr, ...(sowingState.irrigations || [])]
    };
    saveSowingDetails(updated);
    setSowingState(updated);

    // Also record in activity log
    handleAddActivityDirect(`Irrigation logged for ${cropName}`, 'Applied light irrigation through tube well.');
  };

  const handleAddActivityDirect = (type, notes) => {
    const entry = {
      date: new Date().toISOString().split('T')[0],
      type,
      notes,
      cropId: cropParam
    };
    const updated = addActivity(entry);
    setActivities(updated);
  };

  const handleActivitySubmit = (e) => {
    e.preventDefault();
    if (!activityNotes.trim()) return;

    const entry = {
      date: activityDate,
      type: activityType,
      notes: activityNotes,
      cropId: cropParam
    };
    const updated = addActivity(entry);
    setActivities(updated);
    setActivityNotes('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 04
            </span>
            <AudioSpeaker textToRead={`${t('guide.title')}. ${t('guide.subtitle')}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('guide.title')} ({cropName})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('guide.subtitle')}
          </p>
        </div>

        {/* Current Growth Stage Pill */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-center sm:text-right flex-shrink-0">
          <div className="text-[11px] font-bold text-emerald-800 uppercase">
            {t('guide.currentGrowthStage')}
          </div>
          <div className="text-2xl font-black text-emerald-950">
            Day {daysAfterSowing} <span className="text-xs font-bold text-slate-500">DAS</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {daysAfterSowing < 10 ? 'Germination' : daysAfterSowing < 35 ? 'Crown Root Initiation / Early Vegetative' : daysAfterSowing < 75 ? 'Tillering & Jointing' : 'Flowering & Grain Filling'}
          </div>
        </div>
      </div>

      {/* TRACKER DASHBOARD WIDGET */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Interactive Management Tool
            </span>
            <h2 className="text-xl font-black">
              {t('guide.trackerTitle')}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddIrrigation}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors active:scale-95"
            >
              <Droplet className="w-4 h-4 text-sky-300" />
              <span>Record Today's Irrigation</span>
            </button>
          </div>
        </div>

        {/* Sowing Date Form & Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Sowing Date Picker */}
          <form onSubmit={handleUpdateSowing} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase">
              {t('guide.sowingDate')}
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={newSowingDate}
                onChange={(e) => setNewSowingDate(e.target.value)}
                className="flex-1 text-xs font-bold px-3 py-2 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-colors"
              >
                {savedSowingNotice ? 'Saved!' : 'Update'}
              </button>
            </div>
            <div className="text-[11px] text-slate-400">
              Cultivation reminders will adjust based on this date.
            </div>
          </form>

          {/* Irrigation History Counter */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="text-xs font-bold text-slate-300 uppercase">Irrigations Recorded</div>
            <div className="text-3xl font-black text-sky-400 my-1">
              {sowingState.irrigations?.length || 1} <span className="text-xs text-slate-300 font-normal">Applications</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Last water: {sowingState.irrigations?.[0]?.date || '2026-11-01'}
            </div>
          </div>

          {/* Upcoming Calendar Reminder */}
          <div className="bg-amber-500/20 p-4 rounded-2xl border border-amber-400/30 flex flex-col justify-between">
            <div className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1">
              <Bell className="w-3.5 h-3.5" />
              <span>Next Upcoming Task</span>
            </div>
            <div className="text-sm font-bold text-white my-1">
              {daysAfterSowing < 22 ? 'Day 21: 1st Irrigation + 1 Bag Urea' : daysAfterSowing < 35 ? 'Day 30-35: Gullidanda weed spray in moist field' : 'Day 75: Yellow Rust preventive field inspection'}
            </div>
            <div className="text-[11px] text-amber-200">
              Cultivation Calendar Reminder
            </div>
          </div>
        </div>
      </div>

      {/* 6-STAGE COMPLETE LIFECYCLE GUIDE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              6-Stage Scientific Cultivation Lifecycle
            </h2>
            <p className="text-xs text-slate-500">
              Practical package of practices formulated by Agricultural Extension and PAU/ICAR scientists.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {guideData.stages.map((stage) => {
            const isOpen = activeStage === stage.stageNumber;
            const stageTitle = language === 'pa' ? stage.titlePa : language === 'hi' ? stage.titleHi : stage.titleEn;

            return (
              <div 
                key={stage.stageNumber}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isOpen ? 'border-emerald-500 shadow-md ring-1 ring-emerald-300' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Accordion Bar */}
                <button
                  type="button"
                  onClick={() => setActiveStage(isOpen ? null : stage.stageNumber)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isOpen ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {stage.stageNumber}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">{stageTitle}</h3>
                      <div className="text-xs text-slate-500">{stage.durationDays}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AudioSpeaker textToRead={`${stageTitle}. ${stage.tasks.join('. ')}`} />
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {/* Expanded Tasks List */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3 animate-fade-in">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Recommended Agronomy Checklist:
                    </div>
                    <ul className="space-y-2.5">
                      {stage.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FARMING ACTIVITY JOURNAL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>{t('guide.activityHistory')}</span>
            </h2>
            <p className="text-xs text-slate-500">
              Record farming activities (fertilizer, weeding, sprays) with date and field notes.
            </p>
          </div>
        </div>

        {/* Add Activity Form */}
        <form onSubmit={handleActivitySubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Date
            </label>
            <input
              type="date"
              value={activityDate}
              onChange={(e) => setActivityDate(e.target.value)}
              className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Activity Type
            </label>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 bg-white"
            >
              <option value="Fertilizer Application">Fertilizer Application (खाद / ਖਾਦ)</option>
              <option value="Weeding & Interculture">Weeding & Interculture (ਗੋਡੀ / निराई)</option>
              <option value="Pesticide / Fungicide Spray">Pesticide Spray (ਕੀਟਨਾਸ਼ਕ / ਕੀਟਨਾਸ਼ੀ)</option>
              <option value="Field Inspection">General Field Inspection (ਨਿਗਰਾਨੀ)</option>
              <option value="Machinery / Tillage">Machinery / Tillage (ਵਹਾਈ / जुताई)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Field Notes / Details
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={activityNotes}
                onChange={(e) => setActivityNotes(e.target.value)}
                placeholder="e.g. Applied 1 Bag Urea with 21-day watering..."
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!activityNotes.trim()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors disabled:opacity-40"
              >
                {t('guide.addActivityBtn')}
              </button>
            </div>
          </div>
        </form>

        {/* Activities List */}
        <div className="space-y-2">
          {activities.map(act => (
            <div key={act.id} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">{act.type}</div>
                  <div className="text-slate-600 mt-0.5">{act.notes}</div>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                {act.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-between items-center">
        <Link
          to={`/disease-detection?crop=${cropParam}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-colors shadow-lg shadow-rose-600/20 active:scale-95"
        >
          <span>Proceed to Step 5: AI Crop Disease Detection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
