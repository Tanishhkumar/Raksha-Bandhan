import React, { useState } from 'react';
import { Heart, Shield, Sparkles, Smile, Star, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import { triggerHeartsBurst } from '../utils/confetti';

export default function BrotherSisterCards({ onNext, onPrev }) {
  const [brotherHearts, setBrotherHearts] = useState(108);
  const [sisterHearts, setSisterHearts] = useState(108);
  const [brotherLiked, setBrotherLiked] = useState(false);
  const [sisterLiked, setSisterLiked] = useState(false);

  const handleBrotherHeart = () => {
    festiveAudio.playSparkle();
    triggerHeartsBurst();
    setBrotherHearts((prev) => prev + 1);
    setBrotherLiked(true);
    setTimeout(() => setBrotherLiked(false), 800);
  };

  const handleSisterHeart = () => {
    festiveAudio.playSparkle();
    triggerHeartsBurst();
    setSisterHearts((prev) => prev + 1);
    setSisterLiked(true);
    setTimeout(() => setSisterLiked(false), 800);
  };

  return (
    <section id="siblings" className="siblings-section screen-stage animate-screen-enter">
      <div className="section-header">
        <div className="section-badge">
          <Heart size={16} className="text-red-500" />
          <span>Screen 4 • Heartfelt Appreciation</span>
        </div>
        <h2 className="section-title">A Bond Beyond Words ❤️</h2>
        <p className="section-subtitle">
          Dedicated to the eternal companions of childhood and lifelong pillars of support.
        </p>
      </div>

      <div className="sibling-cards-grid">
        {/* Brother Card */}
        <div className="sibling-card brother-card">
          <div className="card-ornament top-right">🪢</div>
          
          <div className="card-image-wrapper">
            <img 
              src="/assets/brother.jpg" 
              alt="Portrait representing Brother" 
              className="sibling-avatar"
            />
            <div className="avatar-tag brother-tag">
              <span>🧑 For Brother</span>
            </div>
          </div>

          <div className="card-body">
            <h3 className="card-title">To Brother 🧑</h3>
            <p className="card-quote">
              “Through every fight, every joke, and every crazy moment, a brother is always a special part of life.”
            </p>

            {/* Sibling Character Badges */}
            <div className="traits-container">
              <span className="trait-pill">🛡️ The Silent Protector</span>
              <span className="trait-pill">🤝 Partner in Crime</span>
              <span className="trait-pill">🗝️ Secret Vault</span>
              <span className="trait-pill">🍕 Remote Controller Thief</span>
            </div>

            {/* Interactive Love Button */}
            <div className="card-footer-action">
              <button 
                onClick={handleBrotherHeart}
                className={`btn-heart-reaction ${brotherLiked ? 'heart-pump' : ''}`}
                aria-label="Send love to Brother"
              >
                <Heart size={20} className="heart-icon fill-red-500 text-red-500" />
                <span>Send Love ({brotherHearts})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sister Card */}
        <div className="sibling-card sister-card">
          <div className="card-ornament top-right">🌸</div>

          <div className="card-image-wrapper">
            <img 
              src="/assets/sister.jpg" 
              alt="Portrait representing Sister" 
              className="sibling-avatar"
            />
            <div className="avatar-tag sister-tag">
              <span>👧 For Sister</span>
            </div>
          </div>

          <div className="card-body">
            <h3 className="card-title">To Sister 👧</h3>
            <p className="card-quote">
              “A sister brings laughter, memories, care, and a bond that stays forever.”
            </p>

            {/* Sibling Character Badges */}
            <div className="traits-container">
              <span className="trait-pill">✨ Chief Mood Lifter</span>
              <span className="trait-pill">👑 The Drama Queen</span>
              <span className="trait-pill">💖 Endless Compassion</span>
              <span className="trait-pill">🍫 Midnight Snack Master</span>
            </div>

            {/* Interactive Love Button */}
            <div className="card-footer-action">
              <button 
                onClick={handleSisterHeart}
                className={`btn-heart-reaction ${sisterLiked ? 'heart-pump' : ''}`}
                aria-label="Send love to Sister"
              >
                <Heart size={20} className="heart-icon fill-red-500 text-red-500" />
                <span>Send Love ({sisterHearts})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Navigation Actions */}
      <div className="screen-nav-footer max-w-cards">
        <button onClick={onPrev} className="btn-secondary-festive btn-nav">
          <ArrowLeft size={18} />
          <span>Back to Ritual</span>
        </button>

        <button 
          onClick={onNext} 
          className="btn-primary-festive btn-large pulse-glow"
          id="continue-to-quiz-btn"
        >
          <span>Continue to Brother vs Sister →</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

