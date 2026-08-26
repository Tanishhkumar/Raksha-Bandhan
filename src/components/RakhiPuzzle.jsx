import React, { useState, useEffect } from 'react';
import { RotateCw, RotateCcw, Sparkles, CheckCircle2, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import { triggerFestiveConfetti, triggerCelebrationCannons } from '../utils/confetti';

export default function RakhiPuzzle({ onNext, onPrev }) {
  // 9 tiles with their current rotation angle in degrees: 0, 90, 180, 270
  // Solved condition is when every tile has (rotation % 360 === 0)
  const [rotations, setRotations] = useState([90, 180, 270, 180, 90, 270, 270, 90, 180]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Initialize random rotations on first mount (ensuring it's not solved initially)
  const randomizeTiles = () => {
    const validAngles = [90, 180, 270];
    const initialRotations = Array.from({ length: 9 }, () => {
      return validAngles[Math.floor(Math.random() * validAngles.length)];
    });
    // Ensure at least one tile is non-zero
    if (initialRotations.every((deg) => deg % 360 === 0)) {
      initialRotations[0] = 90;
      initialRotations[4] = 180;
    }
    setRotations(initialRotations);
    setMoves(0);
    setIsSolved(false);
  };

  useEffect(() => {
    randomizeTiles();
  }, []);

  // Handle clicking a puzzle tile
  const handleTileClick = (index) => {
    if (isSolved) return;

    festiveAudio.playTileRotate();

    setRotations((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] + 90) % 360;

      // Check if all 9 tiles are now at 0 degrees
      const allAligned = updated.every((deg) => deg === 0);
      if (allAligned) {
        setIsSolved(true);
        festiveAudio.playPuzzleWin();
        triggerFestiveConfetti();
        triggerCelebrationCannons(4000);
      }

      return updated;
    });

    setMoves((prev) => prev + 1);
  };

  // Auto-solve helper for testing or ease
  const handleQuickSolve = () => {
    festiveAudio.playPuzzleWin();
    setRotations([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setIsSolved(true);
    triggerFestiveConfetti();
    triggerCelebrationCannons(3000);
  };

  return (
    <section id="puzzle" className="puzzle-section screen-stage animate-screen-enter">
      <div className="section-header">
        <div className="section-badge">
          <Sparkles size={16} />
          <span>Screen 2 • Interactive Game</span>
        </div>
        <h2 className="section-title">Can you complete the Rakhi puzzle? 🧩</h2>
        <p className="section-subtitle">
          Tap each piece to rotate it into the correct position.
        </p>
      </div>

      <div className="puzzle-dashboard">
        {/* Game Stats & Controls Bar */}
        <div className="puzzle-controls-bar">
          <div className="stat-pill moves-pill">
            <span className="stat-label">Moves:</span>
            <span className="stat-value" id="puzzle-moves-count">{moves}</span>
          </div>

          <div className="puzzle-actions-group">
            <button 
              onClick={() => setShowPreview(!showPreview)} 
              className="btn-secondary-festive btn-compact"
              title="Peek the finished picture"
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{showPreview ? 'Hide' : 'Peek'}</span>
            </button>

            <button 
              onClick={randomizeTiles} 
              className="btn-secondary-festive btn-compact"
              title="Reset and shuffle puzzle"
              id="reset-puzzle-btn"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Peek Image Preview Card */}
        {showPreview && (
          <div className="puzzle-preview-card animate-fade-in">
            <p className="preview-label">🎯 Target Artwork</p>
            <img 
              src="/assets/rakhi-puzzle.jpg" 
              alt="Target Rakhi Artwork" 
              className="preview-img" 
            />
          </div>
        )}

        {/* 3x3 Click-to-Rotate Grid */}
        <div className={`puzzle-grid-wrapper ${isSolved ? 'solved-aura' : ''}`}>
          <div className="puzzle-grid-3x3" role="grid" aria-label="Raksha Bandhan 3x3 rotation puzzle">
            {rotations.map((rotation, index) => {
              const row = Math.floor(index / 3);
              const col = index % 3;
              const isTileAligned = rotation === 0;

              return (
                <div
                  key={index}
                  onClick={() => handleTileClick(index)}
                  className={`puzzle-tile ${isTileAligned ? 'aligned' : 'unaligned'}`}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                  role="gridcell"
                  tabIndex={0}
                  aria-label={`Tile ${index + 1}, row ${row + 1} column ${col + 1}, rotation ${rotation} degrees`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleTileClick(index);
                    }
                  }}
                >
                  <div
                    className="tile-image-inner"
                    style={{
                      backgroundImage: `url('/assets/rakhi-puzzle.jpg')`,
                      backgroundPosition: `${(col / 2) * 100}% ${(row / 2) * 100}%`,
                      backgroundSize: '300% 300%',
                    }}
                  />
                  {/* Subtle alignment indicator */}
                  {!isSolved && (
                    <div className={`tile-rotation-hint ${isTileAligned ? 'hint-correct' : ''}`}>
                      <RotateCw size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Solve Hint for ease */}
          {!isSolved && (
            <div className="puzzle-hint-text">
              <span>💡 Tap tiles to spin them 90° clockwise!</span>
              <button onClick={handleQuickSolve} className="quick-solve-btn" title="Auto Solve for instant testing">
                ✨ Auto Solve
              </button>
            </div>
          )}
        </div>

        {/* Success Modal / Card on Puzzle Completion */}
        {isSolved ? (
          <div className="puzzle-success-card animate-bounce-in" id="puzzle-success-message">
            <div className="success-header">
              <div className="success-icon-badge">
                <CheckCircle2 size={36} className="text-emerald-500" />
              </div>
              <h3 className="success-title">Puzzle Complete! 🎉</h3>
            </div>

            <p className="success-quote">
              “Just like these pieces, every little moment makes the bond between a Brother and Sister complete. ❤️”
            </p>

            <div className="success-meta">
              <span>Solved in <strong>{moves}</strong> moves! 🌟</span>
            </div>

            <div className="success-actions">
              <button 
                onClick={onNext}
                className="btn-primary-festive btn-large pulse-glow continue-btn"
                id="continue-celebration-btn"
              >
                <span>Continue to Rakhi Ritual →</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        ) : (
          /* Screen Bottom Navigation (Back / Skip) */
          <div className="screen-nav-footer">
            <button onClick={onPrev} className="btn-secondary-festive btn-nav">
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <button onClick={onNext} className="btn-secondary-festive btn-nav">
              <span>Skip to Ritual</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

