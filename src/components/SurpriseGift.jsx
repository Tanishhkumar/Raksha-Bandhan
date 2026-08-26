import React, { useState } from 'react';
import { Gift, Heart, Sparkles, Send, RefreshCw, ArrowRight, ArrowLeft } from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import { triggerFestiveConfetti, triggerHeartsBurst, triggerCelebrationCannons } from '../utils/confetti';

export default function SurpriseGift({ onNext, onPrev, onOpenCardModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    festiveAudio.playGiftOpen();
    setIsOpen(true);
    triggerHeartsBurst();
    triggerFestiveConfetti();
    triggerCelebrationCannons(3500);
  };

  const handleCloseGift = () => {
    setIsOpen(false);
  };

  return (
    <section id="surprise" className="surprise-section screen-stage animate-screen-enter">
      <div className="section-header">
        <div className="section-badge">
          <Gift size={16} />
          <span>Screen 6 • Auspicious Shagun</span>
        </div>
        <h2 className="section-title">A Little Surprise For You 🎁</h2>
        <p className="section-subtitle">
          Unwrap the special keepsake message prepared for Brother & Sister.
        </p>
      </div>

      <div className="surprise-container">
        {!isOpen ? (
          /* Closed Gift Box Presentation */
          <div className="gift-box-wrapper animate-float">
            <div className="gift-box-art-frame">
              <img 
                src="/assets/gift-box.jpg" 
                alt="Festive Rakhi Gift Box" 
                className="gift-box-image" 
              />
              <div className="gift-glow-halo"></div>
            </div>

            <button 
              onClick={handleOpenGift}
              className="btn-primary-festive btn-large btn-open-gift pulse-glow"
              id="open-surprise-btn"
            >
              <Sparkles size={22} />
              <span>Open the Surprise ✨</span>
            </button>

            {/* Back navigation when closed */}
            <div className="screen-nav-footer">
              <button onClick={onPrev} className="btn-secondary-festive btn-nav">
                <ArrowLeft size={18} />
                <span>Back to Fun Quiz</span>
              </button>

              <button onClick={onNext} className="btn-secondary-festive btn-nav">
                <span>Skip to Final Blessing</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* Opened Gift Box & Emotional Keepsake Card */
          <div className="gift-revealed-card animate-bounce-in" id="gift-revealed-content">
            <div className="revealed-header">
              <div className="sparkle-orbit">
                <span className="heart-burst">💖</span>
              </div>
              <div className="gift-tag-badge">
                <span>🎁 Special Rakhi Keepsake</span>
              </div>
            </div>

            <div className="revealed-quote-box">
              <p className="main-revealed-quote">
                “No matter how much a Brother and Sister fight, tease, or annoy each other, their bond remains forever. ❤️”
              </p>
              
              <h3 className="revealed-greeting">
                Happy Raksha Bandhan! 🌸
              </h3>

              <p className="sub-blessing">
                May your lives be blessed with happiness, good health, laughter, and unbreakable strength across all seasons of life.
              </p>
            </div>

            {/* Quick Actions inside revealed card */}
            <div className="revealed-actions">
              <button 
                onClick={onOpenCardModal}
                className="btn-primary-festive"
              >
                <Send size={18} />
                <span>Send Rakhi Wishes 💌</span>
              </button>

              <button 
                onClick={handleCloseGift}
                className="btn-secondary-festive"
              >
                <RefreshCw size={16} />
                <span>Wrap Box Again</span>
              </button>
            </div>

            {/* Screen Navigation Actions */}
            <div className="screen-nav-footer">
              <button onClick={onPrev} className="btn-secondary-festive btn-nav">
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>

              <button 
                onClick={onNext} 
                className="btn-primary-festive btn-large pulse-glow"
                id="continue-to-final-btn"
              >
                <span>Continue to Final Celebration →</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

