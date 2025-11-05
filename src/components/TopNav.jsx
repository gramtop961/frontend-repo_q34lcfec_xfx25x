import React from 'react';
import { Cpu, Settings, ChevronDown, Activity, Plus, Download, Trash2 } from 'lucide-react';

const HealthDot = ({ status = 'ok' }) => {
  const color = status === 'ok' ? 'bg-emerald-500' : status === 'warn' ? 'bg-amber-500' : 'bg-rose-500';
  return (
    <span className={`inline-block w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_8px_rgba(16,185,129,0.8)]`} aria-label={`Health: ${status}`} />
  );
};

const TopNav = ({ onNewSession, onExport, onClear, model, setModel }) => {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-black">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="text-white font-semibold tracking-wide">Sally MCP</div>
            <div className="text-[11px] text-white/60">Trading Agent</div>
          </div>
          <div className="ml-4 hidden md:flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white/70">Live</span>
            <HealthDot status="ok" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <label htmlFor="model" className="sr-only">Model</label>
            <div className="relative">
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="appearance-none pr-8 text-sm bg-white/5 text-white border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
              >
                <option value="sally-pro">Sally Pro</option>
                <option value="sally-lite">Sally Lite</option>
                <option value="sally-research">Sally Research</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 w-4 h-4 text-white/60" />
            </div>
          </div>

          <button
            onClick={onNewSession}
            className="hidden sm:inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
          >
            <Plus className="w-4 h-4" /> New Session
          </button>

          <button
            onClick={onExport}
            className="hidden sm:inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
          >
            <Download className="w-4 h-4" /> Export
          </button>

          <button
            onClick={onClear}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>

          <button className="ml-2 inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors" aria-label="Settings">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
