import { useState, useEffect } from 'react';
import { DialView, type DialStyle } from '../Dial';
import { sfx } from '../../hooks/useSound';
import type { Prompt } from '../../data/prompts';

export const scoreFor = (guess: number, target: number) => {
  const d = Math.abs(guess - target);
  if (d <= 0.04) return 4;
  if (d <= 0.10) return 3;
  return 0;
};

const btnPrimary: React.CSSProperties = {
  fontFamily: 'Atkinson Hyperlegible, sans-serif', fontWeight: 700,
  background: '#F16147', color: '#FFFFFF',
  border: 0, borderRadius: 14,
  padding: '16px 22px', fontSize: 17,
  transform: 'rotate(-0.88deg)',
  boxShadow: '5px 5px 0 0 #F3B952, 0 0 0 2px #130D01',
  cursor: 'pointer', flex: 2,
};

const btnSecondary: React.CSSProperties = {
  fontFamily: 'Atkinson Hyperlegible, sans-serif', fontWeight: 700,
  background: '#FAF1E4', color: '#130D01',
  border: '2px solid #130D01', borderRadius: 14,
  padding: '16px 22px', fontSize: 17,
  transform: 'rotate(-0.88deg)',
  boxShadow: '5px 5px 0 0 #D68057',
  cursor: 'pointer', flex: 1,
};

interface RevealScreenProps {
  prompt: Prompt;
  guess: number;
  target: number;
  dialStyle: DialStyle;
  onNext: () => void;
  onHome: () => void;
  soundOn: boolean;
}

export function RevealScreen({ guess, target, dialStyle, onNext, onHome, soundOn }: RevealScreenProps) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setShow(true);
      if (soundOn) sfx.reveal();
    }, 250);
    return () => clearTimeout(t);
  }, [soundOn]);

  const score = scoreFor(guess, target);
  const scoreColor = score >= 3 ? '#F16147' : '#5A3A1F';

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <div style={{ width: '78%', maxWidth: 280, opacity: show ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <DialView style={dialStyle} value={guess} onChange={() => {}} target={target} showTarget disabled />
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ padding: '0 18px 30px' }}>
        <div style={{
          textAlign: 'center',
          fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 56,
          color: scoreColor, marginBottom: 14, marginTop: 8,
          transform: 'rotate(-0.88deg)',
          opacity: show ? 1 : 0, transition: 'opacity 0.5s ease 0.25s',
        }}>
          +{score} {score === 4 ? '🎯' : ''}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onHome} style={btnSecondary}>menu</button>
          <button onClick={onNext} style={btnPrimary}>next round →</button>
        </div>
      </div>
    </>
  );
}
