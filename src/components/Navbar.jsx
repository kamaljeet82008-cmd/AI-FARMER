import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sprout, 
  Mic, 
  Menu, 
  X, 
  Globe, 
  MapPin, 
  ChevronDown,
  LayoutDashboard,
  Bug,
  ShoppingBag,
  TrendingUp,
  BookOpen,
  Calendar,
  Sparkles,
  Users,
  Bell,
  Scale
} from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { useVoiceAssistant } from '../voice/VoiceAssistantContext';
import { getFarmerProfile } from '../firebase/offlineStorage';

export const Navbar = () => {
  const { t, language, setLanguage, languages } = useLanguage();
  const { setIsModalOpen, isSpeaking, isListening } = useVoiceAssistant();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const profile = getFarmerProfile();

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: LayoutDashboard },
    { to: '/land-assessment', label: t('nav.landAssessment'), icon: MapPin },
    { to: '/crop-planner', label: t('nav.cropPlanner'), icon: Sparkles },
    { to: '/seed-finder', label: t('nav.seedFinder'), icon: ShoppingBag },
    { to: '/crop-guide', label: t('nav.cropGuide'), icon: BookOpen },
    { to: '/disease-detection', label: t('nav.diseaseDetection'), icon: Bug },
    { to: '/expert-finder', label: t('nav.expertFinder'), icon: Users },
    { to: '/market-selling', label: t('nav.marketSelling'), icon: TrendingUp },
    { to: '/value-addition', label: t('nav.valueAddition'), icon: Scale },
    { to: '/crop-alerts', label: t('nav.alerts'), icon: Bell },
    { to: '/profit-dashboard', label: t('nav.profitDashboard'), icon: Calendar },
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner with Farmer profile & Language Switcher */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-amber-300 flex items-center gap-1">
            🌾 {t('appName')}
          </span>
          <span className="hidden sm:inline-block text-emerald-300/80">|</span>
          <span className="hidden sm:inline-block text-emerald-200">
            {t('tagline')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {profile && (
            <div className="flex items-center gap-1.5 bg-emerald-800/80 px-2 py-0.5 rounded text-[11px] text-emerald-100 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{profile.acresStandard} {t('common.acres')} • {profile.district || 'Punjab'}</span>
            </div>
          )}

          {user && (
            <button onClick={logout} title={t('auth.logout')} className="flex items-center gap-1 bg-emerald-800 hover:bg-red-700 text-white px-2 py-0.5 rounded text-xs font-medium">
              <LogOut className="w-3.5 h-3.5" /><span className="hidden sm:inline">{user.name?.split(' ')[0]} • {t('auth.logout')}</span>
            </button>
          )}

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-white px-2 py-0.5 rounded text-xs font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentLangObj.short}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {langDropdownOpen && (
              <div 
                className="absolute right-0 mt-1 w-44 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 z-50 animate-fade-in"
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 ${
                      language === lang.code ? 'font-bold text-emerald-700 bg-emerald-50/60' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-sm">{lang.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
                KrishiMitra <span className="text-emerald-600 font-black">AI</span>
              </span>
              <span className="hidden md:block text-[10px] text-slate-500 font-medium -mt-1">
                {language === 'pa' ? 'ਸਮਾਰਟ ਖੇਤੀ • ਵੱਧ ਮੁਨਾਫਾ' : language === 'hi' ? 'स्मार्ट खेती • अधिक मुनाफा' : 'Smart Farming, Higher Returns'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Voice Assistant & Mobile Hamburger Buttons */}
          <div className="flex items-center gap-2">
            {/* Prominent Voice Assistant Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 ${
                isListening || isSpeaking
                  ? 'bg-amber-500 text-white animate-pulse shadow-amber-500/30 ring-2 ring-amber-300'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/30'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'pa' ? 'ਬੋਲ ਕੇ ਪੁੱਛੋ' : language === 'hi' ? 'आवाज सहायक' : 'Voice Assistant'}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-nav horizontal scroll on desktop for remaining modules */}
      <div className="hidden xl:flex items-center justify-center gap-2 py-1.5 bg-slate-50/80 border-t border-slate-100 text-xs">
        {navLinks.slice(7).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
