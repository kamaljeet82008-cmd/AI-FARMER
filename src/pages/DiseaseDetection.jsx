import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bug, 
  Upload, 
  Camera, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Phone, 
  ShieldAlert, 
  Leaf, 
  History, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import { diagnoseCropDiseaseImage } from '../services/geminiService';
import { 
  getDiseaseHistory, 
  saveDiseaseDiagnosis 
} from '../firebase/offlineStorage';

export const DiseaseDetection = () => {
  const { t, language } = useLanguage();

  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [history, setHistory] = useState(() => getDiseaseHistory());

  // Handle Image Upload via input
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;
      setSelectedImage(base64Data);
      runDiagnosis(base64Data, null);
    };
    reader.readAsDataURL(file);
  };

  // Run Sample disease test
  const handleTestSample = async (sampleKey, sampleName) => {
    setSelectedImage(`sample_${sampleKey}`);
    runDiagnosis(null, sampleKey);
  };

  const runDiagnosis = async (imageData, sampleType) => {
    setAnalyzing(true);
    setDiagnosis(null);
    setErrorMsg('');
    try {
      const result = await diagnoseCropDiseaseImage(imageData, sampleType, language);
      setDiagnosis(result);

      // Save to scan history
      const saved = saveDiseaseDiagnosis({
        diseaseName: result.diseaseName,
        confidence: result.confidence,
        expertRequired: result.expertRequired
      });
      setHistory(saved);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message === 'NO_KEY'
        ? 'AI key not set. Add VITE_OPENROUTER_API_KEY (or VITE_GEMINI_API_KEY) in the .env file and restart npm run dev.'
        : `AI analysis failed: ${err.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 05 • Multimodal AI
            </span>
            <AudioSpeaker textToRead={`${t('disease.title')}. ${t('disease.subtitle')}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('disease.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('disease.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/expert-finder"
            className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Connect with KVK Expert</span>
          </Link>
        </div>
      </div>

      {/* Upload & Sample Testing Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="border-2 border-dashed border-rose-300 rounded-3xl p-6 sm:p-10 bg-rose-50/30 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm">
            <Bug className="w-8 h-8" />
          </div>

          <div>
            <h3 className="font-black text-lg text-slate-900">
              {t('disease.uploadPrompt')}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Supports photos of leaves, stems, roots, or fruits. For high accuracy, take photos in natural day light.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95">
              <Upload className="w-4 h-4" />
              <span>Choose Photo from Device</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95">
              <Camera className="w-4 h-4" />
              <span>{t('disease.takePhoto')}</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* 1-Click Sample Disease Photos */}
        <div>
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
            {t('disease.samplePhotosTitle')}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleTestSample('yellow_rust', 'Wheat Yellow Rust')}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-left transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">🌾 {t('disease.sampleWheatRust')}</div>
                <div className="text-[10px] text-slate-500">Wheat (Puccinia striiformis)</div>
              </div>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </button>

            <button
              onClick={() => handleTestSample('early_blight', 'Tomato Early Blight')}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-300 text-left transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">🍅 {t('disease.sampleTomatoBlight')}</div>
                <div className="text-[10px] text-slate-500">Tomato / Potato (Alternaria solani)</div>
              </div>
              <Sparkles className="w-4 h-4 text-rose-500" />
            </button>

            <button
              onClick={() => handleTestSample('cotton_curl', 'Cotton Leaf Curl')}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">☁️ {t('disease.sampleCottonCurl')}</div>
                <div className="text-[10px] text-slate-500">Cotton (Begomovirus)</div>
              </div>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      {errorMsg && !analyzing && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 text-sm">{errorMsg}</div>
      )}

      {analyzing && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3 shadow-md animate-pulse">
          <div className="w-12 h-12 mx-auto border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="font-extrabold text-slate-900 text-sm">
            {t('disease.analyzing')}
          </div>
          <p className="text-xs text-slate-500">
            Scanning leaf surface for fungal spores, lesions, chlorosis, and insect vectors...
          </p>
        </div>
      )}

      {/* AI DIAGNOSTIC REPORT CARD */}
      {diagnosis && !analyzing && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-xl space-y-6 animate-fade-in">
          {/* Diagnostic Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t('disease.diagnosisResult')}
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {t('disease.confidence')}: <strong className="text-emerald-700">{diagnosis.confidence}</strong>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {diagnosis.diseaseName}
              </h2>
              <div className="text-xs font-semibold text-rose-700 mt-0.5">
                Pathogen: {diagnosis.pathogen}
              </div>
            </div>

            <AudioSpeaker textToRead={`${diagnosis.diseaseName}. Symptoms: ${diagnosis.symptoms}. Recommended chemical treatment: ${diagnosis.chemicalTreatment}. Organic treatment: ${diagnosis.organicTreatment}`} />
          </div>

          {/* 2-Column Details: Symptoms & Causes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
              <div className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>{t('disease.symptoms')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {diagnosis.symptoms}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
              <div className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>{t('disease.causes')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {diagnosis.causes}
              </p>
            </div>
          </div>

          {/* Treatment Recommendations (Organic & Chemical) */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Trusted Agricultural Cure & Dosage Guidance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organic Treatment */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-1.5">
                <div className="text-xs font-bold text-emerald-900 uppercase">
                  🌿 {t('disease.organicTreatment')}
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                  {diagnosis.organicTreatment}
                </p>
              </div>

              {/* Chemical Treatment */}
              <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 space-y-1.5">
                <div className="text-xs font-bold text-rose-900 uppercase">
                  🧪 {t('disease.chemicalTreatment')}
                </div>
                <p className="text-xs sm:text-sm text-rose-950 leading-relaxed font-medium">
                  {diagnosis.chemicalTreatment}
                </p>
              </div>
            </div>
          </div>

          {/* Preventive Steps */}
          {diagnosis.preventiveSteps && diagnosis.preventiveSteps.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase">
                {t('disease.preventiveSteps')}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {diagnosis.preventiveSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expert Inspection Callout */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-extrabold text-purple-950 text-sm">
                {t('disease.expertRequired')}: <span className="text-purple-700 font-black">{diagnosis.expertRequired ? 'Yes, Physical Inspection Recommended' : 'No, Manageable by Farmer'}</span>
              </div>
              <p className="text-xs text-purple-800 mt-0.5">
                {diagnosis.expertAdvice}
              </p>
            </div>

            <Link
              to="/expert-finder"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs whitespace-nowrap active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t('disease.consultExpertBtn')}</span>
            </Link>
          </div>
        </div>
      )}

      {/* Scan History Log */}
      {history.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              <span>{t('disease.pastScans')}</span>
            </h2>
          </div>

          <div className="space-y-2">
            {history.slice(0, 4).map(item => (
              <div key={item.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{item.diseaseName}</div>
                  <div className="text-[11px] text-slate-500">Confidence: {item.confidence}</div>
                </div>
                <span className="text-slate-400 font-medium text-[11px]">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <DisclaimerBadge customMessage={t('disease.disclaimer')} />
    </div>
  );
};
