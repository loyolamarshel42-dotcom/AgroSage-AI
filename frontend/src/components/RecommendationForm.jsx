import React, { useState } from 'react';
import { 
  Cpu, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Award,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { FIELD_SPECS, PRESET_SCENARIOS, CROP_ICONS, CROP_BENCHMARKS } from '../constants';
import { requestPrediction } from '../api';

export default function RecommendationForm({ 
  formData, 
  setFormData, 
  onSaveHistory 
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear field-level error
    if (fieldErrors[id]) {
      setFieldErrors(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    FIELD_SPECS.forEach(field => {
      const val = formData[field.id];
      if (val === "" || val === undefined || val === null) {
        errors[field.id] = "Value is required";
      } else {
        const num = parseFloat(val);
        if (isNaN(num)) {
          errors[field.id] = "Must be a number";
        } else if (num < field.min || num > field.max) {
          errors[field.id] = `Range: ${field.min} - ${field.max}`;
        }
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      setError("Please rectify the highlighted input field errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await requestPrediction(formData);
      setResult(response);
      onSaveHistory({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        inputs: { ...formData },
        primary_crop: response.primary_crop,
        top_recommendations: response.top_recommendations,
        accuracy: response.model_test_accuracy
      });
      // Scroll smoothly down to results
      setTimeout(() => {
        const el = document.getElementById("recommendation-results");
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err.message || "Failed to communicate with prediction service.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      N: 90,
      P: 42,
      K: 43,
      temperature: 20.8,
      humidity: 82.0,
      ph: 6.5,
      rainfall: 202.9
    });
    setFieldErrors({});
    setError(null);
    setResult(null);
  };

  const applyPreset = (presetValues) => {
    setFormData(presetValues);
    setFieldErrors({});
    setError(null);
  };

  // Prepare comparison data for radar visualization if result is available
  const radarData = result ? [
    { subject: 'N (Nitrogen)', Input: parseFloat(formData.N), Benchmark: CROP_BENCHMARKS[result.primary_crop]?.n || 50, fullMark: 140 },
    { subject: 'P (Phosphorus)', Input: parseFloat(formData.P), Benchmark: CROP_BENCHMARKS[result.primary_crop]?.p || 50, fullMark: 140 },
    { subject: 'K (Potassium)', Input: parseFloat(formData.K), Benchmark: CROP_BENCHMARKS[result.primary_crop]?.k || 50, fullMark: 200 },
    { subject: 'Temp (°C)', Input: parseFloat(formData.temperature), Benchmark: CROP_BENCHMARKS[result.primary_crop]?.temp || 25, fullMark: 45 },
    { subject: 'Humidity (%)', Input: parseFloat(formData.humidity), Benchmark: CROP_BENCHMARKS[result.primary_crop]?.hum || 80, fullMark: 100 },
    { subject: 'pH (x10)', Input: parseFloat(formData.ph) * 10, Benchmark: (CROP_BENCHMARKS[result.primary_crop]?.ph || 6.5) * 10, fullMark: 100 },
    { subject: 'Rain (/2)', Input: parseFloat(formData.rainfall) / 2, Benchmark: (CROP_BENCHMARKS[result.primary_crop]?.rain || 150) / 2, fullMark: 150 }
  ] : [];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              Machine Learning Pipeline Input
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Soil & Climate Recommendation Engine
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Enter seven precise laboratory or field sensor readings below. Values are fed directly into the Gaussian Naive Bayes standard scaler pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Form
            </button>
          </div>
        </div>

        {/* Quick Scenario Fill Buttons */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">
              Quick Samples:
            </span>
            {PRESET_SCENARIOS.map((scenario, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(scenario.values)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50/80 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/70 transition-colors"
              >
                {scenario.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
        
        {/* Section 1: Chemical Nutrients (NPK) */}
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-6">
            <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">1</span>
            <h3 className="text-base font-bold text-slate-900">Primary Soil Nutrients (NPK Ratios)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FIELD_SPECS.slice(0, 3).map((field) => (
              <div key={field.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={field.id} className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                    <span>{field.label}</span>
                    <span className="text-xs font-normal text-slate-500">({field.unit})</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">Typical: {field.typical}</span>
                </div>
                
                <div className="relative">
                  <input
                    id={field.id}
                    type="number"
                    step={field.step}
                    value={formData[field.id]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold text-slate-900 focus:outline-none transition-all ${
                      fieldErrors[field.id] 
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20' 
                        : 'border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                    }`}
                    placeholder={`Enter ${field.id} in ${field.unit}`}
                  />
                  <div className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 pointer-events-none">
                    {field.unit}
                  </div>
                </div>

                {fieldErrors[field.id] ? (
                  <p className="text-xs text-red-600 font-medium">{fieldErrors[field.id]}</p>
                ) : (
                  <p className="text-xs text-slate-500">{field.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Environmental & Climatic Factors */}
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-6">
            <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">2</span>
            <h3 className="text-base font-bold text-slate-900">Agro-Climatic & Soil Chemistry Parameters</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FIELD_SPECS.slice(3).map((field) => (
              <div key={field.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={field.id} className="text-sm font-semibold text-slate-800">
                    {field.label}
                    <span className="text-xs font-normal text-slate-500 ml-1">({field.unit})</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">{field.typical}</span>
                </div>

                <div className="relative">
                  <input
                    id={field.id}
                    type="number"
                    step={field.step}
                    value={formData[field.id]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold text-slate-900 focus:outline-none transition-all ${
                      fieldErrors[field.id] 
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20' 
                        : 'border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                    }`}
                    placeholder={`Enter ${field.id}`}
                  />
                  <div className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 pointer-events-none">
                    {field.unit}
                  </div>
                </div>

                {fieldErrors[field.id] ? (
                  <p className="text-xs text-red-600 font-medium">{fieldErrors[field.id]}</p>
                ) : (
                  <p className="text-xs text-slate-500">{field.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error notification banner */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
            <div>
              <p className="font-semibold">Execution Notice</p>
              <p className="text-xs mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Submit Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Passed in exact feature sequence: [N, P, K, temperature, humidity, ph, rainfall]</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>StandardScaler & Inference Running...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Recommendations</span>
              </>
            )}
          </button>
        </div>

      </form>

      {/* Result Presentation Section */}
      {result && (
        <div id="recommendation-results" className="space-y-8 animate-fadeIn">
          
          {/* Main Top Recommendation Hero */}
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-emerald-700/60">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-emerald-300" />
                  Primary Optimal Recommendation
                </span>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-5xl sm:text-6xl select-none">
                    {CROP_ICONS[result.primary_crop] || "🌱"}
                  </span>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold capitalize tracking-tight text-white">
                      {result.top_recommendations[0]?.details?.display_name || result.primary_crop}
                    </h2>
                    <p className="text-emerald-200 text-sm mt-0.5">
                      Category: <span className="font-semibold text-white">{result.top_recommendations[0]?.details?.category}</span> • 
                      Growth Cycle: <span className="font-semibold text-white">{result.top_recommendations[0]?.details?.growth_duration}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidence Metric Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[200px] text-center md:text-right">
                <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Model Confidence</span>
                <p className="text-4xl font-black text-white mt-1">
                  {result.top_recommendations[0]?.confidence_percentage}%
                </p>
                <p className="text-[11px] text-emerald-200 mt-1">
                  Relative posterior score: {result.top_recommendations[0]?.confidence_score}
                </p>
              </div>
            </div>

            {/* Description & Agronomics */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Agronomic Assessment</h4>
                <p className="text-emerald-50 text-sm sm:text-base leading-relaxed">
                  {result.top_recommendations[0]?.details?.description}
                </p>
                <div className="pt-2 text-xs text-emerald-200">
                  <span className="font-bold text-white">Ideal Soil:</span> {result.top_recommendations[0]?.details?.ideal_soil}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-2">
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Commercial Impact</h4>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {result.top_recommendations[0]?.details?.economic_value}
                </p>
              </div>
            </div>

          </div>

          {/* Top 3 Comparison Cards */}
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>Full Top 3 Recommendation Ranking</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.top_recommendations.map((rec) => (
                <div 
                  key={rec.rank}
                  className={`bg-white rounded-2xl p-6 border transition-all ${
                    rec.rank === 1 
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                      : 'border-slate-200 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                      rec.rank === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      Rank #{rec.rank}
                    </span>
                    <span className="text-2xl">{CROP_ICONS[rec.crop] || "🌱"}</span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 capitalize mb-1">
                    {rec.details?.display_name || rec.crop}
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">{rec.details?.category}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Model Probability:</span>
                      <span className="font-bold text-slate-900">{rec.confidence_percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${rec.rank === 1 ? 'bg-emerald-600' : 'bg-slate-400'}`}
                        style={{ width: `${Math.max(rec.confidence_percentage, 1)}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {rec.details?.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold text-slate-700">{rec.details?.growth_duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Probability Breakdown Chart & Soil Radar Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Probability Score Bar Chart */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <h4 className="text-base font-bold text-slate-900 mb-1">Model Likelihood Distribution</h4>
              <p className="text-xs text-slate-500 mb-6">Comparative probability output from Gaussian Naive Bayes</p>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.top_recommendations} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="crop" type="category" tick={{ fontSize: 12, fontWeight: 600 }} />
                    <Tooltip 
                      formatter={(val) => [`${val}%`, 'Posterior Probability']}
                      contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Bar dataKey="confidence_percentage" radius={[0, 6, 6, 0]}>
                      {result.top_recommendations.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#16a34a' : index === 1 ? '#0ea5e9' : '#94a3b8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Soil Benchmark Chart */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <h4 className="text-base font-bold text-slate-900 mb-1">Field Reading vs Benchmark</h4>
              <p className="text-xs text-slate-500 mb-6">Comparison of your inputs against {result.primary_crop} optimal profile</p>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} />
                    <Radar name="Your Input" dataKey="Input" stroke="#16a34a" fill="#22c55e" fillOpacity={0.4} />
                    <Radar name="Ideal Benchmark" dataKey="Benchmark" stroke="#0ea5e9" fill="#38bdf8" fillOpacity={0.2} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Mandatory Transparency Disclaimer Box */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 flex items-start gap-4">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <p className="font-bold text-sm text-amber-950">Scientific Transparency & Statistical Disclaimer</p>
              <p className="leading-relaxed">
                {result.disclaimer}
              </p>
              <p className="text-amber-800 text-[11px] pt-1">
                Model confidence scores represent mathematical probabilities under fitted Gaussian curves rather than guaranteed commercial yields. Always cross-reference with localized micro-climate forecasts, certified agronomists, and regional disease advisories.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
