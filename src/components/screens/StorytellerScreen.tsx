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

interface StorytellerScreenProps {
  prompt: Prompt;
  target: number;
  dialStyle: DialStyle;
  onPass: () => void;
}

export function StorytellerScreen({ target, dialStyle, onPass }: StorytellerScreenProps) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <div style={{ width: '78%', maxWidth: 280 }}>
          <DialView style={dialStyle} value={target} onChange={() => {}} target={target} showTarget disabled />
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 18px 30px' }}>
        <div style={{ textAlign: 'center', fontFamily: 'Patrick Hand, cursive', fontSize: 16, color: '#5A3A1F', padding: '0 12px' }}>
          give a clue that lands on the target — then pass the phone.
        </div>
        <button onClick={onPass} style={btnPrimary}>
          got it · hide the target
        </button>
      </div>
    </>
  );
}
