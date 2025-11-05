import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero3D = () => {
  return (
    <section className="relative w-full border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Sally MCP Trading Agent
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            A professional, real-time trading companion with live tool execution, streaming responses,
            and session management — designed with a clean, futuristic aesthetic.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/20">Realtime SSE</span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">Tool Timeline</span>
            <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/20">Export Sessions</span>
          </div>
        </div>
        <div className="order-1 lg:order-2 h-[320px] sm:h-[420px] lg:h-[460px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-black border border-white/10">
          <Spline
            scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
