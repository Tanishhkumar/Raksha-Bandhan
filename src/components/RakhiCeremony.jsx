import React, { useState } from 'react';
import { Heart, Sparkles, Flame, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import { triggerFestiveConfetti, triggerHeartsBurst, triggerCelebrationCannons } from '../utils/confetti';

export default function RakhiCeremony({ onNext, onPrev }) {
  const [rakhiTied, setRakhiTied] = useState(false);
  const [tilakApplied, setTilakApplied] = useState(false);
  const [sweetsShared, setSweetsShared] = useState(false);
  const [aartiDone, setAartiDone] = useState(false);

  const handleTieRakhi = () => {
    festiveAudio.playRakhiTie();
    setRakhiTied(true);
    triggerHeartsBurst();
    triggerFestiveConfetti();
  };

  const handleApplyTilak = () => {
    festiveAudio.playSparkle();
    setTilakApplied(true);
    triggerHeartsBurst();
  };

  const handleShareSweets = () => {
    festiveAudio.playSparkle();
    setSweetsShared(true);
    triggerHeartsBurst();
  };

  const handleAarti = () => {
    festiveAudio.playRakhiTie();
    setAartiDone(true);
    triggerFestiveConfetti();
  };

  const handleFullCeremony = () => {
    festiveAudio.playRakhiTie();
    setRakhiTied(true);
    setTilakApplied(true);
    setSweetsShared(true);
    setAartiDone(true);
    triggerFestiveConfetti();
    triggerHeartsBurst();
    triggerCelebrationCannons(3500);
  };

  return (
    <section id="ceremony" className="ceremony-section screen-stage animate-screen-enter">
      <div className="section-header">
        <div className="section-badge">
          <span className="badge-icon">🪢</span>
          <span>Screen 3 • Virtual Rakhi Ritual</span>
        </div>
        <h2 className="section-title">A Rakhi Tied With Love ❤️</h2>
        <p className="section-subtitle">
          Perform the auspicious ritual steps and celebrate the eternal sacred bond.
        </p>
      </div>

      <div className="ceremony-container">
        {/* Virtual Puja Thali Presentation */}
        <div className="thali-display-card">
          <div className={`pooja-thali-plate ${aartiDone ? 'aarti-glowing' : ''}`}>
            {/* Center Sacred Rakhi */}
            <div className={`sacred-rakhi-thread ${rakhiTied ? 'thread-tied-anim' : ''}`}>
              <div className="rakhi-centerpiece">
                <div className="center-gem">💎</div>
                <div className="golden-petals-ring"></div>
                <div className="silk-cushion-ring"></div>
              </div>
              {/* Auspicious Red & Gold Thread Ends */}
              <div className={`thread-string left ${rakhiTied ? 'tied' : ''}`}></div>
              <div className={`thread-string right ${rakhiTied ? 'tied' : ''}`}></div>
            </div>

            {/* Tilak Pot with Kumkum & Rice */}
            <div className={`thali-item tilak-pot ${tilakApplied ? 'active-glow' : ''}`}>
              <div className="tilak-icon">🔴</div>
              <span className="item-label">Kumkum & Akshat</span>
              {tilakApplied && <span className="applied-tag">Applied ✓</span>}
            </div>

            {/* Glowing Brass Diya */}
            <div className={`thali-item diya-lamp ${aartiDone ? 'active-flame' : ''}`}>
              <div className="diya-flame-anim">🔥</div>
              <span className="item-label">Sacred Diya</span>
            </div>

            {/* Sweets (Ladoo) */}
            <div className={`thali-item sweets-plate ${sweetsShared ? 'active-glow' : ''}`}>
              <div className="sweets-icon">🍯</div>
              <span className="item-label">Sweet Ladoos</span>
              {sweetsShared && <span className="applied-tag">Shared ✓</span>}
            </div>
          </div>

          {/* Interactive Ceremony Actions */}
          <div className="ceremony-buttons-grid">
            <button 
              onClick={handleApplyTilak} 
              className={`ceremony-step-btn ${tilakApplied ? 'step-completed' : ''}`}
            >
              <span className="step-emoji">🔴</span>
              <div className="step-text">
                <strong>1. Apply Tilak</strong>
                <span>Auspicious blessings</span>
              </div>
              {tilakApplied && <Check size={18} className="check-icon" />}
            </button>

            <button 
              onClick={handleTieRakhi} 
              className={`ceremony-step-btn ${rakhiTied ? 'step-completed' : ''}`}
              id="tie-rakhi-btn"
            >
              <span className="step-emoji">🪢</span>
              <div className="step-text">
                <strong>2. Tie Rakhi</strong>
                <span>Sacred thread of protection</span>
              </div>
              {rakhiTied && <Check size={18} className="check-icon" />}
            </button>

            <button 
              onClick={handleShareSweets} 
              className={`ceremony-step-btn ${sweetsShared ? 'step-completed' : ''}`}
            >
              <span className="step-emoji">🍯</span>
              <div className="step-text">
                <strong>3. Offer Sweets</strong>
                <span>Sweetness in life</span>
              </div>
              {sweetsShared && <Check size={18} className="check-icon" />}
            </button>

            <button 
              onClick={handleAarti} 
              className={`ceremony-step-btn ${aartiDone ? 'step-completed' : ''}`}
            >
              <span className="step-emoji">🪔</span>
              <div className="step-text">
                <strong>4. Perform Aarti</strong>
                <span>Prayers for happiness</span>
              </div>
              {aartiDone && <Check size={18} className="check-icon" />}
            </button>
          </div>

          {/* Quick Perform All Button */}
          {(!rakhiTied || !tilakApplied || !sweetsShared || !aartiDone) && (
            <button onClick={handleFullCeremony} className="btn-perform-all">
              ✨ Complete Full Auspicious Ritual
            </button>
          )}

          {/* Festive Rakhi Tied Proclamation */}
          <div className="rakhi-blessing-proclamation">
            <div className="proclamation-banner">
              <span className="ornament">🏵️</span>
              <h3 className="proclamation-title">
                Happy Raksha Bandhan, Brother & Sister! 🪢❤️
              </h3>
              <span className="ornament">🏵️</span>
            </div>
            <p className="proclamation-sub">
              May the sacred thread forever protect and strengthen this incomparable bond of love.
            </p>
          </div>

          {/* Screen Navigation Actions */}
          <div className="screen-nav-footer">
            <button onClick={onPrev} className="btn-secondary-festive btn-nav">
              <ArrowLeft size={18} />
              <span>Back to Puzzle</span>
            </button>

            <button 
              onClick={onNext} 
              className="btn-primary-festive btn-large pulse-glow"
              id="continue-to-siblings-btn"
            >
              <span>Continue to Brother & Sister →</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

