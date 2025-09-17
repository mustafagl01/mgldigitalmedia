import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const AuthCallback: React.FC = () => {
  const { loading } = useAuth();

  useEffect(() => {
    // Supabase otomatik olarak auth state'i handle ediyor
    // Eğer başarılıysa user context'inde güncellenecek
    console.log('Auth callback sayfası yüklendi');
    
    // 3 saniye sonra ana sayfaya yönlendir
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Giriş Yapılıyor...</h2>
          <p className="text-slate-400">Google hesabınızla giriş işleminiz tamamlanıyor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Başarılı!</h2>
        <p className="text-slate-400 mb-4">Google ile giriş işleminiz tamamlandı.</p>
        <p className="text-sm text-slate-500">Ana sayfaya yönlendiriliyorsunuz...</p>
      </div>
    </div>
  );
};