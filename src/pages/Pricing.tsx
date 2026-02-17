import React from 'react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            🚀 PROFIT ENGINE TEST
          </span>
        </h1>
        
        <p className="text-4xl text-white mb-8">
          ÇALİŞIYOR! ✅
        </p>
        
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-3xl p-12 mb-8">
          <div className="text-8xl mb-4">💰</div>
          <h2 className="text-5xl font-bold text-green-400 mb-4">
            ROUTING ÇALIŞIYOR!
          </h2>
          <p className="text-2xl text-gray-300 mb-2">
            Eğer bunu görüyorsan:
          </p>
          <ul className="text-xl text-left max-w-md mx-auto space-y-2 text-gray-300">
            <li>✅ App.tsx routing doğru</li>
            <li>✅ /pricing route çalışıyor</li>
            <li>✅ Cloudflare deploy başarılı</li>
            <li>✅ React render oluyor</li>
          </ul>
        </div>
        
        <div className="text-left bg-slate-800/50 rounded-xl p-6 mb-8">
          <p className="text-cyan-400 font-mono mb-2">URL:</p>
          <p className="text-white font-mono">{window.location.href}</p>
        </div>
        
        <button
          onClick={() => window.location.href = '/'}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          ← Ana Sayfaya Dön
        </button>
        
        <p className="mt-8 text-gray-500 text-sm">
          Test başarılı olunca, tam Profit Engine'i ekleyeceğiz!
        </p>
      </div>
    </div>
  );
}