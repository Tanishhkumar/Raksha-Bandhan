// Web Audio API Synthesizer for rich Indian festive ambiance, chimes, and sound effects

class FestiveAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientPlaying = false;
    this.ambientGain = null;
    this.ambientInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
    } else if (!this.isMuted && this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Soft rotation sound when puzzle tile turns
  playTileRotate() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      // Harmonic chime
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      // Audio fallback
    }
  }

  // Triumphant festive sitar/bell flourish when puzzle is solved
  playPuzzleWin() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Raga Bhupali notes (Sa Re Ga Pa Dha Sa: C, D, E, G, A, C)
      const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      const now = this.ctx.currentTime;

      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        const startTime = now + index * 0.08;
        const duration = 0.6;

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch (e) {}
  }

  // Sacred Rakhi tying chime (Auspicious Shankh / Temple Bell harmonic)
  playRakhiTie() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const freqs = [330, 440, 550, 660];
      const now = this.ctx.currentTime;

      freqs.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.8);
      });
    } catch (e) {}
  }

  // Playful sparkle sound for quiz selection & hearts
  playSparkle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.18);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  // Magical box opening whoosh + sparkle
  playGiftOpen() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];

      chords.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.05);

        gain.gain.setValueAtTime(0.2, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 1.2);
      });
    } catch (e) {}
  }

  // Ambient gentle meditative Indian drone (Tanpura harmony)
  startAmbientMusic() {
    if (this.ambientPlaying) return;
    this.init();
    if (!this.ctx) return;

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.06, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);

      const playDronePluck = () => {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        const root = 146.83; // D3
        const fifth = 220.00; // A3
        const high = 293.66; // D4

        [root, fifth, high, root * 2].forEach((f, idx) => {
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + idx * 0.8);

          noteGain.gain.setValueAtTime(0.08, now + idx * 0.8);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.8 + 2.5);

          osc.connect(noteGain);
          noteGain.connect(this.ambientGain);

          osc.start(now + idx * 0.8);
          osc.stop(now + idx * 0.8 + 2.5);
        });
      };

      playDronePluck();
      this.ambientInterval = setInterval(playDronePluck, 4500);
      this.ambientPlaying = true;
    } catch (e) {}
  }

  stopAmbientMusic() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    this.ambientPlaying = false;
  }
}

export const festiveAudio = new FestiveAudioEngine();
