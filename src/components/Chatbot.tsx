import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { toast } from '../hooks/useToast';
import { cn } from '../utils/cn';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Update greeting message when language changes
  useEffect(() => {
    setMessages([{ id: 1, text: t('chatbot.greeting'), sender: 'bot' }]);
  }, [t]);

  useEffect(() => { 
    if (isOpen && !sessionId) setSessionId(`session_${Date.now()}`); 
  }, [isOpen, sessionId]);
  
  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    
    const webhookUrl = 'https://nt3ys1ml.rpcd.host/webhook/b7256006-aad8-48e9-a2c6-88f10664f5a8';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify({ message: currentInput, sessionId: sessionId || 'default_session' })
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      // n8n sends text response, not JSON
      let botResponseText = "";
      
      try {
        // n8n'den text yanıt geliyor, direkt text olarak al
        botResponseText = await response.text();
        console.log('n8n raw response:', botResponseText);
        console.log('Response length:', botResponseText.length);
        
        // Boş yanıt kontrolü
        if (!botResponseText || botResponseText.trim() === '') {
          console.log('Empty response detected');
          botResponseText = "Üzgünüm, yanıt alınamadı.";
        } else {
          // Trim whitespace
          botResponseText = botResponseText.trim();
        }
      } catch (error) {
        console.error('Response parse error:', error);
        botResponseText = "Yanıt işlenirken bir hata oluştu.";
      }
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Chatbot webhook error:', error);
      let errorMessage = "Üzgünüm, bir hata oluştu.";
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.";
      }
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: errorMessage,
        sender: 'bot' 
      }]);
      toast({ 
        title: t('toast.connection.error'),
        description: t('toast.connection.error.desc'),
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }} 
            transition={{ type: 'spring', stiffness: 300, damping: 30 }} 
            className="w-80 sm:w-96 h-[500px] bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700"
          >
            <header className="p-4 bg-slate-900/50 border-b border-slate-700 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-slate-800" />
              </div>
              <div>
                <h3 className="font-bold text-white">{t('chatbot.title')}</h3>
                <p className="text-xs text-slate-400">{t('chatbot.subtitle')}</p>
              </div>
            </header>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={cn("flex", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-white whitespace-pre-wrap break-words", 
                      msg.sender === 'user' 
                        ? 'bg-purple-600 rounded-br-none' 
                        : 'bg-slate-700 rounded-bl-none'
                    )}
                  >
                    {msg.text}
                  </motion.div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="bg-slate-700 p-3 rounded-2xl rounded-bl-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                  </motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-slate-900/50 border-t border-slate-700">
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)} 
                  placeholder={t('chatbot.placeholder')}
                  onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }} 
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="bg-purple-600 hover:bg-purple-700" 
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden" 
        aria-label="Chatbot" 
        whileHover={{ scale: 1.05 }} 
        animate={isOpen ? { width: 64, height: 64 } : { width: 250, height: 64 }} 
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div 
              key="close" 
              initial={{ rotate: -90, scale: 0 }} 
              animate={{ rotate: 0, scale: 1 }} 
              exit={{ rotate: 90, scale: 0 }}
            >
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div 
              key="open" 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: -20, opacity: 0 }} 
              className="flex items-center gap-3 px-4"
            >
              <MessageCircle className="w-7 h-7" />
              <span>{t('chatbot.button')}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};