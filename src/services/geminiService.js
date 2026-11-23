// Google Gemini API Agronomy & Multimodal Vision Service
// Includes intelligent offline agronomic fallback engine for zero downtime

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
// OpenRouter (free models, no card). If this key is set it is used instead of Gemini.
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
// 'openrouter/free' auto-picks a free model that can read images. Override in .env if you like.
const OPENROUTER_MODELS = [
  import.meta.env.VITE_OPENROUTER_MODEL,
  'openrouter/free',
].filter(Boolean);
const HAS_AI_KEY = Boolean(GEMINI_API_KEY || OPENROUTER_API_KEY);
// Model names change often. Set VITE_GEMINI_MODEL in .env to override (see ai.google.dev/gemini-api/docs/models).
const MODELS = [
  import.meta.env.VITE_GEMINI_MODEL,
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-2.5-flash',
].filter(Boolean);

export const isGeminiConfigured = () => HAS_AI_KEY;

// Calls Gemini; tries the next model if one is not found / retired. Throws a readable Error on failure.
const callGoogle = async (parts, { json = false, system } = {}) => {
  let lastErr = new Error('Gemini request failed');
  for (const model of MODELS) {
    try {
      const body = { contents: [{ role: 'user', parts }] };
      if (system) body.systemInstruction = { parts: [{ text: system }] };
      if (json) body.generationConfig = { responseMimeType: 'application/json' };
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        const msg = j?.error?.message || `HTTP ${res.status}`;
        lastErr = new Error(`[${model}] ${msg}`);
        console.warn('Gemini error', lastErr.message);
        if (res.status === 404) continue; // model retired/unknown: try next
        throw lastErr;                     // key/quota/safety errors: stop
      }
      const data = await res.json();
      const text = (data.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
      if (!text) throw new Error('Gemini returned an empty answer');
      return text;
    } catch (e) {
      lastErr = e;
      if (!String(e.message).includes('404')) throw e;
    }
  }
  throw lastErr;
};

// Calls OpenRouter (OpenAI-style chat API). Accepts the same "parts" format used for Gemini.
const callOpenRouter = async (parts, { system } = {}) => {
  const content = parts.map(p => p.inline_data
    ? { type: 'image_url', image_url: { url: `data:${p.inline_data.mime_type};base64,${p.inline_data.data}` } }
    : { type: 'text', text: p.text });
  const hasImage = parts.some(p => p.inline_data);
  let lastErr = new Error('OpenRouter request failed');
  for (const model of OPENROUTER_MODELS) {
    try {
      const messages = [];
      if (system) messages.push({ role: 'system', content: system });
      messages.push({ role: 'user', content: hasImage ? content : content.map(c => c.text).join('\n') });
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'X-Title': 'KrishiMitra AI',
        },
        body: JSON.stringify({ model, messages }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = j?.error?.message || `HTTP ${res.status}`;
        lastErr = new Error(`[${model}] ${msg}`);
        console.warn('OpenRouter error', lastErr.message);
        if (res.status === 404) continue;
        throw lastErr;
      }
      const text = (j.choices?.[0]?.message?.content || '').trim();
      if (!text) throw new Error('OpenRouter returned an empty answer');
      return text;
    } catch (e) {
      lastErr = e;
      if (!String(e.message).includes('404')) throw e;
    }
  }
  throw lastErr;
};

// Uses OpenRouter if its key is set, otherwise Google Gemini.
const callGemini = (parts, opts) => (OPENROUTER_API_KEY ? callOpenRouter(parts, opts) : callGoogle(parts, opts));

// Shrinks big phone photos (max 1280px) so upload is fast; returns { mime, data }
const prepareImage = (dataUrl) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => {
    const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
    const c = document.createElement('canvas');
    c.width = Math.round(img.width * scale);
    c.height = Math.round(img.height * scale);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    resolve({ mime: 'image/jpeg', data: c.toDataURL('image/jpeg', 0.85).split(',')[1] });
  };
  img.onerror = () => resolve({ mime: (dataUrl.match(/^data:(.*?);/) || [])[1] || 'image/jpeg', data: dataUrl.split('base64,')[1] });
  img.src = dataUrl;
});

