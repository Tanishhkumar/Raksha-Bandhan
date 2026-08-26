import React, { useState } from 'react';
import { Sparkles, Heart, Flame, RotateCcw, Share2, ArrowLeft } from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import { triggerFestiveConfetti, triggerHeartsBurst, triggerCelebrationCannons } from '../utils/confetti';

export default function FinalSection({ onCelebrateAgain, onPrev, onOpenCardModal }) {
  const [diyaLit, setDiyaLit] = useState(true);

  const handleDiyaClick = () => {
    festiveAudio.playSparkle();
    triggerHeartsBurst();
    setDiyaLit(!diyaLit);
  };

  const handleRestart = () => {
    festiveAudio.playSparkle();
    triggerFestiveConfetti();
    triggerCelebrationCannons(3500);
    onCelebrateAgain();
  };

  return (
    <footer id="final" className="final-section screen-stage animate-screen-enter">
      <div className="final-overlay-glow"></div>

      <div className="final-content-box">
        {/* Sacred Aarti Diya Central Flame */}
        <div 
          className="sacred-diya-glow-container" 
          onClick={handleDiyaClick}
          title="Tap to toggle the eternal Diya flame"
        >
          <div className={`diya-vessel ${diyaLit ? 'flame-alive' : 'flame-dim'}`}>
            <span className="diya-emoji">🪔</span>
            {diyaLit && <div className="divine-light-radiance"></div>}
          </div>
          <span className="diya-caption">{diyaLit ? 'Eternal Flame of Love & Protection' : 'Tap to Light the Diya'}</span>
        </div>

        {/* Core Philosophical Quote */}
        <blockquote className="final-quote">
          “Some bonds are not meant to be explained, only celebrated. ❤️”
        </blockquote>

        {/* Festival Title */}
        <h2 className="final-title">Happy Raksha Bandhan</h2>

        {/* Sibling Blessing */}
        <p className="final-blessing-text">
          To every Brother & Sister, may your bond grow stronger with every memory, laughter, and prayer.
        </p>

        {/* Festive CTA Buttons */}
        <div className="final-actions-group">
          <button 
            onClick={handleRestart}
            className="btn-primary-festive btn-large pulse-glow btn-celebrate-again"
            id="celebrate-again-btn"
          >
            <RotateCcw size={20} />
            <span>Celebrate Again ✨</span>
          </button>

          <button 
            onClick={onOpenCardModal}
            className="btn-secondary-festive btn-large"
          >
            <Share2 size={18} />
            <span>Share Rakhi Blessing 💌</span>
          </button>
        </div>

        {/* Screen Navigation Actions */}
        <div className="screen-nav-footer">
          <button onClick={onPrev} className="btn-secondary-festive btn-nav">
            <ArrowLeft size={18} />
            <span>Back to Surprise</span>
          </button>
        </div>

        {/* Traditional Footer Credits & Auspicious Salutation */}
        <div className="final-footer-sub">
          <div className="traditional-divider">
            <span>🌸</span>
            <span>🪢</span>
            <span>🪔</span>
            <span>🪢</span>
            <span>🌸</span>
          </div>
          <p className="subtext">
            Celebrating the pure, eternal bond between Brother and Sister.
          </p>
          <p className="copyright-note">
            Made with deep affection & festive joy • Raksha Bandhan Special
          </p>
        </div>
      </div>
    </footer>
  );
}

