import { DialView, type DialStyle } from '../Dial';
import type { Prompt } from '../../data/prompts';

const btnPrimary: React.CSSProperties = {
  fontFamily: 'Atkinson Hyperlegible, sans-serif', fontWeight: 700,
  background: '#F16147', color: '#FFFFFF',
  border: 0, borderRadius: 14,
  padding: '16px 22px', fontSize: 17,
  transform: 'rotate(-0.88deg)',
  boxShadow: '5px 5px 0 0 #F3B952, 0 0 0 2px #130D01',
  cursor: 'pointer', width: '100%',
};

const btnReveal: React.CSSProperties = {
  fontFamily: 'Atkinson Hyperlegible, sans-serif', fontWeight: 700,
  background: '#F3B952', color: '#130D01',
  border: '2px solid #130D01', borderRadius: 14,
  padding: '12px 22px', fontSize: 15,
  transform: 'rotate(0.5deg)',
  boxShadow: '3px 3px 0 0 #F16147',
  cursor: 'pointer', width: '100%',
};

interface GuesserScreenProps {
  prompt: Prompt;
  value: number;
  onChange: (v: number) => void;
  dialStyle: DialStyle;
  onLock: () => void;
  promptRevealed: boolean;
  onRevealPrompt: () => void;
}

export function GuesserScreen({ value, onChange, dialStyle, onLock, promptRevealed, onRevealPrompt }: GuesserScreenProps) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <div style={{ width: '78%', maxWidth: 280 }}>
          <DialView style={dialStyle} value={value} onChange={onChange} target={0} showTarget={false} />
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 18px 30px' }}>
        {!promptRevealed && (
          <button onClick={onRevealPrompt} style={btnReveal}>
            reveal the prompt ✦
          </button>
        )}
        <button onClick={onLock} style={btnPrimary}>
          lock in my guess
        </button>
      </div>
    </>
  );
}
