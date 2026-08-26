import React, { useState } from 'react';
import { Smile, Sparkles, HelpCircle, Check, RefreshCw, ArrowRight, ArrowLeft } from 'lucide-react';
import { festiveAudio } from '../utils/audio';

const SIBLING_QUESTIONS = [
  {
    id: 1,
    question: "Who is more likely to steal the last piece of chocolate? 🍫",
    brotherBtn: "Brother 😎",
    sisterBtn: "Sister 👑",
    responses: {
      brother: "He takes it, hides the wrapper, and blames the dog! 🐶😂",
      sister: "She claims she was 'just saving it from melting'! 🫠👑",
      both: "Honestly... probably both! And then they fight over the empty wrapper! 😂❤️"
    }
  },
  {
    id: 2,
    question: "Who takes 2 hours longer to get ready for a family function? 🪞",
    brotherBtn: "Brother 😎",
    sisterBtn: "Sister 👑",
    responses: {
      brother: "Takes 30 seconds to choose an outfit, but spends 45 minutes finding his shoes! 👞😂",
      sister: "Needs 2 hours for hair & makeup, plus 3 outfit changes before stepping out! 👗✨",
      both: "Family is waiting in the car honking for both of them! 🚗📢"
    }
  },
  {
    id: 3,
    question: "Who is the master of dramatic blackmail when they want a favor? 🕵️‍♂️",
    brotherBtn: "Brother 😎",
    sisterBtn: "Sister 👑",
    responses: {
      brother: "'If you don't do this, remember what happened last Tuesday?' 😈",
      sister: "'I'm telling Mom in 3... 2... 1...' (Works every single time!) 🗣️💥",
      both: "Mutual assured destruction: they both know too many classified secrets! 🤐🤝"
    }
  },
  {
    id: 4,
    question: "Who pretends to be an innocent angel when parents walk into the room? 😇",
    brotherBtn: "Brother 😎",
    sisterBtn: "Sister 👑",
    responses: {
      brother: "Suddenly starts reading a textbook upside down! 📖😂",
      sister: "Offers Mom water with the sweetest halo on her head! 🪽👑",
      both: "Instant Oscar-winning acting from both sides in 0.5 seconds! 🎭🏆"
    }
  },
  {
    id: 5,
    question: "Who always claims 'I never borrowed your stuff'? 👕",
    brotherBtn: "Brother 😎",
    sisterBtn: "Sister 👑",
    responses: {
      brother: "'What? This hoodie has always been in my wardrobe!' 🧥👀",
      sister: "'I didn't take it, I'm just keeping it safe on my shelf!' 💅📦",
      both: "Wardrobes are public property in a Brother & Sister household! 🏡🔄"
    }
  }
];

export default function SiblingQuiz({ onNext, onPrev }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelect = (qId, choice) => {
    festiveAudio.playSparkle();
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: choice
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <section id="quiz" className="quiz-section screen-stage animate-screen-enter">
      <div className="section-header">
        <div className="section-badge">
          <Smile size={16} />
          <span>Screen 5 • Brother vs Sister Fun</span>
        </div>
        <h2 className="section-title">Brother vs Sister 😄</h2>
        <p className="section-subtitle">
          Vote on hilarious sibling dilemmas and reveal the undeniable truth!
        </p>
      </div>

      <div className="quiz-container">
        {SIBLING_QUESTIONS.map((q, index) => {
          const userChoice = selectedAnswers[q.id];

          return (
            <div key={q.id} className="quiz-card">
              <div className="quiz-question-header">
                <span className="question-number">Question {index + 1}</span>
                <h3 className="quiz-question-text">{q.question}</h3>
              </div>

              {/* Selection Buttons */}
              <div className="quiz-options-row">
                <button
                  onClick={() => handleSelect(q.id, 'brother')}
                  className={`quiz-btn brother-btn ${userChoice === 'brother' ? 'selected' : ''}`}
                >
                  <span>{q.brotherBtn}</span>
                  {userChoice === 'brother' && <Check size={18} />}
                </button>

                <button
                  onClick={() => handleSelect(q.id, 'sister')}
                  className={`quiz-btn sister-btn ${userChoice === 'sister' ? 'selected' : ''}`}
                >
                  <span>{q.sisterBtn}</span>
                  {userChoice === 'sister' && <Check size={18} />}
                </button>

                <button
                  onClick={() => handleSelect(q.id, 'both')}
                  className={`quiz-btn both-btn ${userChoice === 'both' ? 'selected' : ''}`}
                >
                  <span>Both! 🤝🤣</span>
                  {userChoice === 'both' && <Check size={18} />}
                </button>
              </div>

              {/* Playful Reveal Response */}
              {userChoice && (
                <div className="quiz-reveal-banner animate-fade-in">
                  <div className="reveal-emoji">😂❤️</div>
                  <div className="reveal-content">
                    <strong className="verdict-tag">Sibling Verdict:</strong>
                    <p className="verdict-text">{q.responses[userChoice]}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="quiz-controls-footer">
          {answeredCount > 0 && (
            <button onClick={handleResetQuiz} className="btn-secondary-festive btn-compact">
              <RefreshCw size={16} />
              <span>Reset Polls</span>
            </button>
          )}
        </div>

        {/* Screen Navigation Actions */}
        <div className="screen-nav-footer">
          <button onClick={onPrev} className="btn-secondary-festive btn-nav">
            <ArrowLeft size={18} />
            <span>Back to Siblings</span>
          </button>

          <button 
            onClick={onNext} 
            className="btn-primary-festive btn-large pulse-glow"
            id="continue-to-surprise-btn"
          >
            <span>Continue to Surprise Gift →</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

