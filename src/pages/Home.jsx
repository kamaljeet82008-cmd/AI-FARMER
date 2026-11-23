import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Sparkles, 
  ShoppingBag, 
  BookOpen, 
  Bug, 
  Users, 
  TrendingUp, 
  Scale, 
  Bell, 
  Calendar,
  ArrowRight,
  Mic,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useVoiceAssistant } from '../voice/VoiceAssistantContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { getFarmerProfile } from '../firebase/offlineStorage';
import { getWeatherData } from '../services/weatherService';

export const Home = () => {
  const { t, language } = useLanguage();
  const { setIsModalOpen } = useVoiceAssistant();
  const profile = getFarmerProfile();
  const weather = getWeatherData(profile.district || 'Ludhiana');

  const moduleCards = [
    {
      id: 'land',
      number: '01',
      title: t('home.modules.land.title'),
      desc: t('home.modules.land.desc'),
      path: '/land-assessment',
      icon: MapPin,
      color: 'from-emerald-500 to-green-600',
      badge: 'Step 1'
    },
    {
      id: 'crop',
      number: '02',
      title: t('home.modules.crop.title'),
      desc: t('home.modules.crop.desc'),
      path: '/crop-planner',
      icon: Sparkles,
      color: 'from-amber-500 to-orange-600',
      badge: 'Core AI'
    },
    {
      id: 'seed',
      number: '03',
      title: t('home.modules.seed.title'),
      desc: t('home.modules.seed.desc'),
      path: '/seed-finder',
      icon: ShoppingBag,
      color: 'from-teal-500 to-emerald-600',
      badge: 'Verified Seeds'
    },
    {
      id: 'guide',
      number: '04',
      title: t('home.modules.guide.title'),
      desc: t('home.modules.guide.desc'),
      path: '/crop-guide',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      badge: '6-Stage Care'
    },
    {
      id: 'disease',
      number: '05',
      title: t('home.modules.disease.title'),
      desc: t('home.modules.disease.desc'),
      path: '/disease-detection',
      icon: Bug,
      color: 'from-rose-500 to-red-600',
      badge: 'Multimodal AI'
    },
    {
      id: 'expert',
      number: '06',
      title: t('home.modules.expert.title'),
      desc: t('home.modules.expert.desc'),
      path: '/expert-finder',
      icon: Users,
      color: 'from-purple-500 to-indigo-600',
      badge: 'KVK & Scientists'
    },
    {
      id: 'mandi',
      number: '07',
      title: t('home.modules.mandi.title'),
      desc: t('home.modules.mandi.desc'),
      path: '/market-selling',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-700',
      badge: 'Net Profit Maximizer'
    },
    {
      id: 'valueAdd',
      number: '08',
      title: t('home.modules.valueAdd.title'),
      desc: t('home.modules.valueAdd.desc'),
      path: '/value-addition',
      icon: Scale,
      color: 'from-amber-600 to-yellow-600',
      badge: '+40% Margin'
    },
    {
      id: 'alerts',
      number: '09',
      title: t('home.modules.alerts.title'),
      desc: t('home.modules.alerts.desc'),
      path: '/crop-alerts',
      icon: Bell,
      color: 'from-sky-500 to-blue-600',
      badge: 'Live Forecast'
    },
    {
      id: 'profit',
      number: '10',
      title: t('home.modules.profit.title'),
      desc: t('home.modules.profit.desc'),
      path: '/profit-dashboard',
      icon: Calendar,
      color: 'from-slate-700 to-slate-900',
      badge: 'Financial Book'
    },
  ];

  const journeySteps = [
    { label: 'LAND', icon: '🗺️' },
    { label: 'CROP PLANNING', icon: '🌾' },
    { label: 'SEED SELECTION', icon: '🌱' },
    { label: 'CULTIVATION', icon: '🚜' },
    { label: 'CROP CARE', icon: '💧' },
    { label: 'DISEASE DETECTION', icon: '🔬' },
    { label: 'HARVESTING', icon: '🌾' },
    { label: 'MARKET COMPARISON', icon: '⚖️' },
    { label: 'PROFIT MANAGEMENT', icon: '💰' }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-700/50">
        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Top Tagline Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">
              ⭐ {t('appName')}
            </span>
            <span className="text-xs text-emerald-200">
              {t('tagline')}
            </span>
            <AudioSpeaker textToRead={`${t('home.heroTitle')}. ${t('home.heroSubtitle')}`} />
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-snug">
            {t('home.heroTitle')}
          </h1>

          <p className="text-sm sm:text-lg text-emerald-100 max-w-2xl font-normal leading-relaxed">
            {t('home.heroSubtitle')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/land-assessment"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-400/20 transition-all active:scale-95"
            >
              <span>{t('home.startPlanning')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/market-selling"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all"
            >
              <span>{t('home.exploreMandi')}</span>
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold text-sm border border-emerald-400/30 transition-all"
            >
              <Mic className="w-4 h-4 text-amber-300" />
              <span>{t('home.askAssistant')}</span>
            </button>
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-10 top-10 text-9xl opacity-10 select-none pointer-events-none">
          🌾
        </div>
      </section>

      {/* Live Farm Pulse: Weather & Mandi Ticker */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weather Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <span>{weather.current.icon}</span>
              <span>{weather.location}</span>
            </div>
            <div className="text-2xl font-black text-slate-800">
              {weather.current.temp}°C
            </div>
            <div className="text-xs text-slate-600">
              {language === 'pa' ? weather.current.conditionPa : language === 'hi' ? weather.current.conditionHi : weather.current.condition}
            </div>
          </div>
          <div className="text-right text-xs space-y-1 text-slate-500">
            <div>💧 Humidity: <span className="font-bold text-slate-700">{weather.current.humidity}%</span></div>
            <div>🌧️ Rain Chance: <span className="font-bold text-slate-700">{weather.current.rainProbability}%</span></div>
            <Link to="/crop-alerts" className="text-emerald-700 font-semibold hover:underline block pt-1">
              5-Day Advisory →
            </Link>
          </div>
        </div>

        {/* Mandi Price Pulse */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Khanna APMC Grain Market</span>
            </div>
            <div className="text-xs text-slate-600">
              Wheat: <span className="font-extrabold text-slate-900 text-sm">₹2,435/Qtl</span>
            </div>
            <div className="text-xs text-slate-600">
              Mustard: <span className="font-extrabold text-slate-900 text-sm">₹5,680/Qtl</span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
              Live Agmarknet
            </span>
            <Link to="/market-selling" className="text-xs text-emerald-700 font-semibold hover:underline block pt-2">
              Calculate Transport →
            </Link>
          </div>
        </div>

        {/* Current Farmer Profile Summary */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-5 rounded-2xl border border-emerald-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Your Farmland Profile</span>
            </div>
            <div className="text-lg font-black text-slate-900">
              {profile.acresStandard} {t('common.acres')} • {profile.village}, {profile.district}
            </div>
            <div className="text-xs text-slate-600">
              Soil: <span className="font-semibold capitalize">{profile.soilType}</span> | Water: <span className="font-semibold">{profile.waterSources.join(', ')}</span>
            </div>
          </div>
          <Link
            to="/land-assessment"
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors whitespace-nowrap"
          >
            {t('common.edit')}
          </Link>
        </div>
      </section>

      {/* Farm-to-Profit Journey Flowchart */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {t('home.journeyTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t('home.journeyDesc')}
            </p>
          </div>
          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
            End-to-End Farming Partner
          </div>
        </div>

        {/* Horizontal visual stepper */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          {journeySteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center flex-shrink-0 text-center min-w-[95px] p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-emerald-400 transition-colors">
                <span className="text-2xl mb-1">{step.icon}</span>
                <span className="text-[10px] font-extrabold tracking-wider text-slate-700 uppercase">
                  {step.label}
                </span>
              </div>
              {idx < journeySteps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 10 Core Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === 'pa' ? 'ਸਾਰੇ ਖੇਤੀਬਾੜੀ ਮੋਡਿਊਲ' : language === 'hi' ? 'सभी कृषि मॉड्यूल' : 'All Agriculture Modules'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'pa' ? 'ਜ਼ਮੀਨ ਦੇ ਮੁਲਾਂਕਣ ਤੋਂ ਲੈ ਕੇ ਮੰਡੀ ਦੀ ਵਿਕਰੀ ਅਤੇ ਮੁਨਾਫੇ ਤੱਕ' : language === 'hi' ? 'जमीन के आकलन से लेकर मंडी बिक्री व मुनाफे तक' : 'From land evaluation to crop diagnosis, mandi selling, and profit management.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {moduleCards.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.id}
                to={m.path}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Accent top stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${m.color}`}></div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${m.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {m.badge}
                    </span>
                  </div>

                  <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider mb-1">
                    Module {m.number}
                  </div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                  <span>{language === 'pa' ? 'ਖੋਲ੍ਹੋ' : language === 'hi' ? 'खोलें' : 'Open Module'}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust & Verification Strip */}
      <section className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-emerald-900/80 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>ICAR & PAU Aligned Agro-Advisory</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold">
            {language === 'pa' ? 'ਹਮੇਸ਼ਾ ਭਰੋਸੇਯੋਗ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਖੇਤੀ ਜਾਣਕਾਰੀ' : language === 'hi' ? 'हमेशा विश्वसनीय एवं प्रमाणित कृषि जानकारी' : 'Reliable, Verified Agriculture Insights'}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-300 max-w-xl">
            {language === 'pa' ? 'ਕੋਈ ਫਰਜ਼ੀ ਬੀਜ ਜਾਂ ਮਨਘੜਤ ਮੰਡੀ ਭਾਅ ਨਹੀਂ। ਹਰ ਸੁਝਾਅ ਅਸਲ ਖੇਤੀਬਾੜੀ ਡਾਟਾ ਅਤੇ ਸਰਕਾਰੀ ਮਾਪਦੰਡਾਂ ਉੱਤੇ ਅਧਾਰਤ ਹੈ।' : language === 'hi' ? 'कोई नकली बीज या मनगढ़ंत मंडी भाव नहीं। प्रत्येक सुझाव वास्तविक कृषि डेटा व मानकों पर आधारित है।' : 'No fabricated seed varieties or fake mandi quotes. Built with verified agricultural parameters.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/expert-finder"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors whitespace-nowrap"
          >
            {t('nav.expertFinder')}
          </Link>
        </div>
      </section>
    </div>
  );
};
