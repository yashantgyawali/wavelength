let _ac: AudioContext | null = null;
const ac = () => {
  if (!_ac) _ac = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  return _ac;
};

const playTone = (freq: number, dur: number, type: OscillatorType = 'sine', gain = 0.18) => {
  try {
    const ctx = ac();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + dur + 0.02);
  } catch {
    // audio not available
  }
};

export const sfx = {
  draw:   () => { playTone(420, 0.08, 'triangle'); setTimeout(() => playTone(640, 0.08, 'triangle'), 80); },
  thunk:  () => { playTone(140, 0.12, 'sawtooth', 0.22); setTimeout(() => playTone(90, 0.18, 'sine', 0.18), 60); },
  whoosh: () => { playTone(700, 0.15, 'sine', 0.12); setTimeout(() => playTone(450, 0.12, 'sine', 0.10), 80); },
  lock:   () => { playTone(880, 0.06, 'square', 0.10); },
  reveal: () => {
    playTone(523, 0.10, 'triangle');
    setTimeout(() => playTone(659, 0.10, 'triangle'), 100);
    setTimeout(() => playTone(784, 0.18, 'triangle'), 200);
  },
};
