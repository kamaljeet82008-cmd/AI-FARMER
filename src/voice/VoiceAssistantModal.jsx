import React, { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, Send, Radio } from 'lucide-react';
import { useVoiceAssistant } from './VoiceAssistantContext';
import { useLanguage } from '../i18n/LanguageContext';

export const VoiceAssistantModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    isListening,
    isSpeaking,
    transcript,
    assistantResponse,
    isLoading,
    mode,
    setMode,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    askQuestion,
    setTranscript
  } = useVoiceAssistant();

  const { t, language } = useLanguage();
  const [inputText, setInputText] = useState('');

  if (!isModalOpen) return null;

  const handleSendText = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    askQuestion(inputText);
    setInputText('');
  };

  const handleChipClick = (query) => {
    askQuestion(query);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{t('voice.assistantTitle')}</h3>
              <p className="text-xs text-emerald-200">{t('voice.assistantSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopListening();
              stopSpeaking();
              setIsModalOpen(false);
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-4 py-2.5 flex items-center justify-between text-xs text-slate-700">
          <span className="font-semibold text-emerald-900">{t('voice.modeLabel')}</span>
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-emerald-200 shadow-sm">
            <button
              onClick={() => setMode('both')}
              className={`px-2 py-1 rounded-md transition-all ${
                mode === 'both' ? 'bg-emerald-600 text-white font-medium shadow-xs' : 'hover:bg-slate-100'
              }`}
            >
              {t('voice.modeBoth')}
            </button>
            <button
              onClick={() => setMode('voice')}
              className={`px-2 py-1 rounded-md transition-all ${
                mode === 'voice' ? 'bg-emerald-600 text-white font-medium shadow-xs' : 'hover:bg-slate-100'
              }`}
            >
              {t('voice.modeVoice')}
            </button>
            <button
              onClick={() => setMode('text')}
              className={`px-2 py-1 rounded-md transition-all ${
                mode === 'text' ? 'bg-emerald-600 text-white font-medium shadow-xs' : 'hover:bg-slate-100'
              }`}
            >
              {t('voice.modeText')}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Audio Visualizer & Big Mic Button */}
          <div className="flex flex-col items-center justify-center py-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="relative mb-3">
              {isListening && (
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></div>
              )}
              {isSpeaking && (
                <div className="absolute inset-0 rounded-full bg-amber-400 animate-audio-pulse opacity-60"></div>
              )}
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                  isListening
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : isSpeaking
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {isListening ? <MicOff className="w-9 h-9" /> : <Mic className="w-9 h-9" />}
              </button>
            </div>

            <div className="text-center font-medium text-sm">
              {isListening ? (
                <span className="text-emerald-700 flex items-center gap-1.5 font-semibold">
                  <Radio className="w-4 h-4 animate-pulse text-red-500" />
                  {t('voice.listening')}
                </span>
              ) : isSpeaking ? (
                <span className="text-amber-700 flex items-center gap-1.5 font-semibold">
                  <Volume2 className="w-4 h-4 animate-bounce text-amber-600" />
                  Speaking agricultural advice...
                </span>
              ) : (
                <span className="text-slate-600">{t('voice.tapToSpeak')}</span>
              )}
            </div>

            {transcript && (
              <div className="mt-2 text-xs text-slate-500 italic max-w-sm text-center px-4">
                "{transcript}"
              </div>
            )}
          </div>

          {/* Assistant Answer Box */}
          {(assistantResponse || isLoading) && (
            <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  KrishiMitra AI Advisory
                </span>
                {assistantResponse && !isLoading && (
                  <button
                    onClick={() => isSpeaking ? stopSpeaking() : speak(assistantResponse)}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-medium flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-emerald-200"
                  >
                    {isSpeaking ? <VolumeX className="w-3 h-3 text-red-600" /> : <Volume2 className="w-3 h-3 text-emerald-700" />}
                    {isSpeaking ? t('common.audioStop') : t('common.audioListen')}
                  </button>
                )}
              </div>

              {isLoading ? (
                <div className="flex items-center gap-2 py-3 text-sm text-emerald-800">
                  <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('voice.processing')}</span>
                </div>
              ) : (
                <div className="text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                  {assistantResponse}
                </div>
              )}
            </div>
          )}

          {/* Quick Prompts */}
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              {t('voice.quickPromptsTitle')}
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {[t('voice.sampleQ1'), t('voice.sampleQ2'), t('voice.sampleQ3'), t('voice.sampleQ4')].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(q)}
                  className="text-left text-xs bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 p-2.5 rounded-lg border border-slate-200 transition-colors"
                >
                  🌾 {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Text Input Footer */}
        <form onSubmit={handleSendText} className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={language === 'pa' ? "ਜਾਂ ਇੱਥੇ ਆਪਣਾ ਸਵਾਲ ਲਿਖੋ..." : language === 'hi' ? "या यहाँ अपना सवाल लिखें..." : "Or type your farming question here..."}
            className="flex-1 text-sm bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
