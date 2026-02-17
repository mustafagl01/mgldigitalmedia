import React from 'react';

export default function PricingSimple() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            🚀 THE PROFIT ENGINE
          </span>
        </h1>
        
        <p className="text-3xl text-white mb-8">
          ÇALİŞIYOR! ✅
        </p>
        
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-3xl p-12">
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-4xl font-bold text-green-400 mb-2">
            Test Başarılı!
          </h2>
          <p className="text-xl text-gray-300">
            Eğer bunu görüyorsan, routing çalışıyor demektir.
          </p>
        </div>
        
        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          ← Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}