const SAFETY_SYSTEM = `You are KrishiMitra AI, an assistant for Indian farmers. You are not a certified expert.
Never claim a diagnosis is certain. State uncertainty. For any pesticide, tell the farmer to confirm product, dose and safety period with the product label and the local KVK / agriculture officer before use. Keep language simple.`;

// Built-in Knowledge Base for Instant Image Diagnostic Analysis
const SAMPLE_DISEASE_PROFILES = {
  yellow_rust: {
    diseaseName: 'Yellow Rust / Stripe Rust of Wheat (ਪੀਲੀ ਕੁੰਗੀ / पीला रतुआ)',
    pathogen: 'Puccinia striiformis f. sp. tritici (Fungus)',
    confidence: '94%',
    symptoms: 'Narrow, yellow, stripe-like pustules arranged in linear rows along the veins on leaf surfaces. Yellow powdery spores rub off on fingers or white cloth.',
    causes: 'Cool temperature (10°C - 18°C) accompanied by high humidity, prolonged fog, and dew. Airborne fungal spores carried from foothills.',
    preventiveSteps: [
      'Grow rust-resistant varieties like PBW 826, HD 3086, or DBW 187.',
      'Avoid late sowing of wheat in sub-mountainous and sensitive zones.',
      'Refrain from excessive application of nitrogenous fertilizers (Urea) which makes leaves soft and prone.'
    ],
    organicTreatment: 'Spray 5% fermented butter-milk (khatti lassi) or cow urine extract (10%) with neem seed kernel extract (NSKE 5%) in early stages.',
    chemicalTreatment: 'Spray Propiconazole 25% EC (Tilt 25 EC / Bumper) @ 200 ml in 200 liters of water per acre immediately upon sighting first pustule. Repeat after 15 days if cloudy weather persists.',
    expertRequired: true,
    expertAdvice: 'Recommended to notify local KVK or Block Agriculture Officer for regional surveillance.'
  },
  early_blight: {
    diseaseName: 'Early Blight of Tomato / Potato (ਅਗੇਤਾ ਝੁਲਸਾ / अगेती झुलसा)',
    pathogen: 'Alternaria solani (Fungal pathogen)',
    confidence: '92%',
    symptoms: 'Dark brown to black necrotic spots with concentric rings ("target board" appearance) on older lower leaves. Surrounding tissue turns chlorotic yellow.',
    causes: 'Warm temperatures (24°C - 30°C) with alternating wet and dry weather, heavy morning dew, and stressed plants with low potassium.',
    preventiveSteps: [
      'Maintain adequate spacing for cross ventilation; stake plants to keep leaves off the ground.',
      'Practice crop rotation avoiding Solanaceous crops (potato, brinjal, tomato) for 2 years.',
      'Water plants at base using drip irrigation; avoid overhead sprinkler watering.'
    ],
    organicTreatment: 'Soil drenching and foliar spray of Trichoderma harzianum or Pseudomonas fluorescens @ 10g/liter of water; neem oil 3000 ppm @ 3ml/liter.',
    chemicalTreatment: 'Foliar spray with Mancozeb 75% WP (Dithane M-45) @ 600g/acre or Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 200ml/acre in 150 liters water.',
    expertRequired: false,
    expertAdvice: 'Manageable with timely fungicide application. Consult expert if stem lesions develop.'
  },
  cotton_curl: {
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV) (ਪੱਤਾ ਮਰੋੜ ਰੋਗ / पत्ता मरोड़ रोग)',
    pathogen: 'Cotton Leaf Curl Begomovirus transmitted by Whitefly (Bemisia tabaci)',
    confidence: '91%',
    symptoms: 'Upward or downward curling of leaf margins, thickening of primary and secondary veins, enation (cup-like leaf outgrowth) on the underside of leaves, stunted plant height.',
    causes: 'High whitefly vector population during June-August, presence of alternate weed hosts like Kanghi buti and Peeli buti on field borders.',
    preventiveSteps: [
      'Destroy weed hosts (Abutilon indicum, Parthenium) along field bunds and water channels.',
      'Install yellow sticky traps @ 20-25 traps per acre to monitor and trap whitefly adults.',
      'Never spray synthetic pyrethroids early in the season as they flare up whitefly resistance.'
    ],
    organicTreatment: 'Spray 5% Neem Seed Kernel Extract (NSKE) or Neem-based formulation (Azadirachtin 10,000 ppm) @ 2.5ml per liter.',
    chemicalTreatment: 'Control the vector: Spray Afidopyropen 50 g/l DC (Sefina) @ 400ml/acre or Diafenthiuron 50% WP (Pegasus) @ 250g/acre using hollow cone nozzle.',
    expertRequired: true,
    expertAdvice: 'Urgent notification to PAU / Central Institute for Cotton Research (CICR) recommended.'
  },
  general_nutrient_deficiency: {
    diseaseName: 'Zinc & Nitrogen Deficiency / Physiological Chlorosis',
    pathogen: 'Nutrient Imbalance / Soil Salinity',
    confidence: '88%',
    symptoms: 'Interveinal yellowing of middle and upper leaves, pale green canopy, reduced tillering, delayed flowering.',
    causes: 'Alkaline soil (pH > 8.0) locking up micronutrients, cold wet roots, low organic carbon in soil.',
    preventiveSteps: [
      'Conduct regular soil health tests every 2 years.',
      'Incorporate 4-5 tonnes well-decomposed Farm Yard Manure (FYM) or green manure (Dhaincha).'
    ],
    organicTreatment: 'Foliar spray of Jeevamrut (5%) or enriched vermicompost wash every 15 days.',
    chemicalTreatment: 'Foliar spray: 1 kg Zinc Sulphate (21%) + 1 kg unslaked lime (or 2.5 kg Urea) dissolved in 100 liters water per acre.',
    expertRequired: false,
    expertAdvice: 'Get soil tested at nearest KVK soil lab.'
  }
};

