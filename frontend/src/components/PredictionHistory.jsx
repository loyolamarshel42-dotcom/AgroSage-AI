import React from 'react';
import { 
  History, 
  Trash2, 
  RotateCcw, 
  ExternalLink, 
  Calendar, 
  Clock, 
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';
import { CROP_ICONS } from '../constants';

export default function PredictionHistory({ history, setHistory, onLoadPreset, setActiveTab }) {
  
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your prediction history?")) {
      setHistory([]);
      localStorage.removeItem("crop_prediction_history");
    }
  };

  const exportHistoryCSV = () => {
    if (history.length === 0) return;
    const headers = ["Timestamp", "Primary Crop", "Confidence (%)", "N", "P", "K", "Temperature", "Humidity", "pH", "Rainfall"];
    const rows = history.map(item => [
      item.timestamp,
      item.primary_crop,
      item.top_recommendations[0]?.confidence_percentage,
      item.inputs.N,
      item.inputs.P,
      item.inputs.K,
      item.inputs.temperature,
      item.inputs.humidity,
      item.inputs.ph,
      item.inputs.rainfall
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `crop_predictions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <History className="w-3.5 h-3.5 text-emerald-600" />
              Audit Trail & Farm Logs
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Prediction History
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Review, reload, and export past soil chemistry and climate recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <>
                <button
                  onClick={exportHistoryCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
                <button
                  onClick={clearHistory}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Logs
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* History Items */}
      {history.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
          <History className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800">No Assessment Records Found</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-1">
            Whenever you submit a soil and weather reading through the recommendation engine, your predictions are stored here for reference.
          </p>
          <button
            onClick={() => setActiveTab('recommend')}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            <span>Run New Recommendation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((record) => (
            <div 
              key={record.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Crop Identity */}
              <div className="flex items-center gap-4">
                <span className="text-4xl p-3 bg-slate-50 rounded-2xl select-none">
                  {CROP_ICONS[record.primary_crop] || "🌱"}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 capitalize">
                      {record.primary_crop}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {record.top_recommendations[0]?.confidence_percentage}% Confidence
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(record.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle: Inputs Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">NPK</span>
                  <span className="font-bold text-slate-800">{record.inputs.N}-{record.inputs.P}-{record.inputs.K}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Temp</span>
                  <span className="font-bold text-slate-800">{record.inputs.temperature}°C</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Humidity</span>
                  <span className="font-bold text-slate-800">{record.inputs.humidity}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Rain / pH</span>
                  <span className="font-bold text-slate-800">{record.inputs.rainfall}mm / {record.inputs.ph}</span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    onLoadPreset(record.inputs);
                    setActiveTab('recommend');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reload into Form
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
