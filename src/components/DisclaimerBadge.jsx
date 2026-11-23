import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const DisclaimerBadge = ({ customMessage = '', compact = false }) => {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200">
        <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
        <span>{customMessage || t('common.disclaimerText')}</span>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-lg my-4 text-xs md:text-sm text-amber-900 shadow-sm flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
      <div>
        <div className="font-semibold text-amber-950 mb-0.5">{t('common.disclaimerTitle')}</div>
        <p className="leading-relaxed text-amber-900">{customMessage || t('common.disclaimerText')}</p>
      </div>
    </div>
  );
};
