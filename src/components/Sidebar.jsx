import React from 'react';
import { History, Bolt, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const Sidebar = ({ open, setOpen, conversations, onSelectConversation, quickTools, recentCommands }) => {
  return (
    <aside className={`transition-all duration-300 ${open ? 'w-72' : 'w-0'} overflow-hidden border-r border-white/10 bg-black/40 backdrop-blur`}> 
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-3 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <History className="w-4 h-4" /> History
          </div>
          <button
            className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {open ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>
        </div>

        <div className="p-3 space-y-6 overflow-y-auto">
          <div>
            <div className="text-xs uppercase tracking-wide text-white/50 mb-2">Conversations</div>
            <div className="space-y-1">
              {conversations.length === 0 && (
                <div className="text-white/50 text-sm">No conversations yet.</div>
              )}
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectConversation(c.id)}
                  className="w-full text-left px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-colors"
                >
                  <div className="text-sm truncate">{c.title}</div>
                  <div className="text-xs text-white/50">{new Date(c.updatedAt).toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-white/50 mb-2">Quick Tools</div>
            <div className="grid grid-cols-2 gap-2">
              {quickTools.map((t) => (
                <button key={t.key} className="px-3 py-2 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/20 text-cyan-200 text-sm transition-colors flex items-center gap-2">
                  <Bolt className="w-4 h-4" /> {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-white/50 mb-2">Recent Commands</div>
            <div className="space-y-2">
              {recentCommands.map((cmd, idx) => (
                <div key={idx} className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white/70 text-sm">
                  <span className="text-white/50 mr-1">$</span>{cmd}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
