import React from 'react';
import { Phone, ShieldCheck, ExternalLink, Heart, Sprout } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Helpline Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-6 mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-amber-300 animate-bounce" />
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl">
                {language === 'pa' ? 'ਕੌਮੀ ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ (ਮੁਫ਼ਤ ਹੈਲਪਲਾਈਨ)' : language === 'hi' ? 'राष्ट्रीय किसान कॉल सेंटर (निःशुल्क हेल्पलाइन)' : 'National Kisan Call Centre (Toll-Free Helpline)'}
              </div>
              <div className="text-emerald-200 text-xs sm:text-sm">
                1800-180-1551 • {language === 'pa' ? 'ਸਵੇਰੇ 6:00 ਤੋਂ ਰਾਤ 10:00 ਵਜੇ (ਰੋਜ਼ਾਨਾ)' : language === 'hi' ? 'सुबह 6:00 से रात 10:00 बजे (प्रतिदिन)' : '6:00 AM to 10:00 PM Daily'}
              </div>
            </div>
          </div>
          <a
            href="tel:18001801551"
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-md transition-all text-sm active:scale-95"
          >
            {t('common.callNow')} 1800-180-1551
          </a>
        </div>

        {/* 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-sm">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-emerald-500 rounded-lg text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">KrishiMitra AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {t('tagline')}. 
              Dedicated to empowering Indian farmers with AI-driven land planning, verified seed sources, disease cure, real mandi returns, and transparent farm financial records.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded-md border border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Agro-Informatics</span>
            </div>
          </div>

          {/* Col 2: Government & University Portals */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider text-xs">
              {language === 'pa' ? 'ਸਰਕਾਰੀ ਅਤੇ ਖੇਤੀ ਪੋਰਟਲ' : language === 'hi' ? 'सरकारी एवं कृषि पोर्टल' : 'Official Agri Portals'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="https://agmarknet.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                  Agmarknet (Mandi Prices) <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pau.edu" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                  Punjab Agricultural University (PAU) <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://icar.org.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                  ICAR - Indian Council of Agri Research <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://kvk.icar.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                  KVK Portal (Krishi Vigyan Kendra) <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://enam.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                  e-NAM (National Agriculture Market) <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Supported Languages & Coverage */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider text-xs">
              {language === 'pa' ? 'ਭਾਸ਼ਾਵਾਂ ਅਤੇ ਕਵਰੇਜ' : language === 'hi' ? 'भाषाएं एवं कवरेज' : 'Languages & Zones'}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>🌾 ਪੰਜਾਬੀ (Punjabi) - Gurmukhi</p>
              <p>🇮🇳 हिंदी (Hindi) - Devanagari</p>
              <p>🌐 English - Standard</p>
              <p className="mt-3 text-[11px] text-slate-500">
                Primary Zones: Punjab, Haryana, Rajasthan, Uttar Pradesh, Madhya Pradesh, and Northern Plains.
              </p>
            </div>
          </div>

          {/* Col 4: Important Advisory Notice */}
          <div>
            <h4 className="text-amber-400 font-bold text-sm mb-3 uppercase tracking-wider text-xs">
              {t('common.disclaimerTitle')}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('common.disclaimerText')}
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            © 2026 KrishiMitra AI. Built for the hardworking farmers of India.
          </div>
          <div className="flex items-center gap-1 mt-2 sm:mt-0 text-slate-400">
            <span>Jai Jawan, Jai Kisan</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
