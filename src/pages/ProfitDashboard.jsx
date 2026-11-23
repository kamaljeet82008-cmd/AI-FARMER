import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  TrendingUp, 
  Calendar, 
  PieChart as PieIcon, 
  BarChart3, 
  FileText, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Printer
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioSpeaker } from '../components/AudioSpeaker';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import { 
  getFarmerProfile, 
  getSavedCropPlan, 
  getExpenses, 
  addExpense 
} from '../firebase/offlineStorage';
import { CROPS_DATA } from '../data/cropsData';

export const ProfitDashboard = () => {
  const { t, language } = useLanguage();

  const profile = getFarmerProfile();
  const cropPlan = getSavedCropPlan();

  const [expenses, setExpenses] = useState(() => getExpenses());

  // Form state for adding an expense
  const [expenseCat, setExpenseCat] = useState('catFertilizer');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [expenseNotes, setExpenseNotes] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);

  // Category labels map
  const categoryLabels = {
    catSeeds: t('profit.catSeeds'),
    catFertilizer: t('profit.catFertilizer'),
    catPesticides: t('profit.catPesticides'),
    catLabor: t('profit.catLabor'),
    catIrrigation: t('profit.catIrrigation'),
    catMachinery: t('profit.catMachinery'),
    catTransport: t('profit.catTransport'),
    catOther: t('profit.catOther'),
  };

  // Calculate actual total recorded expenses
  const actualTotalExpense = expenses.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  // Calculate estimated total expenses and revenues from crop plan
  let estimatedTotalExpense = 0;
  let estimatedTotalRevenue = 0;

  const allocatedCrops = cropPlan?.allocations || [
    { cropId: 'wheat', acres: 3.0 },
    { cropId: 'mustard', acres: 1.5 },
    { cropId: 'potato', acres: 0.5 }
  ];

  allocatedCrops.forEach(a => {
    const crop = CROPS_DATA.find(c => c.id === a.cropId);
    if (crop) {
      estimatedTotalExpense += crop.estCostPerAcre * a.acres;
      const avgYield = (crop.yieldMinQtlPerAcre + crop.yieldMaxQtlPerAcre) / 2;
      estimatedTotalRevenue += (avgYield * a.acres) * crop.avgMandiPricePerQtl;
    }
  });

  const estimatedNetProfit = Math.round(estimatedTotalRevenue - estimatedTotalExpense);
  const actualRealizedProfit = Math.round(estimatedTotalRevenue - actualTotalExpense);

  // Expense grouping by category for charts
  const categoryTotalsMap = {};
  expenses.forEach(e => {
    categoryTotalsMap[e.category] = (categoryTotalsMap[e.category] || 0) + parseFloat(e.amount);
  });

  const pieChartData = Object.entries(categoryTotalsMap).map(([catKey, total]) => ({
    name: categoryLabels[catKey] || catKey,
    value: total
  }));

  const COLORS = ['#16a34a', '#0284c7', '#f59e0b', '#dc2626', '#9333ea', '#ea580c', '#0d9488'];

  // Comparison bar chart data
  const comparisonChartData = [
    {
      metric: 'Cultivation Expenses',
      Estimated: Math.round(estimatedTotalExpense),
      Actual: Math.round(actualTotalExpense)
    },
    {
      metric: 'Gross Revenue',
      Estimated: Math.round(estimatedTotalRevenue),
      Actual: Math.round(estimatedTotalRevenue) // benchmark
    },
    {
      metric: 'Net Profit',
      Estimated: Math.round(estimatedNetProfit),
      Actual: Math.round(actualRealizedProfit)
    }
  ];

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseAmount || parseFloat(expenseAmount) <= 0) return;

    const newEntry = {
      date: expenseDate,
      category: expenseCat,
      amount: parseFloat(expenseAmount),
      notes: expenseNotes || categoryLabels[expenseCat]
    };

    const updated = addExpense(newEntry);
    setExpenses(updated);
    setExpenseAmount('');
    setExpenseNotes('');
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 10 • Financial Intelligence
            </span>
            <AudioSpeaker textToRead={`${t('profit.title')}. ${t('profit.subtitle')}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('profit.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('profit.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Financial Statement</span>
          </button>
        </div>
      </div>

      {/* 4 TOP FINANCIAL STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Cultivated Land */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t('profit.totalLand')}
          </div>
          <div className="text-2xl font-black text-slate-900">
            {profile.acresStandard} <span className="text-sm font-semibold">{t('common.acres')}</span>
          </div>
          <div className="text-xs text-emerald-700 font-medium">
            Active: {allocatedCrops.map(a => a.cropId).join(', ')}
          </div>
        </div>

        {/* Expenses: Est vs Actual */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Recorded Farm Expenses
          </div>
          <div className="text-2xl font-black text-rose-700">
            ₹{actualTotalExpense.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500">
            Estimated budget: ₹{Math.round(estimatedTotalExpense).toLocaleString('en-IN')}
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Projected Farm Revenue
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{Math.round(estimatedTotalRevenue).toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500">
            At current APMC mandi modal rates
          </div>
        </div>

        {/* Realized Profit */}
        <div className="bg-gradient-to-br from-emerald-700 to-teal-800 text-white p-5 rounded-3xl shadow-md space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
            Current Net Realization
          </div>
          <div className="text-2xl font-black text-amber-300">
            ₹{actualRealizedProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-100">
            Projected margin: ~{Math.round((actualRealizedProfit / (estimatedTotalRevenue || 1)) * 100)}%
          </div>
        </div>
      </div>

      {/* CHARTS SECTION (Recharts Visuals) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparison Bar Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span>{t('profit.profitComparisonChart')}</span>
            </h3>
            <span className="text-[11px] text-slate-500">Estimated vs Actual</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Estimated" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Actual" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Category Distribution Pie Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-teal-600" />
              <span>{t('profit.costBreakdownChart')}</span>
            </h3>
            <span className="text-[11px] text-slate-500">Total: ₹{actualTotalExpense.toLocaleString('en-IN')}</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `₹${val.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECORD NEW EXPENSE FORM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            <span>{t('profit.recordNewExpense')}</span>
          </h2>
          <AudioSpeaker textToRead="Record new farm expenses for seeds, fertilizers, diesel, or labour to keep your financial book up to date." />
        </div>

        <form onSubmit={handleAddExpenseSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              {t('profit.expenseCategory')} *
            </label>
            <select
              value={expenseCat}
              onChange={(e) => setExpenseCat(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              {t('profit.expenseAmount')} *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">₹</span>
              <input
                type="number"
                min="10"
                step="50"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="2500"
                className="w-full text-xs font-black pl-7 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              {t('profit.expenseDate')}
            </label>
            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-300 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Notes / Receipt
            </label>
            <input
              type="text"
              value={expenseNotes}
              onChange={(e) => setExpenseNotes(e.target.value)}
              placeholder="e.g. 2 bags Urea from IFFCO"
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>

          <div className="sm:col-span-4 flex items-center justify-end gap-3 pt-2">
            {addedNotice && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Expense recorded successfully!
              </span>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors active:scale-95"
            >
              {t('profit.addExpenseBtn')}
            </button>
          </div>
        </form>
      </div>

      {/* RECORDED EXPENSES LOG */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-black text-base text-slate-900">
          {t('profit.recentExpenses')}
        </h3>

        <div className="divide-y divide-slate-100">
          {expenses.map(item => (
            <div key={item.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                  {categoryLabels[item.category] || item.category}
                </span>
                <div>
                  <div className="font-bold text-slate-900">{item.notes}</div>
                  <div className="text-[11px] text-slate-400">{item.date}</div>
                </div>
              </div>
              <div className="text-right font-black text-slate-900">
                ₹{item.amount.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <DisclaimerBadge />
    </div>
  );
};
