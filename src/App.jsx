import React, { useMemo, useState } from 'react';
import TopNav from './components/TopNav.jsx';
import Hero3D from './components/Hero3D.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatArea from './components/ChatArea.jsx';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [model, setModel] = useState('sally-pro');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi, I\'m Sally. How can I help with your trading strategy today?', tools: [], streaming: false },
  ]);
  const [conversations, setConversations] = useState([]);

  const quickTools = useMemo(() => ([
    { key: 'pair', label: 'Pair Lookup' },
    { key: 'signal', label: 'Signal Scan' },
    { key: 'risk', label: 'Risk Check' },
    { key: 'fg', label: 'Fear & Greed' },
  ]), []);

  const recentCommands = useMemo(() => ([
    'scan --rsi < 30 --ema cross',
    'risk set --per-trade 0.5%',
    'backtest BTCUSDT 4h --since 90d',
  ]), []);

  const onSendMessage = ({ role, content, append = false, streaming = false, tools = [], code }) => {
    setMessages((prev) => {
      if (append && prev.length > 0) {
        const last = prev[prev.length - 1];
        if (last.role === 'assistant') {
          const merged = { ...last, content: last.content + content, streaming, tools: tools.length ? tools : last.tools };
          return [...prev.slice(0, -1), merged];
        }
      }
      return [...prev, { role, content, streaming, tools, code }];
    });
  };

  const onNewSession = () => {
    const id = crypto.randomUUID();
    const title = `Session ${conversations.length + 1}`;
    const now = Date.now();
    setConversations([{ id, title, updatedAt: now }, ...conversations]);
    setMessages([{ role: 'assistant', content: 'New session started. What would you like to explore?', tools: [], streaming: false }]);
  };

  const onSelectConversation = (id) => {
    alert(`Load conversation ${id} (persistence would be backed by a database in production).`);
  };

  const onExport = () => {
    const data = {
      model,
      createdAt: new Date().toISOString(),
      messages,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sally_session_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onClear = () => {
    if (confirm('Clear current conversation?')) {
      setMessages([{ role: 'assistant', content: 'Conversation cleared. How can I help next?', tools: [], streaming: false }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-white font-inter">
      <TopNav onNewSession={onNewSession} onExport={onExport} onClear={onClear} model={model} setModel={setModel} />
      <Hero3D />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-0 lg:gap-6">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          conversations={conversations}
          onSelectConversation={onSelectConversation}
          quickTools={quickTools}
          recentCommands={recentCommands}
        />
        <ChatArea messages={messages} onSendMessage={onSendMessage} />
      </main>
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-center text-xs text-white/50">
        Built with a focus on clarity, speed, and professional polish.
      </footer>
    </div>
  );
};

export default App;
