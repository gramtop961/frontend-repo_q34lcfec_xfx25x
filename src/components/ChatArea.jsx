import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, Play, StopCircle, Bot, User, Copy, Check } from 'lucide-react';

const ToolBadge = ({ name, server, status }) => {
  const color = status === 'pending' ? 'bg-white/10 text-white/70 border-white/20' :
    status === 'running' ? 'bg-cyan-500/15 text-cyan-200 border-cyan-400/30' :
    status === 'success' ? 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30' :
    'bg-rose-500/15 text-rose-200 border-rose-400/30';
  const Icon = status === 'success' ? CheckCircle2 : status === 'error' ? AlertCircle : Play;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      <span className="font-medium">{name}</span>
      <span className="opacity-60">•</span>
      <span className="opacity-80">{server}</span>
    </span>
  );
};

const StreamingDots = () => (
  <span className="inline-flex items-center gap-1 pl-1">
    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
    <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-[pulse_1s_0.2s_infinite]" />
    <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-[pulse_1s_0.4s_infinite]" />
  </span>
);

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  };
  return (
    <div className="relative mt-3">
      <pre className="overflow-x-auto text-[13px] leading-relaxed p-3 rounded-md bg-black/60 border border-white/10 text-emerald-200">
        <code>{code}</code>
      </pre>
      <button onClick={onCopy} className="absolute top-2 right-2 inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white/80">
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

const Message = ({ role, content, tools = [], streaming = false }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black">
          <Bot className="w-4 h-4" />
        </div>
      )}
      <div className={`max-w-[75%] rounded-xl px-4 py-3 shadow/50 shadow-black/40 ${isUser ? 'bg-white text-black rounded-br-sm' : 'bg-white/5 text-white border border-white/10 rounded-bl-sm'}`}>
        <div className="whitespace-pre-wrap leading-relaxed">
          {content}
          {streaming && <StreamingDots />}
        </div>
        {tools.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tools.map((t, i) => (
              <ToolBadge key={i} {...t} />
            ))}
          </div>
        )}
      </div>
      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-md bg-white text-black flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

const InputBar = ({ disabled, onSend, iterations, setIterations }) => {
  const [value, setValue] = useState('');
  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue('');
  };
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/20 backdrop-blur pt-3">
      <div className="mx-auto max-w-4xl px-4 pb-5">
        <div className="rounded-xl border border-white/10 bg-white/5 focus-within:ring-2 focus-within:ring-cyan-400/50">
          <textarea
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask Sally about trading strategies..."
            className="w-full resize-none bg-transparent outline-none text-white placeholder-white/40 px-4 py-3 max-h-40 overflow-y-auto"
          />
          <div className="flex items-center justify-between gap-3 px-3 pb-3">
            <div className="flex items-center gap-3 text-xs text-white/70">
              <span>Max iterations</span>
              <input type="range" min="1" max="5" value={iterations} onChange={(e) => setIterations(parseInt(e.target.value))} />
              <span className="text-white/90">{iterations}</span>
            </div>
            <div className="flex items-center gap-2">
              <button disabled={disabled} onClick={handleSend} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition ${disabled ? 'opacity-50 cursor-not-allowed' : 'bg-cyan-500/15 hover:bg-cyan-500/25 border-cyan-400/30 text-cyan-200'}`}>
                <Play className="w-4 h-4" /> Send
              </button>
              <button disabled={disabled} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition ${disabled ? 'opacity-50 cursor-not-allowed' : 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-400/30 text-rose-200'}`}>
                <StopCircle className="w-4 h-4" /> Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatArea = ({ messages, onSendMessage }) => {
  const [running, setRunning] = useState(false);
  const [iterations, setIterations] = useState(2);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, running]);

  const handleSend = (text) => {
    onSendMessage({ role: 'user', content: text });
    setRunning(true);
    // Simulate streaming assistant
    const chunks = [
      'Analyzing market structure...',
      '\nPulling indicators: RSI, MACD, EMA...',
      '\nRisk model suggests a conservative entry with tight stops.',
    ];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < chunks.length) {
        onSendMessage({ role: 'assistant', content: chunks[idx], append: idx > 0, streaming: true, tools: idx === 1 ? [
          { name: 'bybit', server: 'exchange', status: 'running' },
          { name: 'crypto_indicators', server: 'analytics', status: 'running' },
        ] : [] });
        idx += 1;
      } else {
        clearInterval(interval);
        onSendMessage({ role: 'assistant', content: '\nRecommended: Scale in with 0.5% risk per position. See details below.', append: true, streaming: false, tools: [
          { name: 'bybit', server: 'exchange', status: 'success' },
          { name: 'crypto_indicators', server: 'analytics', status: 'success' },
          { name: 'fear_greed', server: 'sentiment', status: 'success' },
        ] });
        setRunning(false);
      }
    }, 900);
  };

  return (
    <section className="flex-1 flex flex-col min-h-0">
      <div ref={containerRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i}>
              <Message role={m.role} content={m.content} tools={m.tools} streaming={m.streaming} />
              {m.code && <CodeBlock code={m.code} />}
            </div>
          ))}
        </div>
      </div>
      <InputBar disabled={running} onSend={handleSend} iterations={iterations} setIterations={setIterations} />
    </section>
  );
};

export default ChatArea;
