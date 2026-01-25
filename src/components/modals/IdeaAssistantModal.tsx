import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, CheckCircle, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toast } from '../../hooks/useToast';

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
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<any>({});
  const [email, setEmail] = useState('');
  const [customPainPoint, setCustomPainPoint] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const industries = ["E-Ticaret", "Sağlık", "Eğitim", "Hizmet", "Perakende"];
  const painPoints: Record<string, string[]> = {
    "E-Ticaret": ["Müşteri Desteği", "Sipariş Takibi", "Stok Yönetimi", "Pazarlama"],
    "Sağlık": ["Randevu Planlama", "Hasta Bilgilendirme", "Reçete Yenileme", "Raporlama"],
    "Eğitim": ["Öğrenci Kayıt", "Ders Programı", "Velilerle İletişim", "Materyal Dağıtımı"],
    "Hizmet": ["Teklif Hazırlama", "Müşteri İlişkileri (CRM)", "Proje Takibi", "Faturalandırma"],
    "Perakende": ["Envanter Kontrolü", "Personel Yönetimi", "Müşteri Sadakati", "Satış Raporları"],
    "Diğer": ["Müşteri İletişimi", "Satış ve Pazarlama", "Raporlama", "İnsan Kaynakları"]
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

    try {
      const webhookUrl = "https://n8n.mgldigitalmedia.com/webhook/bf1699eb-fa46-4088-91d5-90ce0cd33608";

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: currentSelections.industry,
          painPoint: currentSelections.painPoint
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      // n8n workflow returns raw text response
      const text = await response.text();
      setGeneratedIdea(text);
    } catch (error) {
      console.error("Webhook error:", error);
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
    const webhookUrl = 'https://mustafagl01.app.n8n.cloud/webhook-test/b258d591-af79-4580-9e8c-3c661256359b';
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selections, generatedIdea, email, name: 'Idea Assistant Lead' })
      });
      toast({ title: "Harika!", description: "Detaylı analiz en kısa sürede e-posta adresinize gönderilecektir." });
      setStep(3);
    } catch (error) {
      console.error("Lead capture webhook error:", error);
      toast({ title: "Hata!", description: "Bir sorun oluştu, lütfen daha sonra tekrar deneyin.", variant: "destructive" });
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
              Merhaba! İşletmeniz için otomasyon potansiyelini keşfedelim. Hangi sektörde faaliyet gösteriyorsunuz?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {industries.map(ind => (
                <Button key={ind} variant="secondary" onClick={() => handleSelection('industry', ind)} className="text-sm sm:text-base py-2">
                  {ind}
                </Button>
              ))}
              <Button variant="secondary" onClick={() => handleSelection('industry', 'Diğer')} className="text-sm sm:text-base py-2">
                Diğer
              </Button>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div key={1} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              Harika, <strong>{selections.industry}</strong>. Peki en çok hangi alanda zaman kazanmak veya süreci iyileştirmek istersiniz?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {(painPoints[selections.industry] || painPoints['Diğer']).map(pp => (
                <Button key={pp} variant="secondary" onClick={() => handleSelection('painPoint', pp)} className="text-sm sm:text-base py-2">
                  {pp}
                </Button>
              ))}
              <Button variant="secondary" onClick={() => setStep(1.5)} className="text-sm sm:text-base py-2">
                Diğer (Açıklayın)
              </Button>
            </div>
          </motion.div>
        );
      case 1.5:
        return (
          <motion.div key={1.5} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              Lütfen otomatikleştirmek istediğiniz süreci kısaca açıklayın:
            </p>
            <form onSubmit={(e) => { e.preventDefault(); handleSelection('painPoint', customPainPoint); }} className="flex flex-col sm:flex-row gap-2">
              <Input
                value={customPainPoint}
                onChange={(e) => setCustomPainPoint(e.target.value)}
                placeholder="Örn: Gelen faturaları işlemek"
                className="text-sm sm:text-base"
              />
              <Button type="submit" className="text-sm sm:text-base">Gönder</Button>
            </form>
          </motion.div>
        );
      case 1.8:
        return (
          <motion.div key={1.8} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
            <div className="flex justify-center items-center gap-3">
              <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-base sm:text-lg text-gray-300">AI sizin için fikir üretiyor...</p>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key={2} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            {isError ? (
              <div>
                <p className="text-base sm:text-lg text-yellow-300 mb-4">
                  AI asistanımız anlık bir yoğunluk yaşıyor ve size özel bir fikir üretemedi.
                </p>
                <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg border border-slate-600 mb-4 sm:mb-6">
                  <p className="text-white text-sm sm:text-base">Bu sırada, otomasyonun gücünü görmek için canlı demolarımızı deneyebilirsiniz.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={onDemoRedirect} className="text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Canlı Demoları Gör
                  </Button>
                  <Button variant="secondary" onClick={resetState} className="text-sm sm:text-base">Baştan Başla</Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-base sm:text-lg text-gray-300 mb-4">
                  Anladım. <strong>{selections.painPoint}</strong> konusunda size yardımcı olabiliriz. İşte AI tarafından üretilen bir fikir:
                </p>
                <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg border border-slate-600 mb-4 sm:mb-6 min-h-[60px] sm:min-h-[80px] max-h-[200px] overflow-y-auto">
                  <p className="text-white text-sm sm:text-base leading-relaxed">{generatedIdea}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
                  <Button variant="outline" onClick={() => fetchAutomationIdea(selections)} disabled={isLoading} className="text-sm sm:text-base">
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Yeni Fikir Üret
                  </Button>
                  <Button variant="secondary" onClick={resetState} className="text-sm sm:text-base">Baştan Başla</Button>
                </div>
                <p className="text-base sm:text-lg text-gray-300 mb-4">Bu sadece bir mini demo! Gerçek projeleriniz için bizimle iletişime geçebilirsiniz.</p>
                <Button onClick={handleClose} className="w-full text-sm sm:text-base py-3">
                  Harika!
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