import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FloatingPetals from './components/FloatingPetals';
import StepNavigator from './components/StepNavigator';
import HeroSection from './components/HeroSection';
import RakhiPuzzle from './components/RakhiPuzzle';
import RakhiCeremony from './components/RakhiCeremony';
import BrotherSisterCards from './components/BrotherSisterCards';
import SiblingQuiz from './components/SiblingQuiz';
import SurpriseGift from './components/SurpriseGift';
import FinalSection from './components/FinalSection';
import GreetingCardModal from './components/GreetingCardModal';
import { festiveAudio } from './utils/audio';
import { triggerCelebrationCannons } from './utils/confetti';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [petalsActive, setPetalsActive] = useState(true);
  const [cardModalOpen, setCardModalOpen] = useState(false);

  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep = () => {
    festiveAudio.playSparkle();
    if (currentStep < 7) {
      goToStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    festiveAudio.playSparkle();
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const handleCelebrateAgain = () => {
    festiveAudio.playSparkle();
    triggerCelebrationCannons(3500);
    goToStep(1);
  };

  return (
    <div className="app-root">
      {/* Background Falling Marigold Petals & Sparkles */}
      <FloatingPetals active={petalsActive} />

      {/* Floating Festive Header */}
      <Navbar 
        currentStep={currentStep}
        onSelectStep={goToStep}
        onOpenCardModal={() => setCardModalOpen(true)}
        petalsActive={petalsActive}
        setPetalsActive={setPetalsActive}
      />

      {/* Main Festive Content Journey Area */}
      <main className="main-content-journey">
        {/* Step Progress Tracker */}
        <StepNavigator 
          currentStep={currentStep} 
          onSelectStep={goToStep} 
        />

        {/* Screen Stage Container with smooth transition animations */}
        <div className="screens-wrapper">
          {/* Screen 1: Welcome Hero */}
          {currentStep === 1 && (
            <HeroSection onBeginCelebration={handleNextStep} />
          )}

          {/* Screen 2: 3x3 Rakhi Puzzle */}
          {currentStep === 2 && (
            <RakhiPuzzle 
              onNext={handleNextStep} 
              onPrev={handlePrevStep} 
            />
          )}

          {/* Screen 3: Virtual Rakhi Ritual */}
          {currentStep === 3 && (
            <RakhiCeremony 
              onNext={handleNextStep} 
              onPrev={handlePrevStep} 
            />
          )}

          {/* Screen 4: Brother & Sister Appreciation */}
          {currentStep === 4 && (
            <BrotherSisterCards 
              onNext={handleNextStep} 
              onPrev={handlePrevStep} 
            />
          )}

          {/* Screen 5: Brother vs Sister Sibling Fun Quiz */}
          {currentStep === 5 && (
            <SiblingQuiz 
              onNext={handleNextStep} 
              onPrev={handlePrevStep} 
            />
          )}

          {/* Screen 6: Surprise Keepsake Gift Box */}
          {currentStep === 6 && (
            <SurpriseGift 
              onNext={handleNextStep} 
              onPrev={handlePrevStep} 
              onOpenCardModal={() => setCardModalOpen(true)}
            />
          )}

          {/* Screen 7: Final Blessing & Celebrate Again */}
          {currentStep === 7 && (
            <FinalSection 
              onCelebrateAgain={handleCelebrateAgain}
              onPrev={handlePrevStep}
              onOpenCardModal={() => setCardModalOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Shareable E-Greeting Modal */}
      <GreetingCardModal 
        isOpen={cardModalOpen} 
        onClose={() => setCardModalOpen(false)} 
      />

      {/* Plain Text Watermark Overlay */}
      <div className="plain-watermark-overlay" aria-hidden="true">
        Tanish CodeStore
      </div>
    </div>
  );
}




