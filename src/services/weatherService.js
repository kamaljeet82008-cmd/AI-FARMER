// Agricultural Weather Advisory & Alert Service

export const getWeatherData = (district = 'Ludhiana') => {
  return {
    location: `${district}, Punjab`,
    current: {
      temp: 24,
      condition: 'Partly Sunny / Pleasant',
      conditionHi: 'हल्की धूप व अनुकूल मौसम',
      conditionPa: 'ਹਲਕੀ ਧੁੱਪ ਅਤੇ ਸੁਹਾਵਣਾ ਮੌਸਮ',
      icon: '⛅',
      humidity: 58, // %
      rainProbability: 10, // %
      windSpeed: 12, // km/h
      soilMoisture: 'Adequate (64%)'
    },
    forecast5Day: [
      { day: 'Mon', tempMax: 26, tempMin: 12, rain: 5, icon: '☀️', condition: 'Clear Sky' },
      { day: 'Tue', tempMax: 25, tempMin: 11, rain: 15, icon: '⛅', condition: 'Passing Clouds' },
      { day: 'Wed', tempMax: 23, tempMin: 13, rain: 65, icon: '🌧️', condition: 'Moderate Rain Expected' },
      { day: 'Thu', tempMax: 22, tempMin: 10, rain: 40, icon: '🌦️', condition: 'Scattered Showers' },
      { day: 'Fri', tempMax: 24, tempMin: 9, rain: 5, icon: '🌤️', condition: 'Clear, Cool Night' }
    ],
    alerts: [
      {
        id: 'alert-1',
        type: 'rainWarning',
        severity: 'severityHigh',
        titleEn: 'Rainfall Advisory (Wednesday Afternoon)',
        titleHi: 'बुधवार दोपहर भारी वर्षा की चेतावनी',
        titlePa: 'ਬੁੱਧਵਾਰ ਦੁਪਹਿਰ ਮੀਂਹ ਦੀ ਚਿਤਾਵਨੀ',
        messageEn: '65% probability of moderate thundershowers with gusty winds (35 km/h) on Wednesday. Immediately postpone all scheduled urea top-dressing and chemical sprays.',
        messageHi: 'बुधवार को 35 किमी/घंटा की रफ्तार से हवाएं और 65% वर्षा की संभावना। सभी प्रकार के कीटनाशक छिड़काव और यूरिया डालने का कार्य तुरंत टालें।',
        messagePa: 'ਬੁੱਧਵਾਰ ਨੂੰ 35 ਕਿਲੋਮੀਟਰ ਦੀ ਰਫਤਾਰ ਨਾਲ ਤੇਜ਼ ਹਵਾਵਾਂ ਅਤੇ 65% ਮੀਂਹ ਪੈਣ ਦੇ ਆਸਾਰ ਹਨ। ਯੂਰੀਆ ਖਾਦ ਪਾਉਣ ਅਤੇ ਕੋਈ ਵੀ ਸਪਰੇਅ ਕਰਨ ਦਾ ਕੰਮ ਤੁਰੰਤ ਰੋਕ ਦਿਓ।',
        actionRequiredEn: 'Clear field drainage channels; protect open harvested produce or stored bags.',
        actionRequiredHi: 'खेत की जल निकासी नालियां साफ रखें; खलिहान में रखे अनाज को तिरपाल से ढकें।',
        actionRequiredPa: 'ਖੇਤਾਂ ਵਿੱਚੋਂ ਪਾਣੀ ਕੱਢਣ ਵਾਲੀਆਂ ਖਾਲਾਂ ਸਾਫ ਕਰੋ; ਖੁੱਲ੍ਹੇ ਵਿੱਚ ਪਏ ਦਾਣਿਆਂ ਨੂੰ ਤਰਪਾਲ ਨਾਲ ਢੱਕੋ।'
      },
      {
        id: 'alert-2',
        type: 'pestWarning',
        severity: 'severityMedium',
        titleEn: 'Yellow Rust Surveillance Notice (Foothill & Canal Belts)',
        titleHi: 'पीला रतुआ निगरानी सूचना (नहर व कंडी क्षेत्र)',
        titlePa: 'ਪੀਲੀ ਕੁੰਗੀ ਦੀ ਨਿਗਰਾਨੀ ਸੂਚਨਾ (ਨਹਿਰੀ ਅਤੇ ਕੰਡੀ ਇਲਾਕੇ)',
        messageEn: 'State Agriculture Department reports initial yellow rust spores in moist pockets. Regularly inspect under-leaf surfaces in wheat crops.',
        messageHi: 'कृषि विभाग ने नम व ठंडे इलाकों में पीले रतुए के शुरुआती लक्षण दर्ज किए हैं। गेहूं की पत्तियों की नियमित जांच करें।',
        messagePa: 'ਖੇਤੀਬਾੜੀ ਵਿਭਾਗ ਵੱਲੋਂ ਠੰਢੇ ਅਤੇ ਸਿੱਲ੍ਹੇ ਖੇਤਾਂ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦੇ ਸ਼ੁਰੂਆਤੀ ਲੱਛਣ ਦੇਖੇ ਗਏ ਹਨ। ਕਣਕ ਦੇ ਪੱਤਿਆਂ ਦੀ ਹੇਠਲੀ ਸਤ੍ਹਾ ਰੋਜ਼ਾਨਾ ਚੈੱਕ ਕਰੋ।',
        actionRequiredEn: 'Keep Propiconazole 25% EC (Tilt) in standby; report sightings to KVK.',
        actionRequiredHi: 'टिल्ट फफूंदनाशक दवा तैयार रखें; लक्षण दिखते ही छिड़कें।',
        actionRequiredPa: 'ਟਿਲਟ ਉੱਲੀਨਾਸ਼ਕ ਤਿਆਰ ਰੱਖੋ; ਲੱਛਣ ਦਿਸਦੇ ਹੀ ਛਿੜਕਾਅ ਕਰੋ।'
      }
    ]
  };
};
