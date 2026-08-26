import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { festiveAudio } from '../utils/audio';

const STEPS = [
  { step: 1, title: 'Welcome', icon: '🪢', short: 'Start' },
  { step: 2, title: 'Puzzle', icon: '🧩', short: 'Puzzle' },
  { step: 3, title: 'Rakhi Ritual', icon: '🪔', short: 'Ritual' },
  { step: 4, title: 'Siblings', icon: '🧑👧', short: 'Siblings' },
  { step: 5, title: 'Fun Quiz', icon: '😄', short: 'Quiz' },
  { step: 6, title: 'Surprise', icon: '🎁', short: 'Surprise' },
  { step: 7, title: 'Blessings', icon: '✨', short: 'Blessings' },
];

export default function StepNavigator({ currentStep, onSelectStep, maxStepReached }) {
  const currentStepObj = STEPS.find((s) => s.step === currentStep) || STEPS[0];

  const handleStepClick = (step) => {
    festiveAudio.playSparkle();
    onSelectStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      handleStepClick(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 7) {
      handleStepClick(currentStep + 1);
    }
  };

  return (
    <div className="journey-tracker-container">
      <div className="journey-tracker-card">
        {/* Top Summary Info */}
        <div className="tracker-header">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="tracker-arrow-btn"
            aria-label="Previous step"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="tracker-current-info">
            <span className="tracker-step-badge">Step {currentStep} of 7</span>
            <span className="tracker-step-name">
              {currentStepObj.icon} {currentStepObj.title}
            </span>
          </div>

          <button 
            onClick={handleNext}
            disabled={currentStep === 7}
            className="tracker-arrow-btn"
            aria-label="Next step"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* 7 Interactive Step Track Pills */}
        <div className="tracker-progress-track">
          {STEPS.map((s) => {
            const isCurrent = s.step === currentStep;
            const isCompleted = s.step < currentStep;

            return (
              <button
                key={s.step}
                onClick={() => handleStepClick(s.step)}
                className={`tracker-step-dot ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                title={`Go to Step ${s.step}: ${s.title}`}
                aria-label={`Step ${s.step}: ${s.title}`}
              >
                <div className="dot-circle">
                  {isCompleted ? (
                    <Check size={13} className="check-icon-mini" />
                  ) : (
                    <span>{s.step}</span>
                  )}
                </div>
                <span className="dot-label">{s.short}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
