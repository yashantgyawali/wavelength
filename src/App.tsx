import { useState } from 'react';
import { WAVELENGTH_PROMPTS } from './data/prompts';
import { CurtainSlot } from './components/Curtain';
import { PromptCard } from './components/PromptCard';
import { RoleBadge } from './components/RoleBadge';
import { HomeScreen } from './components/screens/HomeScreen';
import { StorytellerScreen } from './components/screens/StorytellerScreen';
import { GuesserScreen } from './components/screens/GuesserScreen';
import { RevealScreen, scoreFor } from './components/screens/RevealScreen';
import { sfx } from './hooks/useSound';
import type { DialStyle } from './components/Dial';

type Phase = 'home' | 'storyteller' | 'pass' | 'guesser' | 'reveal';

const randomTarget = () => 0.12 + Math.random() * 0.76;
const randomPrompt = (lastIdx: number) => {
  let i = lastIdx;
  while (i === lastIdx) i = Math.floor(Math.random() * WAVELENGTH_PROMPTS.length);
  return i;
};

// Mobile-first full-screen layout — no iOS device frame wrapper in production
function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      maxWidth: 430,
      margin: '0 auto',
      background: '#FAF1E4',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `
        radial-gradient(circle at 12% 18%, rgba(241,97,71,0.05) 0 4px, transparent 4px),
        radial-gradient(circle at 78% 42%, rgba(243,185,82,0.07) 0 5px, transparent 5px),
        radial-gradient(circle at 36% 78%, rgba(90,58,31,0.04) 0 3px, transparent 3px)
      `,
      backgroundSize: '180px 180px',
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('home');
  const [promptIdx, setPromptIdx] = useState(0);
  const [target, setTarget] = useState(0.5);
  const [guess, setGuess] = useState(0.5);
  const [dialStyle] = useState<DialStyle>('curve');
  const [soundOn, setSoundOn] = useState(false);
  const [promptRevealed, setPromptRevealed] = useState(false);

  const prompt = WAVELENGTH_PROMPTS[promptIdx];

  const draw = () => {
    if (soundOn) sfx.draw();
    setPromptIdx(randomPrompt(promptIdx));
    setTarget(randomTarget());
    setGuess(0.5);
    setPhase('storyteller');
  };

  const goPass   = () => { if (soundOn) sfx.thunk();  setPhase('pass'); };
  const goGuess  = () => { if (soundOn) sfx.whoosh(); setPromptRevealed(false); setPhase('guesser'); };
  const goReveal = () => { if (soundOn) sfx.lock();   setPhase('reveal'); };
  const goHome   = () => setPhase('home');

  const skipPrompt = () => {
    if (soundOn) sfx.draw();
    setPromptIdx(randomPrompt(promptIdx));
    setTarget(randomTarget());
  };

  const roleInfo = (() => {
    if (phase === 'reveal') {
      const score = scoreFor(guess, target);
      return {
        text: 'reveal',
        sub: score === 4 ? 'दिमाग पढ्यो!  bullseye.' : score === 3 ? 'really close.' : 'wavelengths crossed.',
        color: '#F16147',
      };
    }
    if (phase === 'guesser') {
      return { text: 'guesser', sub: 'drag the dial to where you think it lands', color: '#130D01' };
    }
    return { text: 'storyteller', sub: 'only you can see the target', color: '#F16147' };
  })();

  return (
    <div style={{ width: '100vw', height: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF1E4' }}>
      <MobileShell>
        {/* persistent sound toggle */}
        <button
          onClick={() => setSoundOn(v => !v)}
          title={soundOn ? 'Sound on' : 'Sound off'}
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 30,
            background: soundOn ? '#F16147' : '#FAF1E4',
            color: soundOn ? '#FFFFFF' : '#5A3A1F',
            border: '2px solid #130D01',
            borderRadius: 999,
            width: 38, height: 38,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17,
            boxShadow: soundOn ? '3px 3px 0 0 #F3B952' : '3px 3px 0 0 #D68057',
            cursor: 'pointer',
            transform: 'rotate(-0.88deg)',
            transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
          }}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>

        {phase === 'home' ? (
          <HomeScreen onDraw={draw} />
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 52, position: 'relative' }}>
            {/* header */}
            <div style={{ padding: '0 18px' }}>
              <RoleBadge text={roleInfo.text} sub={roleInfo.sub} color={roleInfo.color} />
              {(phase !== 'guesser' || promptRevealed) && (
                <div style={{ marginTop: 14 }}>
                  <PromptCard prompt={prompt} />
                </div>
              )}
            </div>

            {/* dial + footer */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: 4 }}>
              {phase === 'reveal' ? (
                <RevealScreen
                  prompt={prompt} guess={guess} target={target}
                  dialStyle={dialStyle} onNext={draw} onHome={goHome} soundOn={soundOn}
                />
              ) : phase === 'guesser' ? (
                <GuesserScreen
                  prompt={prompt} value={guess} onChange={setGuess}
                  dialStyle={dialStyle} onLock={goReveal}
                  promptRevealed={promptRevealed} onRevealPrompt={() => setPromptRevealed(true)}
                />
              ) : (
                <StorytellerScreen
                  prompt={prompt} target={target}
                  dialStyle={dialStyle} onPass={goPass} onSkip={skipPrompt}
                />
              )}
            </div>

            {/* curtain overlay during pass phase */}
            <CurtainSlot active={phase === 'pass'}>
              <div style={{ color: '#F3B952', fontFamily: 'Patrick Hand, cursive', fontSize: 22, letterSpacing: '0.1em', marginBottom: 14 }}>
                ✦  curtain closed  ✦
              </div>
              <div style={{ color: '#FFFFFF', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 22, lineHeight: 1.2, marginBottom: 22, maxWidth: 280 }}>
                give your clue, then pass the phone to the guesser.
              </div>
              <button
                onClick={goGuess}
                style={{
                  background: '#F3B952', color: '#130D01', border: '2px solid #130D01',
                  borderRadius: 12, padding: '14px 22px',
                  fontFamily: 'Atkinson Hyperlegible, sans-serif', fontWeight: 700, fontSize: 16,
                  transform: 'rotate(-0.88deg)',
                  boxShadow: '4px 4px 0 0 #F16147',
                  cursor: 'pointer',
                }}
              >
                guesser, tap to begin →
              </button>
            </CurtainSlot>
          </div>
        )}
      </MobileShell>
    </div>
  );
}
