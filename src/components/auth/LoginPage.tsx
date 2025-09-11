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
  const { signIn } = useAuth();

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