import React, { useState } from 'react';
import SectorSelector from './SectorSelector';
import BurnSimulator from './BurnSimulator';
import SavingsReveal from './SavingsReveal';
import ComparisonCards from './ComparisonCards';
import PackageDetails from './PackageDetails';
import VoiceButton from './VoiceButton';
import config from '../../data/profit-engine-config.json';

type Step = 'selector' | 'simulator' | 'savings' | 'details';

export default function ProfitEngine() {
  const [currentStep, setCurrentStep] = useState<Step>('selector');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [burnAmount, setBurnAmount] = useState(0);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});

  const handleSelectSector = (sectorId: string) => {
    setSelectedSector(sectorId);
    setCurrentStep('simulator');
  };

  const handleSimulatorContinue = (burn: number, values: Record<string, number>) => {
    setBurnAmount(burn);
    setSliderValues(values);
    setCurrentStep('savings');
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavingsContinue = () => {
    setCurrentStep('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestDemo = () => {
    // TODO: Implement demo request form
    window.location.href = 'mailto:info@mgldigitalmedia.com?subject=Demo Talebi&body=Merhaba, ' + selectedSector + ' sektörü için demo talep ediyorum.';
  };

  const handleBack = () => {
    setCurrentStep('selector');
    setSelectedSector('');
  };

  // Calculate values for voice button
  const sectorConfig = selectedSector ? config.sectors[selectedSector as keyof typeof config.sectors] : null;
  const monthlyPrice = sectorConfig?.package_price || 0;
  const yearlyPackageCost = monthlyPrice * 12;
  const savings = burnAmount - yearlyPackageCost;
  const oldCost = sectorConfig?.comparison.old_way_cost || 0;

  return (
    <div className="relative">
      {currentStep === 'selector' && (
        <SectorSelector onSelectSector={handleSelectSector} />
      )}

      {currentStep === 'simulator' && (
        <BurnSimulator
          sectorId={selectedSector}
          onContinue={handleSimulatorContinue}
          onBack={handleBack}
        />
      )}

      {currentStep === 'savings' && (
        <SavingsReveal
          sectorId={selectedSector}
          burnAmount={burnAmount}
          onContinue={handleSavingsContinue}
        />
      )}

      {currentStep === 'details' && (
        <div className="min-h-screen bg-[#0A0E27] px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-white text-center mb-12">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Karşılaştırma
              </span>
            </h2>
            
            <ComparisonCards sectorId={selectedSector} />
            
            <div className="mt-16">
              <PackageDetails
                sectorId={selectedSector}
                onRequestDemo={handleRequestDemo}
              />
            </div>
          </div>
        </div>
      )}

      {/* Voice Button - Show after sector is selected */}
      {selectedSector && currentStep !== 'selector' && (
        <VoiceButton
          sectorId={selectedSector}
          monthlyPrice={monthlyPrice}
          oldCost={oldCost}
          savings={savings}
        />
      )}
    </div>
  );
}