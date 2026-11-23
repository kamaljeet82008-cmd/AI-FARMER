import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Mic } from 'lucide-react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { VoiceAssistantProvider, useVoiceAssistant } from './voice/VoiceAssistantContext';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VoiceAssistantModal } from './voice/VoiceAssistantModal';

// Pages
import { Home } from './pages/Home';
import { LandAssessment } from './pages/LandAssessment';
import { CropPlanner } from './pages/CropPlanner';
import { SeedFinder } from './pages/SeedFinder';
import { CropGuide } from './pages/CropGuide';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { ExpertFinder } from './pages/ExpertFinder';
import { MarketSelling } from './pages/MarketSelling';
import { ValueAddition } from './pages/ValueAddition';
import { CropAlerts } from './pages/CropAlerts';
import { ProfitDashboard } from './pages/ProfitDashboard';

// Floating Quick Mic Launcher for Farmer Convenience
const FloatingVoiceButton = () => {
  const { setIsModalOpen, isListening, isSpeaking } = useVoiceAssistant();
  const { language } = useLanguage();

  return (
    <button
      onClick={() => setIsModalOpen(true)}
      title="Ask KrishiMitra Voice Assistant"
      className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl flex items-center gap-2.5 transition-all active:scale-90 ${
        isListening || isSpeaking
          ? 'bg-amber-500 text-white animate-bounce ring-4 ring-amber-300'
          : 'bg-emerald-600 hover:bg-emerald-700 text-white ring-4 ring-emerald-300/40 hover:ring-emerald-400'
      }`}
    >
      <Mic className="w-6 h-6" />
      <span className="hidden md:inline font-black text-xs pr-1">
        {language === 'pa' ? 'ਬੋਲ ਕੇ ਪੁੱਛੋ' : language === 'hi' ? 'बोलकर पूछें' : 'Voice Assistant'}
      </span>
    </button>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
      <VoiceAssistantProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
            <Navbar />
            
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/land-assessment" element={<ProtectedRoute><LandAssessment /></ProtectedRoute>} />
                <Route path="/crop-planner" element={<ProtectedRoute><CropPlanner /></ProtectedRoute>} />
                <Route path="/seed-finder" element={<ProtectedRoute><SeedFinder /></ProtectedRoute>} />
                <Route path="/crop-guide" element={<ProtectedRoute><CropGuide /></ProtectedRoute>} />
                <Route path="/disease-detection" element={<ProtectedRoute><DiseaseDetection /></ProtectedRoute>} />
                <Route path="/expert-finder" element={<ProtectedRoute><ExpertFinder /></ProtectedRoute>} />
                <Route path="/market-selling" element={<ProtectedRoute><MarketSelling /></ProtectedRoute>} />
                <Route path="/value-addition" element={<ProtectedRoute><ValueAddition /></ProtectedRoute>} />
                <Route path="/crop-alerts" element={<ProtectedRoute><CropAlerts /></ProtectedRoute>} />
                <Route path="/profit-dashboard" element={<ProtectedRoute><ProfitDashboard /></ProtectedRoute>} />
              </Routes>
            </main>

            <FloatingVoiceButton />
            <VoiceAssistantModal />
            <Footer />
          </div>
        </Router>
      </VoiceAssistantProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
