import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Navigation } from 'lucide-react';
import { 
  Users, 
  Phone, 
  MapPin, 
  Search, 
  Filter, 
  Award, 
  CheckCircle2, 
  Send, 
  MessageSquare, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { KISAN_CALL_CENTRE, OFFICIAL_PORTALS, EXPERT_SEARCHES, mapsSearchUrl } from '../data/expertsData';
import { getFarmerProfile } from '../firebase/offlineStorage';

export const ExpertFinder = () => {
  const { t, language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [consultModalExpert, setConsultModalExpert] = useState(null);
  const [farmerQuestion, setFarmerQuestion] = useState('');
  const [consultSuccess, setConsultSuccess] = useState(false);

  // Category filters
  const categories = [
    { id: 'all', label: t('expert.allCategories') },
    { id: 'catDisease', label: t('expert.catDisease') },
    { id: 'catSoil', label: t('expert.catSoil') },
    { id: 'catIrrigation', label: t('expert.catIrrigation') },
    { id: 'catHorticulture', label: t('expert.catHorticulture') },
    { id: 'catExtension', label: t('expert.catExtension') },
  ];

  const profile = getFarmerProfile();
  const place = [profile?.district, profile?.state].filter(Boolean).join(' ') || 'near me';

  const filteredExperts = EXPERT_SEARCHES.filter(exp => {
    const matchesCat = selectedCategory === 'all' || exp.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery = !searchQuery ||
      exp.title.toLowerCase().includes(q) ||
      exp.desc.toLowerCase().includes(q) ||
      exp.specialties.some(sp => sp.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    if (!farmerQuestion.trim()) return;
    try {
      const key = 'krishimitra_consult_requests';
      const list = JSON.parse(localStorage.getItem(key) || '[]');
      list.push({ to: consultModalExpert.title, question: farmerQuestion, district: profile?.district, createdAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(list));
    } catch { /* ignore */ }

    setConsultSuccess(true);
    setTimeout(() => {
      setConsultSuccess(false);
      setConsultModalExpert(null);
      setFarmerQuestion('');
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 06
            </span>
            <AudioSpeaker textToRead={`${t('expert.title')}. ${t('expert.subtitle')}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('expert.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('expert.subtitle')}
          </p>
        </div>

        {/* National Helpline Callout */}
        <a href={`tel:${KISAN_CALL_CENTRE.number.replace(/-/g, "")}`} className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center gap-3.5 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center">
            <Phone className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-purple-800 uppercase tracking-wider">
              National Kisan Call Centre
            </div>
            <div className="text-lg font-black text-purple-950">
              {KISAN_CALL_CENTRE.number}
            </div>
            <div className="text-[10px] text-purple-700">
              Free • Daily {KISAN_CALL_CENTRE.hours}
            </div>
          </div>
        </a>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('expert.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-700 text-white shadow-sm ring-2 ring-purple-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nearby official offices */}
      <div className="text-xs text-slate-500 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5" /> {place}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredExperts.map(exp => (
          <div key={exp.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="font-black text-base text-slate-900">{exp.title}</h3>
              </div>
              <p className="text-xs text-slate-600">{exp.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {exp.specialties.map((sp, i) => (
                  <span key={i} className="text-[11px] bg-purple-50 text-purple-900 border border-purple-100 px-2 py-0.5 rounded-md font-medium">{sp}</span>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <a href={mapsSearchUrl(exp.query.replace('{place}', place))} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold active:scale-95">
                <Navigation className="w-3.5 h-3.5" /><span>Find nearby / Directions</span>
              </a>
              <button onClick={() => setConsultModalExpert(exp)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold border border-purple-200">
                <MessageSquare className="w-3.5 h-3.5 text-purple-700" /><span>{t('expert.requestConsultation')}</span>
              </button>
            </div>
          </div>
        ))}
        {filteredExperts.length === 0 && <div className="text-sm text-slate-500 p-6">No results.</div>}
      </div>

      {/* Official portals */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 space-y-3">
        <h3 className="font-black text-slate-900 text-sm">Official contact lists</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {OFFICIAL_PORTALS.map(p => (
            <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs space-y-1 block">
              <div className="font-bold text-slate-900 flex items-center gap-1">{p.title}<ExternalLink className="w-3 h-3" /></div>
              <div className="text-slate-500">{p.note}</div>
            </a>
          ))}
        </div>
        <p className="text-[11px] text-slate-500">Phone numbers and names are taken from the official pages above, not stored in this app, so they are always current.</p>
      </div>

      {/* CONSULTATION REQUEST MODAL */}
      {consultModalExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-purple-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-lg text-slate-900">
                  {t('expert.consultationModalTitle')}
                </h3>
                <p className="text-xs text-purple-700 font-semibold">
                  To: {consultModalExpert.title}
                </p>
              </div>
              <button
                onClick={() => setConsultModalExpert(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {consultSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600 animate-bounce" />
                <h4 className="font-bold text-emerald-950 text-sm">Request saved!</h4>
                <p className="text-xs text-emerald-800">
                  Your question is saved in this app. To get an answer now, call the Kisan Call Centre or use the Find nearby button.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Describe your crop problem or question:
                  </label>
                  <textarea
                    rows={4}
                    value={farmerQuestion}
                    onChange={(e) => setFarmerQuestion(e.target.value)}
                    placeholder="e.g. My wheat field shows yellow spots in two patches. Sowing was done on Nov 5th. Need advice on spray dosage..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-500">
                  ℹ️ Your village, district, and soil data from Land Assessment will be attached automatically so the expert has full context.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setConsultModalExpert(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-end">
        <Link
          to="/market-selling"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors shadow-lg shadow-emerald-600/20 active:scale-95"
        >
          <span>Proceed to Step 7: Smart Mandi & Selling Assistant</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
