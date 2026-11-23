import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useVoiceAssistant } from '../voice/VoiceAssistantContext';
import { useLanguage } from '../i18n/LanguageContext';

export const AudioSpeaker = ({ textToRead, label = '', className = '' }) => {
  const { isSpeaking, speak, stopSpeaking } = useVoiceAssistant();
  const { t } = useLanguage();

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(textToRead);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={isSpeaking ? t('common.audioStop') : t('common.audioListen')}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border transition-all ${
        isSpeaking
          ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
          : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
      } ${className}`}
    >
      {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-700" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-700" />}
      <span>{label || (isSpeaking ? t('common.audioStop') : t('common.audioListen'))}</span>
    </button>
  );
};
