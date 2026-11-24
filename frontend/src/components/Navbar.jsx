import React from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  BookOpen, 
  History, 
  Cpu, 
  HelpCircle,
  Menu,
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, systemStatus }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Sprout },
    { id: 'recommend', label: 'Crop Recommender', icon: Cpu, badge: 'AI' },
    { id: 'dashboard', label: 'Farmer Dashboard', icon: LayoutDashboard },
    { id: 'catalog', label: 'Crop Encyclopedia', icon: BookOpen },
    { id: 'history', label: 'Prediction History', icon: History }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  AgroSage <span className="text-emerald-600">AI</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  SaaS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Intelligent Precision Agriculture</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] uppercase font-bold rounded bg-emerald-600 text-white leading-tight">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* System Status Pill & Action */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600">
              <span className={`w-2 h-2 rounded-full ${systemStatus ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span className="font-medium">
                {systemStatus ? 'Gaussian NB Online (99.5%)' : 'Connecting Engine...'}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('recommend')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-lg shadow-sm shadow-emerald-600/30 transition-all"
            >
              <Cpu className="w-4 h-4" />
              <span>Get Recommendation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-emerald-600 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab('recommend');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white text-center shadow-sm"
            >
              Launch Recommender
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
