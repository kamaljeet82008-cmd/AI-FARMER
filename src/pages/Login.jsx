import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Sprout, Mail, Lock, User } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../auth/AuthContext';

export const Login = () => {
  const { t, language, setLanguage, languages } = useLanguage();
  const { user, isDemo, login, register, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dest = location.state?.from?.pathname || '/';

  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={dest} replace />;

  const errText = (e) => {
    const map = {
      'auth/email-already-in-use': t('auth.errExists'),
      'auth/invalid-credential': t('auth.errInvalid'),
      'auth/wrong-password': t('auth.errInvalid'),
      'auth/user-not-found': t('auth.errInvalid'),
      'auth/weak-password': t('auth.errWeak'),
      'auth/invalid-email': t('auth.errEmail'),
      'auth/demo-no-google': t('auth.errDemoGoogle'),
      'auth/demo-no-reset': t('auth.errDemoReset'),
    };
    return map[e?.code] || t('auth.errGeneric');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setInfo('');
    if (mode === 'register' && password.length < 6) { setError(t('auth.errWeak')); return; }
    setBusy(true);
    try {
      if (mode === 'register') await register(name.trim(), email.trim(), password);
      else await login(email.trim(), password);
      navigate(dest, { replace: true });
    } catch (err) { setError(errText(err)); }
    setBusy(false);
  };

  const google = async () => {
    setError('');
    try { await loginWithGoogle(); navigate(dest, { replace: true }); } catch (err) { setError(errText(err)); }
  };

  const forgot = async () => {
    setError(''); setInfo('');
    if (!email) { setError(t('auth.errEmail')); return; }
    try { await resetPassword(email.trim()); setInfo(t('auth.resetSent')); } catch (err) { setError(errText(err)); }
  };

  const input = 'w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500';

  return (
    <div className="max-w-md mx-auto py-8 space-y-5">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg">
          <Sprout className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">KrishiMitra <span className="text-emerald-600">AI</span></h1>
        <p className="text-sm text-slate-500">{t('auth.welcome')}</p>
      </div>

      <div className="flex gap-2 justify-center">
        {languages.map((l) => (
          <button key={l.code} onClick={() => setLanguage(l.code)}
            className={`px-4 py-2 rounded-xl text-sm font-bold ${language === l.code ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
            {l.short}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-black text-slate-900">{mode === 'login' ? t('auth.login') : t('auth.register')}</h2>

        {mode === 'register' && (
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
            <input className={input} required value={name} onChange={(e) => setName(e.target.value)} placeholder={t('auth.name')} />
          </div>
        )}
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
          <input className={input} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('auth.email')} autoComplete="email" />
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
          <input className={input} type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('auth.password')} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
        </div>

        {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">{error}</div>}
        {info && <div className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-3">{info}</div>}

        <button disabled={busy} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base disabled:opacity-60">
          {mode === 'login' ? t('auth.login') : t('auth.register')}
        </button>

        {mode === 'login' && (
          <button type="button" onClick={forgot} className="text-xs text-emerald-700 font-semibold underline block mx-auto">{t('auth.forgot')}</button>
        )}

        <button type="button" onClick={google} className="w-full py-3 rounded-xl border border-slate-300 hover:bg-slate-50 font-bold text-sm">
          {t('auth.google')}
        </button>

        <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setInfo(''); }}
          className="w-full text-sm text-slate-600">
          {mode === 'login' ? t('auth.noAccount') : t('auth.haveAccount')}{' '}
          <span className="font-bold text-emerald-700">{mode === 'login' ? t('auth.register') : t('auth.login')}</span>
        </button>
      </form>

      {isDemo && (
        <p className="text-[11px] text-center text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">{t('auth.demoNote')}</p>
      )}
    </div>
  );
};