// Multimodal Disease Diagnosis
// - sampleType: built-in demo samples (clearly demo data, no API call)
// - real photo: needs Gemini. If Gemini fails, an Error is thrown (we never show a fake diagnosis).
export const diagnoseCropDiseaseImage = async (imageFileOrBase64, sampleType = null, language = 'pa') => {
  if (sampleType && SAMPLE_DISEASE_PROFILES[sampleType]) {
    await new Promise(r => setTimeout(r, 600));
    return { ...SAMPLE_DISEASE_PROFILES[sampleType], isSample: true };
  }

  if (!HAS_AI_KEY) {
    throw new Error('NO_KEY');
  }

  const langName = language === 'pa' ? 'Punjabi' : language === 'hi' ? 'Hindi' : 'English';
  const img = await prepareImage(imageFileOrBase64);

  const prompt = `Analyze this plant photo (leaf, stem, root, fruit or whole plant) from an Indian farm.
If the image is not a plant, or is too blurry/unclear, set "diseaseName" to a short "Cannot identify from this photo" message and "confidence" to "Low".
Write all text values in simple ${langName}. Return ONLY JSON with these fields:
{
  "diseaseName": "possible disease/pest/problem and crop",
  "pathogen": "likely cause (fungus, virus, insect, nutrient deficiency...) or 'Unknown'",
  "confidence": "Low, Medium or High (honest estimate, never over-claim)",
  "symptoms": "visible symptoms you actually see in the photo",
  "causes": "possible causes",
  "preventiveSteps": ["step 1", "step 2", "step 3"],
  "organicTreatment": "general organic/bio options",
  "chemicalTreatment": "general treatment options from trusted agricultural sources; tell farmer to confirm product and dose with label or KVK",
  "expertRequired": true or false,
  "expertAdvice": "when to call an expert / KVK"
}`;

  const text = await callGemini(
    [{ text: prompt }, { inline_data: { mime_type: img.mime, data: img.data } }],
    { json: true, system: SAFETY_SYSTEM }
  );
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('Could not read Gemini answer');
  const out = JSON.parse(m[0]);
  if (!Array.isArray(out.preventiveSteps)) out.preventiveSteps = [];
  return out;
};

