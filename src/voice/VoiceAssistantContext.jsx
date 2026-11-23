import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { askGeminiAgronomyAdvisor } from '../services/geminiService';

const VoiceAssistantContext = createContext();

export const VoiceAssistantProvider = ({ children }) => {
  const { language, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('both'); // 'both', 'voice', 'text'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recognitionRef = useRef(null);
  const speechSynthRef = useRef(null);

  // Initialize SpeechSynthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
    }
  }, []);

  // Map app language to BCP 47 speech tags
  const getSpeechLangCode = (lang) => {
    switch (lang) {
      case 'pa': return 'pa-IN';
      case 'hi': return 'hi-IN';
      case 'en': return 'en-IN';
      default: return 'en-IN';
    }
  };

  // Text-to-Speech function
  const speak = (text, customLang = null) => {
    if (mode === 'text') return; // User chose Text Only
    if (!speechSynthRef.current || !text) return;

    speechSynthRef.current.cancel(); // Stop any ongoing speech

    const langCode = getSpeechLangCode(customLang || language);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.95; // slightly slower for better clarity
    utterance.pitch = 1.0;

    // Pick best matching voice if available
    const voices = speechSynthRef.current.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langCode.substring(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Start Speech Recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or type your question.");
      return;
    }

    stopSpeaking();
    setTranscript('');

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = getSpeechLangCode(language);
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition", err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Handle Question Answering (Voice or Text)
  const askQuestion = async (queryText) => {
    if (!queryText.trim()) return;
    setIsLoading(true);
    setTranscript(queryText);
    try {
      const answer = await askGeminiAgronomyAdvisor(queryText, language);
      setAssistantResponse(answer);
      if (mode === 'both' || mode === 'voice') {
        speak(answer);
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg = language === 'pa' 
        ? "ਮਾਫ ਕਰਨਾ, ਕੁਝ ਤਕਨੀਕੀ ਖਰਾਬੀ ਆਈ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।"
        : language === 'hi' 
        ? "क्षमा करें, कुछ तकनीकी समस्या आई है। कृपया पुनः प्रयास करें।"
        : "Sorry, a technical issue occurred. Please try again.";
      setAssistantResponse(`${fallbackMsg}\n(${err.message})`);
      speak(fallbackMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VoiceAssistantContext.Provider
      value={{
        isListening,
        isSpeaking,
        transcript,
        assistantResponse,
        isLoading,
        mode,
        setMode,
        isModalOpen,
        setIsModalOpen,
        startListening,
        stopListening,
        speak,
        stopSpeaking,
        askQuestion,
        setAssistantResponse,
        setTranscript,
      }}
    >
      {children}
    </VoiceAssistantContext.Provider>
  );
};

export const useVoiceAssistant = () => useContext(VoiceAssistantContext);
