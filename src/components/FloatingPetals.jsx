import React, { useEffect, useRef } from 'react';

export default function FloatingPetals({ active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create realistic marigold petals, rose petals, and golden sparkles
    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const particles = [];

    const petalColors = [
      '#F59E0B', // Marigold gold
      '#EA580C', // Saffron orange
      '#DC2626', // Deep crimson rose
      '#FBBF24', // Yellow marigold
      '#FEF08A'  // Pale golden shimmer
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 1.2 + 0.8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.6 + 0.35,
        isSparkle: Math.random() > 0.75
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.oscillation += p.oscillationSpeed;
        p.x += Math.sin(p.oscillation) * 1.2 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.isSparkle) {
          // Draw sparkling golden star
          ctx.fillStyle = '#FDE047';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#F59E0B';
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(Math.cos(((18 + i * 90) * Math.PI) / 180) * p.size * 0.8, -Math.sin(((18 + i * 90) * Math.PI) / 180) * p.size * 0.8);
            ctx.lineTo(Math.cos(((54 + i * 90) * Math.PI) / 180) * (p.size * 0.35), -Math.sin(((54 + i * 90) * Math.PI) / 180) * (p.size * 0.35));
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw organic curved petal shape
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 4;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.6, p.size * 1.2, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="floating-petals-canvas"
      aria-hidden="true"
    />
  );
}
