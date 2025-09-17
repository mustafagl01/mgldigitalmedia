import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, CheckCircle, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toast } from '../../hooks/useToast';
import { useLanguage } from '../../contexts/LanguageContext';
import { insertLead } from '../../lib/supabase';

interface IdeaAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDemoRedirect: () => void;
}

export const IdeaAssistantModal: React.FC<IdeaAssistantModalProps> = ({ 
  isOpen, 
  onClose, 
  onDemoRedirect 
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<any>({});
  const [email, setEmail] = useState('');
  const [customPainPoint, setCustomPainPoint] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const industries = [
    t('modal.idea.industries.ecommerce'),
    t('modal.idea.industries.health'),
    t('modal.idea.industries.education'),
    t('modal.idea.industries.service'),
    t('modal.idea.industries.retail')
  ];
  
  const painPoints: Record<string, string[]> = {
    [t('modal.idea.industries.ecommerce')]: [
      t('modal.idea.painpoints.customer_support'),
      t('modal.idea.painpoints.order_tracking'),
      t('modal.idea.painpoints.inventory'),
      t('modal.idea.painpoints.marketing')
    ],
    [t('modal.idea.industries.health')]: [
      t('modal.idea.painpoints.appointments'),
      t('modal.idea.painpoints.patient_info'),
      t('modal.idea.painpoints.prescriptions'),
      t('modal.idea.painpoints.reporting')
    ],
    [t('modal.idea.industries.education')]: [
      t('modal.idea.painpoints.student_registration'),
      t('modal.idea.painpoints.scheduling'),
      t('modal.idea.painpoints.parent_communication'),
      t('modal.idea.painpoints.material_distribution')
    ],
    [t('modal.idea.industries.service')]: [
      t('modal.idea.painpoints.proposals'),
      t('modal.idea.painpoints.crm'),
      t('modal.idea.painpoints.project_tracking'),
      t('modal.idea.painpoints.billing')
    ],
    [t('modal.idea.industries.retail')]: [
      t('modal.idea.painpoints.inventory_control'),
      t('modal.idea.painpoints.staff_management'),
      t('modal.idea.painpoints.loyalty'),
      t('modal.idea.painpoints.sales_reports')
    ],
    [t('modal.idea.industries.other')]: [
      t('modal.idea.painpoints.communication'),
      t('modal.idea.painpoints.sales_marketing'),
      t('modal.idea.painpoints.reporting'),
      t('modal.idea.painpoints.hr')
    ]
  };

  const resetState = () => {
    setStep(0); 
    setSelections({}); 
    setEmail(''); 
    setCustomPainPoint(''); 
    setGeneratedIdea(''); 
    setIsError(false);
  };

  const handleClose = () => { 
    resetState(); 
    onClose(); 
  };

  const fetchAutomationIdea = async (currentSelections: any) => {
    setIsLoading(true);
    setIsError(false);
    setStep(1.8);
    const prompt = `Benim ${currentSelections.industry} sektöründe bir işletmem var ve en büyük problemim ${currentSelections.painPoint}. Bu problemi çözmek için bana yaratıcı, tek paragraflık bir AI otomasyon fikri öner. Fikir, n8n, WAPI, Twilio gibi araçlarla yapılabilir olmalı.`;
    
    try {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = "AIzaSyBoekQG5RzBGmMaT73quwOzahuOt253jRg";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      
      let text = "Harika bir seçim! Bu konuda size özel bir otomasyon çözümü sunabiliriz. Detaylı bilgi için e-posta adresinizi bırakmanız yeterli.";
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        text = result.candidates[0].content.parts[0].text;
      }
      setGeneratedIdea(text);
    } catch (error) {
      console.error("Gemini API error:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setStep(2);
    }
  };

  const handleSelection = (key: string, value: string) => {
    const newSelections = { ...selections, [key]: value };
    setSelections(newSelections);
    if (key === 'industry') setStep(1);
    else if (key === 'painPoint') fetchAutomationIdea(newSelections);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      // Save lead to Supabase database
      const leadData = {
        email: email,
        industry: selections.industry,
        pain_point: selections.painPoint,
        generated_idea: generatedIdea,
        source: 'idea_assistant'
      };

      const result = await insertLead(leadData);

      if (result.success) {
        console.log('Lead saved to database:', result.data);
        
        // Also send to n8n webhook (optional - for existing integrations)
        const webhookUrl = 'https://mustafagl01.app.n8n.cloud/webhook-test/b258d591-af79-4580-9e8c-3c661256359b';
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...selections, generatedIdea, email, name: 'Idea Assistant Lead' })
          });
        } catch (webhookError) {
          console.log('Webhook failed, but lead was saved to database:', webhookError);
        }
        
        toast({ title: t('toast.idea.success'), description: t('toast.idea.success.desc') });
        handleClose(); // Close modal instead of going to step 3
      } else {
        throw new Error(result.error?.message || 'Database save failed');
      }
    } catch (error) {
      console.error("Lead capture error:", error);
      toast({ title: t('toast.error'), description: t('toast.idea.error'), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key={0} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              {t('modal.idea.industry')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {industries.map(ind => (
                <Button key={ind} variant="secondary" onClick={() => handleSelection('industry', ind)} className="text-sm sm:text-base py-2">
                  {ind}
                </Button>
              ))}
              <Button variant="secondary" onClick={() => handleSelection('industry', t('modal.idea.industries.other'))} className="text-sm sm:text-base py-2">
                {t('modal.idea.industries.other')}
              </Button>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div key={1} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              {t('modal.idea.painpoint').replace('{industry}', selections.industry)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {(painPoints[selections.industry] || painPoints[t('modal.idea.industries.other')]).map(pp => (
                <Button key={pp} variant="secondary" onClick={() => handleSelection('painPoint', pp)} className="text-sm sm:text-base py-2">
                  {pp}
                </Button>
              ))}
              <Button variant="secondary" onClick={() => setStep(1.5)} className="text-sm sm:text-base py-2">
                {t('modal.idea.other_explain')}
              </Button>
            </div>
          </motion.div>
        );
      case 1.5:
        return (
          <motion.div key={1.5} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              {t('modal.idea.custom')}
            </p>
            <form onSubmit={(e) => { e.preventDefault(); handleSelection('painPoint', customPainPoint); }} className="flex flex-col sm:flex-row gap-2">
              <Input 
                value={customPainPoint} 
                onChange={(e) => setCustomPainPoint(e.target.value)} 
                placeholder={t('modal.idea.custom.placeholder')} 
                className="text-sm sm:text-base"
              />
              <Button type="submit" className="text-sm sm:text-base">{t('modal.idea.send')}</Button>
            </form>
          </motion.div>
        );
      case 1.8:
        return (
          <motion.div key={1.8} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
            <div className="flex justify-center items-center gap-3">
              <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-base sm:text-lg text-gray-300">{t('modal.idea.generating')}</p>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key={2} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            {isError ? (
              <div>
                <p className="text-base sm:text-lg text-yellow-300 mb-4">
                  {t('modal.idea.error')}
                </p>
                <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg border border-slate-600 mb-4 sm:mb-6">
                  <p className="text-white text-sm sm:text-base">{t('modal.idea.error.demo')}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={onDemoRedirect} className="text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 mr-2"/>
                    {t('modal.idea.error.button')}
                  </Button>
                  <Button variant="secondary" onClick={resetState} className="text-sm sm:text-base">{t('modal.idea.restart')}</Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-base sm:text-lg text-gray-300 mb-4">
                  {t('modal.idea.result').replace('{painPoint}', selections.painPoint)}
                </p>
                <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg border border-slate-600 mb-4 sm:mb-6 min-h-[60px] sm:min-h-[80px] max-h-[200px] overflow-y-auto">
                  <p className="text-white text-sm sm:text-base leading-relaxed">{generatedIdea}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
                  <Button variant="outline" onClick={() => fetchAutomationIdea(selections)} disabled={isLoading} className="text-sm sm:text-base">
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> 
                    {t('modal.idea.newIdea')}
                  </Button>
                  <Button variant="secondary" onClick={resetState} className="text-sm sm:text-base">{t('modal.idea.restart')}</Button>
                </div>
                <p className="text-base sm:text-lg text-gray-300 mb-4">{t('modal.idea.contact')}</p>
                <Button onClick={handleClose} className="w-full text-sm sm:text-base py-3">
                  {t('modal.idea.great')}
                </Button>
              </div>
            )}
          </motion.div>
        );
      case 3:
        return null; // Bu step artık kullanılmıyor
      default: 
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }} 
            onClick={(e) => e.stopPropagation()} 
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-4 sm:p-8 max-w-2xl w-full border border-slate-700 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <Button 
              variant="ghost" 
              onClick={handleClose} 
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white z-10"
            >
              ✕
            </Button>
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                <BrainCircuit className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="w-full">
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};