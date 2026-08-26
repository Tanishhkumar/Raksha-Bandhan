import React, { useState } from 'react';
import { X, Copy, Check, Share2, Heart, Sparkles, Send } from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import { triggerHeartsBurst, triggerFestiveConfetti } from '../utils/confetti';

const WISH_TEMPLATES = [
  {
    id: 1,
    title: "Classic Sibling Wish",
    text: "Happy Raksha Bandhan! ❤️\n\n“A bond of love, laughter, fights, and countless beautiful memories.”\n\nThrough every fight, joke, and crazy moment, the bond between a Brother and Sister remains forever unmatched. Wishing lifelong happiness, safety, and joy! 🪢🌸✨"
  },
  {
    id: 2,
    title: "Heartfelt & Emotional",
    text: "Happy Raksha Bandhan! 🪔❤️\n\n“No matter how much a Brother and Sister fight, tease, or annoy each other, their bond remains forever.”\n\nMay this sacred thread of Rakhi protect our bond and bring boundless joy and success in life. Happy Raksha Bandhan! 🌸🪢"
  },
  {
    id: 3,
    title: "Playful Sibling Banter",
    text: "Happy Raksha Bandhan! 😂👑\n\nTo the world's most annoying yet most beloved partner-in-crime: Thanks for keeping my secrets, stealing my food, and always having my back! Happy Raksha Bandhan! 🍫🎉"
  }
];

export default function GreetingCardModal({ isOpen, onClose }) {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentWish = WISH_TEMPLATES[selectedTemplateIndex];

  const handleCopy = () => {
    festiveAudio.playSparkle();
    navigator.clipboard.writeText(currentWish.text);
    setCopied(true);
    triggerHeartsBurst();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    festiveAudio.playSparkle();
    triggerFestiveConfetti();
    const url = window.location.origin;
    const shareText = encodeURIComponent(`${currentWish.text}\n\nExperience the interactive Raksha Bandhan celebration: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="card-modal-content animate-bounce-in" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-badge">
            <Sparkles size={16} />
            <span>Festive E-Greeting</span>
          </div>
          <h3 className="modal-title">Share Rakhi Wishes 💌</h3>
          <p className="modal-subtitle">
            Choose an auspicious message to share with Brother & Sister!
          </p>
        </div>

        {/* Template Selector Tabs */}
        <div className="wish-tabs-row">
          {WISH_TEMPLATES.map((tpl, idx) => (
            <button
              key={tpl.id}
              onClick={() => {
                festiveAudio.playSparkle();
                setSelectedTemplateIndex(idx);
              }}
              className={`wish-tab-btn ${selectedTemplateIndex === idx ? 'active' : ''}`}
            >
              {tpl.title}
            </button>
          ))}
        </div>

        {/* Card Preview */}
        <div className="wish-preview-card">
          <div className="preview-top-decor">🪢 ❤️ 🪔</div>
          <pre className="wish-preview-text">{currentWish.text}</pre>
          <div className="preview-bottom-decor">✨ Happy Raksha Bandhan ✨</div>
        </div>

        {/* Modal Action Buttons */}
        <div className="modal-actions-row">
          <button onClick={handleCopy} className="btn-copy-wish">
            {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Wish Text'}</span>
          </button>

          <button onClick={handleWhatsAppShare} className="btn-whatsapp-share">
            <Send size={18} />
            <span>Share via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
