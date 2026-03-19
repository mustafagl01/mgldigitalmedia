import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LogOut, User, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeaderProps {
  onAnalysisClick: () => void;
  onAuthClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAnalysisClick, onAuthClick }) => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-700/50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex items-center justify-between"
      >
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/00bc7320-6f8f-42ae-a0b7-0c24b609e70f.png"
            alt="MGL Digital AI Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="hidden sm:block text-xl font-bold text-white">{t('header.title')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            variant="ghost"
            className="text-slate-300 hover:text-white"
          >
            <Home className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">{t('header.home')}</span>
          </Button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-300 hidden sm:block">
                {user.email}
              </span>
              <Button onClick={onAnalysisClick} variant="outline" size="sm">
                <span className="hidden sm:inline">{t('header.opportunities')}</span>
                <span className="sm:hidden">{t('header.analysis')}</span>
              </Button>
              <Button onClick={handleSignOut} variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">{t('header.logout')}</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => window.open('https://calendar.app.google/jgu53NFAy7BnYVui8', '_blank')}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-none shadow-[0_0_20px_-5px_rgba(147,51,234,0.5)] hidden md:flex"
                size="sm"
              >
                {t('header.bookAppointment')}
              </Button>
              <Button onClick={onAnalysisClick} variant="outline" size="sm">
                <span className="hidden sm:inline">{t('header.opportunities')}</span>
                <span className="sm:hidden">{t('header.analysis')}</span>
              </Button>
              <Button onClick={onAuthClick} variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{t('header.login')}</span>
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </header>
  );
};