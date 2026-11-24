import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  BarChart3, 
  Layers, 
  Zap, 
  Sprout, 
  HelpCircle,
  FlaskConical,
  Award,
  Globe2
} from 'lucide-react';
import { PRESET_SCENARIOS } from '../constants';

export default function LandingPage({ setActiveTab, onSelectPreset }) {
  const modelStats = [
    { label: "Model Algorithm", value: "Gaussian Naive Bayes" },
    { label: "Pipeline Validation Accuracy", value: "99.55%" },
    { label: "Macro F1-Score", value: "0.9954" },
    { label: "Input Agronomic Features", value: "7 Features" },
    { label: "Registered Crop Classes", value: "22 Crops" }
  ];

  const features = [
    {
      icon: FlaskConical,
      title: "Soil Chemistry Precision",
      desc: "Calibrate Nitrogen (N), Phosphorus (P), and Potassium (K) levels to match biological crop consumption profiles."
    },
    {
      icon: Zap,
      title: "Instant Multi-Class Inference",
      desc: "Standardized Gaussian NB pipeline evaluates posterior probability across 22 major crop species in sub-milliseconds."
    },
    {
      icon: BarChart3,
      title: "Confidence Probability Ranking",
      desc: "Transparent Top 3 crop probability scores enable resilient diversification and risk hedging for unpredictable seasons."
    },
    {
      icon: ShieldCheck,
      title: "Rigorous Agronomic Guardrails",
      desc: "Built-in agronomic validation flags extreme pH or precipitation anomalies to avoid misapplication of fertilizers."
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        {/* Subtle decorative background patterns */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-green-100/50 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        </div>

        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
            Machine Learning Precision Agriculture • 99.55% Test Accuracy
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Maximize Harvest Yields with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
              AI-Powered Crop Recommendations
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Eliminate guesswork from planting decisions. AgroSage analyzes your specific soil nutrient levels (N-P-K), local ambient temperatures, relative humidity, soil pH, and rainfall to prescribe the most profitable, biologically viable crops.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('recommend')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-lg shadow-emerald-600/25 transition-all text-base"
            >
              <span>Analyze Your Soil Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all text-base"
            >
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span>Explore Analytics Dashboard</span>
            </button>
          </div>

          {/* Quick Preset Demonstrations */}
          <div className="mt-12 pt-8 border-t border-slate-200/80">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Try ready-made agro-climatic scenarios:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {PRESET_SCENARIOS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPreset(preset.values)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-medium text-slate-700 hover:text-emerald-800 transition-all shadow-xs"
                >
                  ⚡ {preset.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Verified Model Benchmark Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-700">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Award className="w-4 h-4" />
                <span>Empirically Evaluated & Verified</span>
              </div>
              <h2 className="text-2xl font-bold mt-1 text-white">Machine Learning Benchmarks</h2>
              <p className="text-slate-400 text-sm mt-0.5">
                Evaluated across 6 industry-standard models on multi-class crop datasets.
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold">
              Selected: GaussianNB with StandardScaler
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-6">
            {modelStats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-400">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Architectural Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed for Modern Agro-Enterprise & Smallholders
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Bridging laboratory soil test reports with production agronomy through robust data pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3-Step Process Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/60 rounded-3xl p-8 sm:p-12 border border-emerald-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">From Soil Sample to Sowing Plan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Input Soil & Weather</h4>
              <p className="text-sm text-slate-600">
                Provide NPK chemical assays and regional climatic parameters (temp, humidity, pH, precipitation).
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Gaussian Inference</h4>
              <p className="text-sm text-slate-600">
                StandardScaler scales inputs, and Gaussian Naive Bayes computes multivariate likelihoods across 22 classes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Top 3 Prescriptions</h4>
              <p className="text-sm text-slate-600">
                Review primary and secondary alternatives with complete agronomic guides, durations, and market notes.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setActiveTab('recommend')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all"
            >
              Start Crop Analysis Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
