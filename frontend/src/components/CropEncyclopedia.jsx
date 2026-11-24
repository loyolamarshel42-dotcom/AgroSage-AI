import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Calendar, 
  Droplet, 
  Sprout, 
  Globe, 
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { fetchCropsCatalog } from '../api';
import { CROP_ICONS } from '../constants';

export default function CropEncyclopedia({ onSelectCropForForm }) {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    async function loadCatalog() {
      try {
        setLoading(true);
        const data = await fetchCropsCatalog();
        setCrops(data.crops || []);
        if (data.crops && data.crops.length > 0) {
          setSelectedCrop(data.crops[0]);
        }
      } catch (err) {
        setError(err.message || "Failed to load crop encyclopedia.");
      } finally {
        setLoading(false);
      }
    }
    loadCatalog();
  }, []);

  const categories = ["All", "Pulses", "Fruits", "Cereal", "Fiber", "Plantation"];

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crop.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crop.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === "All" || 
                       crop.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              Agronomic Knowledge Base
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Crop Encyclopedia (22 Cultivars)
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Detailed agronomic requirements, soil preferences, growth durations, and management protocols.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crop or scientific name..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-600">Loading Agronomic Catalog...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 rounded-2xl border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Crop List */}
          <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
            {filteredCrops.map((crop) => {
              const iconKey = crop.name.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '');
              const isSelected = selectedCrop?.name === crop.name;

              return (
                <div
                  key={crop.name}
                  onClick={() => setSelectedCrop(crop)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl select-none">{CROP_ICONS[iconKey] || "🌱"}</span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{crop.name}</h4>
                        <p className="text-[11px] text-slate-500 italic">{crop.scientific_name}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {crop.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Crop Card */}
          {selectedCrop && (
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="text-4xl p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                    {CROP_ICONS[selectedCrop.name.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '')] || "🌱"}
                  </span>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{selectedCrop.name}</h3>
                    <p className="text-xs text-slate-500 italic">{selectedCrop.scientific_name} • {selectedCrop.category}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Growth Cycle</span>
                  <p className="text-sm font-bold text-emerald-800">{selectedCrop.growth_duration}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overview</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedCrop.description}</p>
              </div>

              {/* Soil & Climate Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-bold text-slate-700">Ideal Soil Conditions:</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedCrop.ideal_soil}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-bold text-slate-700">Climatic Environment:</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedCrop.climate}</p>
                </div>
              </div>

              {/* Key Agronomic Practices */}
              {selectedCrop.key_practices && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recommended Agronomic Practices</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {selectedCrop.key_practices.map((practice, idx) => (
                      <li key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Commercial Value */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/80 flex items-start gap-3">
                <Sprout className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Economic & Market Value</h5>
                  <p className="text-xs text-emerald-900 mt-0.5 leading-relaxed">{selectedCrop.economic_value}</p>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
