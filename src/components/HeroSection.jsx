import React from 'react';
import { Sparkles, Heart, Flame, ArrowRight } from 'lucide-react';
import { festiveAudio } from '../utils/audio';

export default function HeroSection({ onBeginCelebration }) {
  const handleBegin = () => {
    festiveAudio.playSparkle();
    festiveAudio.startAmbientMusic();
    onBeginCelebration();
  };

  return (
    <section id="hero" className="hero-section screen-stage animate-screen-enter">
      {/* Decorative Traditional Floral Mandalas in Corners */}
      <div className="corner-mandala top-left"></div>
      <div className="corner-mandala top-right"></div>

      <div className="hero-content">
        {/* Auspicious Badge */}
        <div className="auspicious-badge">
          <span className="shloka-symbol">🪢</span>
          <span className="shloka-text">Auspicious Festival of Sibling Love & Protection</span>
          <span className="shloka-symbol">🪔</span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title">
          Happy Raksha Bandhan <span className="heart-emoji">❤️</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          “A bond of love, laughter, fights, and countless beautiful memories.”
        </p>

        {/* Sacred Shloka Mantra Banner */}
        <div className="sanskrit-mantra-card">
          <p className="mantra-sanskrit">
            ॥ येन बद्धो बली राजा दानवेन्द्रो महाबलः । तेन त्वामनुबध्नामि रक्षे मा चल मा चल ॥
          </p>
          <p className="mantra-meaning">
            "I tie upon you this sacred thread of protection, symbol of endless love and eternal blessings."
          </p>
        </div>

        {/* Hero Artwork Showcase */}
        <div className="hero-illustration-wrapper">
          <div className="illustration-golden-glow"></div>
          
          <div className="hero-image-frame">
            <img 
              src="/assets/rakhi-hero.jpg" 
              alt="Brother and Sister celebrating Raksha Bandhan with Rakhi and Diya" 
              className="hero-image"
              loading="eager"
            />
            {/* Ambient Floating Badges */}
            <div className="floating-diya-badge left">
              <span className="diya-icon">🪔</span>
              <div className="diya-text">
                <span className="title">Sacred Bond</span>
                <span className="desc">Tied with Love</span>
              </div>
            </div>

            <div className="floating-diya-badge right">
              <span className="diya-icon">✨</span>
              <div className="diya-text">
                <span className="title">Eternal Memories</span>
                <span className="desc">Brother & Sister</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="hero-cta-group">
          <button 
            onClick={handleBegin}
            className="btn-primary-festive btn-large pulse-glow"
            id="begin-celebration-btn"
          >
            <Sparkles className="icon-sparkle" size={20} />
            <span>Begin the Celebration ✨</span>
            <ArrowRight size={20} className="bounce-arrow-h" />
          </button>
        </div>
      </div>
    </section>
  );
}

