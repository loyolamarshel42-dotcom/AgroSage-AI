import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { CROP_ICONS } from '../constants';

export default function Dashboard({ setActiveTab, history }) {
  // Evaluation results extracted directly from evaluation_results.csv
  const modelComparisons = [
    { name: "Gaussian NB (Chosen)", testAcc: 99.55, f1: 99.54, cvAcc: 99.49, precision: 99.59, fill: "#16a34a" },
    { name: "Random Forest", testAcc: 99.55, f1: 99.55, cvAcc: 99.43, precision: 99.57, fill: "#3b82f6" },
    { name: "SVM (Support Vector)", testAcc: 98.86, f1: 98.86, cvAcc: 98.58, precision: 98.97, fill: "#6366f1" },
    { name: "Logistic Regression", testAcc: 97.95, f1: 97.95, cvAcc: 97.73, precision: 98.09, fill: "#8b5cf6" },
    { name: "Decision Tree", testAcc: 97.95, f1: 97.94, cvAcc: 98.58, precision: 98.06, fill: "#ec4899" },
    { name: "K-Nearest Neighbors", testAcc: 97.95, f1: 97.93, cvAcc: 96.53, precision: 98.04, fill: "#f59e0b" }
  ];

  const categoryDistribution = [
    { name: "Pulses & Legumes", count: 7, color: "#10b981" },
    { name: "Fruits & Melons", count: 9, color: "#f59e0b" },
    { name: "Cereals", count: 2, color: "#3b82f6" },
    { name: "Commercial & Fiber", count: 4, color: "#8b5cf6" }
  ];

  const keyMetrics = [
    { label: "Pipeline Classification Accuracy", value: "99.55%", change: "Validated on 440 test samples", icon: Award, color: "text-emerald-600 bg-emerald-50" },
    { label: "Supported Crops", value: "22 Cultivars", change: "Tropical, subtropical & temperate", icon: Layers, color: "text-blue-600 bg-blue-50" },
    { label: "Inference Latency", value: "< 12 ms", change: "Sub-second standard scaler response", icon: Sparkles, color: "text-amber-600 bg-amber-50" },
    { label: "Predictions Run in Session", value: history.length, change: "Logged in browser storage", icon: Calendar, color: "text-indigo-600 bg-indigo-50" }
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Farmer & Agronomist Analytics Dashboard
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time model evaluation metrics, agronomic distribution profiles, and recent farm assessments.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('recommend')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
        >
          <span>Run New Soil Test</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{metric.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">{metric.value}</p>
              <p className="text-xs text-slate-500 font-medium">{metric.change}</p>
            </div>
          );
        })}
      </div>

      {/* Model Benchmark Chart from evaluation_results.csv */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Machine Learning Algorithm Comparative Matrix</h3>
            <p className="text-xs text-slate-500">
              Evaluated with cross-validation on normalized soil/climate feature sets (from evaluation_results.csv)
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
            Gaussian NB: Optimal Balance of Speed & 99.55% Accuracy
          </span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modelComparisons} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis domain={[95, 100]} unit="%" tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip 
                formatter={(val) => [`${val}%`, '']}
                contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="testAcc" name="Test Accuracy (%)" radius={[6, 6, 0, 0]}>
                {modelComparisons.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Section: Category Distribution & Soil Health Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category Breakdown Pie Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Crop Portfolio Distribution</h3>
          <p className="text-xs text-slate-500">Breakdown of the 22 supported crop profiles across agricultural categories</p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Essential Agronomic Soil Health Best Practices */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Precision Soil Management Rules</h3>
          <p className="text-xs text-slate-500">Core agronomic principles to maximize crop suitability</p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Soil pH Buffer Maintenance</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Most crops thrive between pH 6.0 and 7.5. Apply agricultural lime for acidic soils (pH &lt; 5.5) or gypsum/sulfur for alkaline soils (pH &gt; 8.0).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Nitrogen-Fixing Pulse Rotations</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Crops like Chickpea, Lentil, and Blackgram biologically fix atmospheric nitrogen, replenishing soil before intensive cereals like Rice and Maize.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Potassium & Moisture Synergy</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  High-potassium crops (Bananas, Grapes, Apples) require balanced irrigation to support stomatal regulation and sugar synthesis.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Predictions Quick Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Soil Assessments</h3>
            <p className="text-xs text-slate-500">Activity logged during your current browser session</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setActiveTab('history')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View All History ({history.length})
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl">
            <p className="text-sm font-semibold text-slate-600">No predictions performed yet.</p>
            <p className="text-xs text-slate-400 mt-1">Submit your first soil test using the recommendation form.</p>
            <button
              onClick={() => setActiveTab('recommend')}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700 transition-colors"
            >
              Run First Prediction
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Primary Recommended Crop</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4">Soil N-P-K</th>
                  <th className="py-3 px-4">Climate (Temp/Rain)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-slate-400 font-mono">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 capitalize flex items-center gap-2">
                      <span>{CROP_ICONS[item.primary_crop] || "🌱"}</span>
                      <span>{item.primary_crop}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        {item.top_recommendations[0]?.confidence_percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      N:{item.inputs.N} P:{item.inputs.P} K:{item.inputs.K}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {item.inputs.temperature}°C / {item.inputs.rainfall}mm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
