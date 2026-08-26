import confetti from 'canvas-confetti';

// Trigger festive Raksha Bandhan burst with gold, marigold, saffron, and crimson petals
export const triggerFestiveConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#D97706', '#EA580C', '#DC2626', '#F59E0B', '#FEF08A', '#E11D48']
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

// Continuous celebratory cannons from both sides
export const triggerCelebrationCannons = (durationMs = 3000) => {
  const end = Date.now() + durationMs;
  const colors = ['#D97706', '#EA580C', '#DC2626', '#F59E0B', '#F43F5E'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: colors
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

// Gentle heart and sparkle float
export const triggerHeartsBurst = () => {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: '❤️', scalar });
  const sparkle = confetti.shapeFromText({ text: '✨', scalar });
  const flower = confetti.shapeFromText({ text: '🌸', scalar });

  confetti({
    shapes: [heart, sparkle, flower],
    scalar,
    particleCount: 40,
    spread: 70,
    origin: { y: 0.6 }
  });
};
