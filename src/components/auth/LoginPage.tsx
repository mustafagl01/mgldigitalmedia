import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from '../../hooks/useToast';
import { supabase } from '../../lib/supabase';

interface LoginPageProps {
  onSwitchToSignup: () => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSignup, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();

  const handlePasswordReset = async () => {
    if (!email) {
      toast({
        title: "E-posta Gerekli",
        description: "Şifre sıfırlama için e-posta adresinizi girin.",
        variant: "destructive"
      });
      return;
    }

    setIsResetting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      toast({
        title: "Hata",
        description: "Şifre sıfırlama e-postası gönderilemedi.",
        variant: "destructive"
      });
    } else {
      setResetSent(true);
      toast({
        title: "E-posta Gönderildi",
        description: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."
      });
    }
    setIsResetting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen e-posta ve şifrenizi girin.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Giriş Hatası",
        description: error.message === 'Invalid login credentials' 
          ? "E-posta veya şifre hatalı." 
          : "Giriş yapılırken bir hata oluştu.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Başarılı!",
        description: "Giriş yapıldı."
      });
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    console.log('Google giriş butonu tıklandı');
    setIsLoading(true);
    
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast({
          title: "Google Giriş Hatası",
          description: "Google ile giriş yapılırken bir hata oluştu.",
          variant: "destructive"
        });
        console.error('Google signIn error:', error);
      } else {
        toast({
          title: "Google ile Giriş",
          description: "Google authentication sayfasına yönlendiriliyorsunuz...",
        });
        console.log('Google OAuth redirect başlatıldı');
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Google giriş işleminde beklenmeyen bir hata oluştu.",
        variant: "destructive"
      });
      console.error('Google signIn critical error:', error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <img 
                src="/00bc7320-6f8f-42ae-a0b7-0c24b609e70f.png" 
                alt="MGL Digital AI Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-white">MGL Digital AI</span>
            </div>
            <div className="w-9" />
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Hesabınıza Giriş Yapın</h1>
            <p className="text-slate-400">Otomasyon çözümlerinize erişim sağlayın</p>
          </div>

          {/* Google Sign In Button */}
          <div className="mb-6">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-300 rounded-lg shadow flex items-center justify-center gap-3 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'Yönlendiriliyor...' : 'Google ile Giriş Yap'}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-800 px-2 text-slate-400">veya</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-slate-300">E-posta Adresi</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-300">Şifre</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Giriş Yap
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Hesabınız yok mu?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Kayıt Olun
              </button>
            </p>
            <div className="mt-4">
              {!resetSent ? (
                <button
                  onClick={handlePasswordReset}
                  disabled={isResetting}
                  className="text-sm text-slate-400 hover:text-slate-300"
                >
                  {isResetting ? 'Gönderiliyor...' : 'Şifremi Unuttum'}
                </button>
              ) : (
                <p className="text-sm text-green-400">
                  Şifre sıfırlama e-postası gönderildi!
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};