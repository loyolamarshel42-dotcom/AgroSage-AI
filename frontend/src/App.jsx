import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import RecommendationForm from './components/RecommendationForm';
import Dashboard from './components/Dashboard';
import CropEncyclopedia from './components/CropEncyclopedia';
import PredictionHistory from './components/PredictionHistory';
import { checkHealth } from './api';
import { Sprout, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [systemStatus, setSystemStatus] = useState(false);
  const [backendMeta, setBackendMeta] = useState(null);

  // Form persistent state
  const [formData, setFormData] = useState({
    N: 90,
    P: 42,
    K: 43,
    temperature: 20.8,
    humidity: 82.0,
    ph: 6.5,
    rainfall: 202.9
  });

  // History state with LocalStorage persistence
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('crop_prediction_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Polling backend health on mount
  useEffect(() => {
    let mounted = true;
    async function verifyBackend() {
      try {
        const res = await checkHealth();
        if (mounted && res.status === 'healthy') {
          setSystemStatus(true);
          setBackendMeta(res);
        }
      } catch (e) {
        if (mounted) setSystemStatus(false);
      }
    }
    verifyBackend();
    const interval = setInterval(verifyBackend, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleSaveHistory = (record) => {
    const updated = [record, ...history].slice(0, 30);
    setHistory(updated);
    try {
      localStorage.setItem('crop_prediction_history', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to store history:", e);
    }
  };

  const handleSelectPreset = (presetValues) => {
    setFormData(presetValues);
    setActiveTab('recommend');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        systemStatus={systemStatus} 
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'landing' && (
          <LandingPage 
            setActiveTab={setActiveTab} 
            onSelectPreset={handleSelectPreset} 
          />
        )}

        {activeTab === 'recommend' && (
          <RecommendationForm 
            formData={formData} 
            setFormData={setFormData} 
            onSaveHistory={handleSaveHistory} 
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab} 
            history={history} 
          />
        )}

        {activeTab === 'catalog' && (
          <CropEncyclopedia 
            onSelectCropForForm={handleSelectPreset} 
          />
        )}

        {activeTab === 'history' && (
          <PredictionHistory 
            history={history} 
            setHistory={setHistory} 
            onLoadPreset={handleSelectPreset} 
            setActiveTab={setActiveTab} 
          />
        )}
      </main>

      {/* Modern SaaS Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 text-lg">
                AgroSage <span className="text-emerald-600">AI</span>
              </span>
              <span className="text-xs text-slate-400 border-l border-slate-200 pl-3">
                Pre-trained Gaussian Naive Bayes Model Engine
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-500">
              <span>Features: N, P, K, Temp, Humidity, pH, Rainfall</span>
              <span>22 Crop Classes</span>
              <span>Test Acc: 99.55%</span>
            </div>

            <div className="text-xs text-slate-400 text-center md:text-right">
              Precision Agriculture SaaS • Built for modern farm resilience
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
