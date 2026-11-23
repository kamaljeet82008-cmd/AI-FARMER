import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  CloudRain, 
  Sun, 
  Snowflake, 
  Bug, 
  Wind, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { getWeatherData } from '../services/weatherService';
import { getFarmerProfile, getSowingDetails } from '../firebase/offlineStorage';

export const CropAlerts = () => {
  const { t, language } = useLanguage();
  const profile = getFarmerProfile();
  const sowing = getSowingDetails();
  const weather = getWeatherData(profile.district || 'Ludhiana');

  const [notificationSubscribed, setNotificationSubscribed] = useState(false);

  const toggleNotifications = () => {
    setNotificationSubscribed(!notificationSubscribed);
    if (!notificationSubscribed && 'Notification' in window) {
      Notification.requestPermission();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 09 • Agro-Meteorology
            </span>
            <AudioSpeaker textToRead={`${t('alerts.title')}. ${t('alerts.subtitle')}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('alerts.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('alerts.subtitle')}
          </p>
        </div>

        {/* Push Notification Toggle */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3 flex-shrink-0">
          <Bell className={`w-5 h-5 ${notificationSubscribed ? 'text-emerald-600 animate-bounce' : 'text-slate-400'}`} />
          <div>
            <div className="text-xs font-bold text-slate-800">SMS / Push Alerts</div>
            <div className="text-[10px] text-slate-500">Firebase Cloud Messaging</div>
          </div>
          <button
            onClick={toggleNotifications}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              notificationSubscribed
                ? 'bg-emerald-600 text-white'
                : 'bg-white border text-slate-700 hover:bg-slate-100'
            }`}
          >
            {notificationSubscribed ? 'Active ✓' : 'Enable'}
          </button>
        </div>
      </div>

      {/* CURRENT WEATHER & 5-DAY FARMING FORECAST */}
      <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Live Field Weather Sensor Data
            </span>
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <span>{weather.location}</span>
              <span className="text-2xl">{weather.current.icon}</span>
            </h2>
          </div>
          <div className="text-3xl font-black text-sky-400">
            {weather.current.temp}°C
          </div>
        </div>

        {/* 4 Quick Weather Readings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1 font-bold">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>{t('alerts.humidity')}</span>
            </div>
            <div className="text-xl font-black text-white mt-1">
              {weather.current.humidity}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Optimal for wheat</div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1 font-bold">
              <CloudRain className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('alerts.rainfall')}</span>
            </div>
            <div className="text-xl font-black text-white mt-1">
              {weather.current.rainProbability}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Moderate this week</div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1 font-bold">
              <Wind className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('alerts.wind')}</span>
            </div>
            <div className="text-xl font-black text-white mt-1">
              {weather.current.windSpeed} km/h
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Safe for spraying</div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1 font-bold">
              <span>🌱</span>
              <span>Soil Moisture</span>
            </div>
            <div className="text-base font-black text-emerald-400 mt-1 truncate">
              {weather.current.soilMoisture}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Root zone level</div>
          </div>
        </div>

        {/* 5-Day Forecast Grid */}
        <div className="pt-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            {t('alerts.forecast5Day')}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {weather.forecast5Day.map((f, idx) => (
              <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/10 text-center space-y-1">
                <div className="text-xs font-extrabold text-slate-300">{f.day}</div>
                <div className="text-2xl my-1">{f.icon}</div>
                <div className="text-xs font-black text-white">{f.tempMax}° / {f.tempMin}°</div>
                <div className={`text-[10px] font-bold ${f.rain > 30 ? 'text-amber-400' : 'text-slate-400'}`}>
                  🌧️ {f.rain}% Rain
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIVE AGRICULTURAL ADVISORIES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>{t('alerts.activeAlerts')}</span>
          </h2>
          <AudioSpeaker textToRead={`${weather.alerts.map(a => `${a.titleEn}. ${a.messageEn}. Recommended action: ${a.actionRequiredEn}`).join('. ')}`} />
        </div>

        <div className="space-y-4">
          {weather.alerts.map(alert => {
            const isHigh = alert.severity === 'severityHigh';
            const alertTitle = language === 'pa' ? alert.titlePa : language === 'hi' ? alert.titleHi : alert.titleEn;
            const alertMsg = language === 'pa' ? alert.messagePa : language === 'hi' ? alert.messageHi : alert.messageEn;
            const actionMsg = language === 'pa' ? alert.actionRequiredPa : language === 'hi' ? alert.actionRequiredHi : alert.actionRequiredEn;

            return (
              <div 
                key={alert.id}
                className={`rounded-3xl p-6 border transition-all space-y-4 ${
                  isHigh ? 'bg-rose-50/80 border-rose-300' : 'bg-amber-50/80 border-amber-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-black/5">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl text-white ${isHigh ? 'bg-rose-600' : 'bg-amber-600'}`}>
                      {alert.type === 'rainWarning' ? <CloudRain className="w-5 h-5" /> : <Bug className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-black text-base sm:text-lg text-slate-900">{alertTitle}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isHigh ? 'bg-rose-200 text-rose-950' : 'bg-amber-200 text-amber-950'
                      }`}>
                        {isHigh ? t('alerts.severityHigh') : t('alerts.severityMedium')}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {alertMsg}
                </p>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>{t('alerts.actionNeeded')}:</strong> {actionMsg}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-between items-center">
        <Link
          to="/profit-dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors shadow-lg shadow-emerald-600/20 active:scale-95 ml-auto"
        >
          <span>Proceed to Step 10: Farmer Profit & Financial Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
