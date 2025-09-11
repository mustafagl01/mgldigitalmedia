import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-black/40 pt-12 pb-8">
    <div className="container mx-auto px-4">
      <div className="text-center">
        <div className="flex justify-center items-center gap-3 mb-4">
          <img 
            src="/00bc7320-6f8f-42ae-a0b7-0c24b609e70f.png" 
            alt="MGL Digital AI Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="text-2xl font-bold text-white">MGL Digital AI</span>
        </div>
        <p className="text-gray-400 mb-8">AI Otomasyon Ajansı - İşinizi Geleceğe Taşıyoruz</p>
      </div>
      <div className="border-t border-slate-700/50 pt-8 text-slate-400 text-sm">
        <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-semibold text-white mb-2">MGL DIGITAL MEDIA LTD</h4>
            <p>Registered in England and Wales. Company Number: 16007414</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Registered Office</h4>
            <p>112 Bertram Road, Enfield, England, EN1 1LS</p>
          </div>
        </div>
      </div>
      <div className="text-center text-slate-500 text-xs mt-8 pt-8 border-t border-slate-700/50">
        <span>© 2024 MGL Digital Media LTD • Tüm Hakları Saklıdır</span>
      </div>
    </div>
  </footer>
);