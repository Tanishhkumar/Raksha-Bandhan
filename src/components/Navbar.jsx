import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Share2, Menu, X } from 'lucide-react';
import { festiveAudio } from '../utils/audio';

const SCREENS = [
  { step: 1, label: 'Welcome', icon: '🪢' },
  { step: 2, label: 'Puzzle', icon: '🧩' },
  { step: 3, label: 'Rakhi Ritual', icon: '🪔' },
  { step: 4, label: 'Brother & Sister', icon: '🧑👧' },
  { step: 5, label: 'Fun Quiz', icon: '😄' },
  { step: 6, label: 'Surprise', icon: '🎁' },
  { step: 7, label: 'Blessings', icon: '✨' },
];

export default function Navbar({ currentStep, onSelectStep, onOpenCardModal, petalsActive, setPetalsActive }) {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const muted = festiveAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      festiveAudio.startAmbientMusic();
    }
  };

  const handleStepClick = (step) => {
    festiveAudio.playSparkle();
    onSelectStep(step);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-container">
      <div className="navbar-glass">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => handleStepClick(1)}>
          <span className="brand-icon">🪢</span>
          <div className="brand-text">
            <span className="brand-title">Raksha Bandhan</span>
            <span className="brand-subtitle">Interactive Celebration</span>
          </div>
        </div>

        {/* Desktop Step Nav Links */}
        <nav className="desktop-nav">
          {SCREENS.map((s) => (
            <button
              key={s.step}
              onClick={() => handleStepClick(s.step)}
              className={`nav-link ${currentStep === s.step ? 'active-nav-link' : ''}`}
            >
              <span>{s.icon} {s.label}</span>
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Petals Toggle */}
          <button 
            onClick={() => setPetalsActive(!petalsActive)} 
            className={`action-btn ${petalsActive ? 'active' : ''}`}
            title={petalsActive ? 'Disable falling petals' : 'Enable falling petals'}
            aria-label="Toggle falling petals"
          >
            <Sparkles size={16} className={petalsActive ? 'text-amber-500' : ''} />
            <span className="action-btn-text">Petals</span>
          </button>

          {/* Music Toggle */}
          <button 
            onClick={handleAudioToggle} 
            className={`action-btn ${!isMuted ? 'active' : ''}`}
            title={isMuted ? 'Unmute Festive Music' : 'Mute Music'}
            aria-label="Toggle festive sound"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="pulse-sound" />}
            <span className="action-btn-text">{isMuted ? 'Muted' : 'Music'}</span>
          </button>

          {/* Share Button */}
          <button 
            onClick={onOpenCardModal} 
            className="action-btn share-btn"
            title="Create & Share Festive Greeting"
          >
            <Share2 size={16} />
            <span className="action-btn-text">Share</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown animate-fade-in">
          <div className="mobile-menu-header">
            <span>Celebration Journey Steps</span>
          </div>
          {SCREENS.map((s) => (
            <button
              key={s.step}
              onClick={() => handleStepClick(s.step)}
              className={`mobile-link ${currentStep === s.step ? 'active-mobile-link' : ''}`}
            >
              <span className="mobile-link-step">Step {s.step}</span>
              <span className="mobile-link-title">{s.icon} {s.label}</span>
            </button>
          ))}
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenCardModal(); }} 
            className="mobile-link highlight"
          >
            💌 Send Festive Rakhi Greeting Card
          </button>
        </div>
      )}
    </header>
  );
}