// Conversational Voice / Text Agronomy Advisor
export const askGeminiAgronomyAdvisor = async (question, language = 'pa') => {
  if (HAS_AI_KEY) {
    const langName = language === 'pa' ? 'Punjabi' : language === 'hi' ? 'Hindi' : 'English';
    // Errors are thrown on purpose so the user sees that AI failed instead of a fake canned answer.
    return await callGemini(
      [{ text: `Answer in simple, short ${langName} (max 3-4 short paragraphs), practical for a farmer. Do not invent today's mandi prices or weather; say they should check the Market and Alerts pages or official sources.\nQuestion: "${question}"` }],
      { system: SAFETY_SYSTEM }
    );
  }

  // Offline Agronomic Rule Engine
  await new Promise(r => setTimeout(r, 700));
  const q = question.toLowerCase();

  if (q.includes('ਕਣਕ') || q.includes('गेहूं') || q.includes('wheat') || q.includes('ਕੁੰਗੀ') || q.includes('रतुआ') || q.includes('rust')) {
    if (language === 'pa') {
      return "ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦੀ ਰੋਕਥਾਮ ਲਈ, ਜਿਵੇਂ ਹੀ ਪੱਤਿਆਂ 'ਤੇ ਪੀਲੀਆਂ ਧਾਰੀਆਂ ਦਿਖਣ, ਤੁਰੰਤ 200 ਮਿਲੀਲਿਟਰ ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25% ਈਸੀ (ਟਿਲਟ) ਨੂੰ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ ਪ੍ਰਤੀ ਏਕੜ ਸਪਰੇਅ ਕਰੋ। ਖਾਦਾਂ ਵਿੱਚ ਯੂਰੀਆ ਜ਼ਿਆਦਾ ਨਾ ਪਾਓ। ਅਗਲੀ ਵਾਰ PBW 826 ਜਾਂ HD 3086 ਬੀਜੋ ਜੋ ਕੁੰਗੀ ਰੋਧਕ ਹਨ।";
    } else if (language === 'hi') {
      return "गेहूं में पीला रतुआ दिखने पर तुरंत प्रोपिकोनाजोल 25% EC (टिल्ट) की 200 मिली मात्रा 200 लीटर पानी में मिलाकर प्रति एकड़ छिड़काव करें। यदि 15 दिन बाद भी मौसम बादलों वाला रहे तो दोबारा छिड़कें। भविष्य के लिए PBW 826 या HD 3086 जैसी रोग प्रतिरोधी किस्में लगाएं।";
    } else {
      return "For Yellow Rust in wheat, immediately spray Propiconazole 25% EC (Tilt) @ 200ml in 200 liters of water per acre as soon as yellow powdery stripes appear. Avoid excess urea. For future sowings, opt for resistant varieties like PBW 826 or DBW 187.";
    }
  }

  if (q.includes('ਸਰ੍ਹੋਂ') || q.includes('सरसों') || q.includes('mustard') || q.includes('ਖਾਦ') || q.includes('fertilizer')) {
    if (language === 'pa') {
      return "ਸਰ੍ਹੋਂ ਲਈ ਸਿੰਗਲ ਸੁਪਰ ਫਾਸਫੇਟ (SSP) ਸਭ ਤੋਂ ਉੱਤਮ ਹੈ ਕਿਉਂਕਿ ਇਸ ਵਿੱਚ 12% ਗੰਧਕ (ਸਲਫਰ) ਹੁੰਦਾ ਹੈ ਜੋ ਤੇਲ ਦੀ ਮਾਤਰਾ ਵਧਾਉਂਦਾ ਹੈ। ਬਿਜਾਈ ਵੇਲੇ 100 ਕਿਲੋ ਐਸ.ਐਸ.ਪੀ., 25 ਕਿਲੋ ਯੂਰੀਆ ਅਤੇ 10 ਕਿਲੋ ਜ਼ਿੰਕ ਸਲਫੇਟ ਪ੍ਰਤੀ ਏਕੜ ਪਾਓ। ਪਹਿਲੇ ਪਾਣੀ (30 ਦਿਨ) 'ਤੇ 25 ਕਿਲੋ ਯੂਰੀਆ ਹੋਰ ਪਾਓ।";
    } else if (language === 'hi') {
      return "सरसों की फसल के लिए सिंगल सुपर फास्फेट (SSP) सबसे लाभकारी खाद है, क्योंकि इसमें 12% सल्फर होता है जिससे दानों में तेल प्रतिशत बढ़ता है। बुवाई पर 100 किलो SSP, 25 किलो यूरिया व 10 किलो जिंक प्रति एकड़ दें। पहली सिंचाई पर 25 किलो यूरिया टॉप ड्रेस करें।";
    } else {
      return "For Mustard, Single Super Phosphate (SSP) is superior as it provides essential sulphur for higher oil content. Apply 100 kg SSP, 25 kg Urea, and 10 kg Zinc per acre at sowing. Top dress 25 kg Urea after the first irrigation around 30 days.";
    }
  }

  if (q.includes('ਮੰਡੀ') || q.includes('मंडी') || q.includes('mandi') || q.includes('ਭਾਅ') || q.includes('price')) {
    // No invented prices: the offline engine never states "today's" rates.
    if (language === 'pa') return "ਮੰਡੀ ਦੇ ਭਾਅ ਹਰ ਰੋਜ਼ ਬਦਲਦੇ ਹਨ। ਤਾਜ਼ਾ ਭਾਅ ਅਤੇ ਕਿਰਾਇਆ ਕੱਢ ਕੇ ਸ਼ੁੱਧ ਮੁਨਾਫਾ ਦੇਖਣ ਲਈ 'ਮੰਡੀ ਸਹਾਇਕ' ਪੇਜ ਵੇਖੋ, ਜਾਂ ਆਪਣੀ ਨੇੜਲੀ ਮੰਡੀ ਦੇ ਆੜ੍ਹਤੀ ਨਾਲ ਗੱਲ ਕਰੋ।";
    if (language === 'hi') return "मंडी के भाव रोज बदलते हैं। ताजा भाव और भाड़ा जोड़कर शुद्ध बचत देखने के लिए 'मंडी सहायक' पेज देखें, या अपनी नजदीकी मंडी में पूछें।";
    return "Mandi prices change every day. Open the Mandi & Selling page to compare prices and transport cost, or ask your nearest mandi directly.";
  }

  // General helpful response
  if (language === 'pa') {
    return "ਕ੍ਰਿਸ਼ੀਮਿੱਤਰ AI ਤੁਹਾਡਾ ਸੁਆਗਤ ਕਰਦਾ ਹੈ। ਤੁਸੀਂ ਜ਼ਮੀਨ ਦੇ ਮੁਲਾਂਕਣ, ਫਸਲ ਯੋਜਨਾਬੰਦੀ, ਬੀਜਾਂ ਦੀ ਚੋਣ, ਕੀੜੇ-ਬਿਮਾਰੀਆਂ ਦੀ ਰੋਕਥਾਮ ਜਾਂ ਮੰਡੀ ਦੇ ਭਾਵਾਂ ਬਾਰੇ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛ ਸਕਦੇ ਹੋ।";
  } else if (language === 'hi') {
    return "कृषिमित्र AI में आपका स्वागत है। आप अपनी जमीन के हिसाब से फसल योजना, प्रमाणित बीज, रोग-कीट उपचार या मंडी भाव के बारे में कोई भी प्रश्न पूछ सकते हैं।";
  } else {
    return "Welcome to KrishiMitra AI. You can ask any question regarding crop planning, soil health, certified seeds, disease treatment, or nearby mandi prices.";
  }
};
