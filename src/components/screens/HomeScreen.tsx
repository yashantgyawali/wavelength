const C = {
  red: '#F16147', yellow: '#F3B952', ink: '#130D01',
  brown: '#5A3A1F', paper: '#FFFFFF',
};

interface HomeScreenProps {
  onDraw: () => void;
}

export function HomeScreen({ onDraw }: HomeScreenProps) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', padding: '70px 26px 40px', textAlign: 'center',
    }}>
      <div>
        <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 18, color: C.brown, letterSpacing: '0.18em' }}>
          TUMLET PRESENTS
        </div>
        <h1 style={{
          fontFamily: 'Manrope, sans-serif', fontWeight: 800,
          fontSize: 64, lineHeight: 0.95, color: C.ink,
          margin: '18px 0 6px', letterSpacing: '-0.02em',
        }}>
          wave<span style={{ color: C.red }}>length</span>
        </h1>
        <div style={{ fontFamily: 'Baloo 2, sans-serif', fontSize: 18, color: C.brown, fontWeight: 600 }}>
          तरंग — read your friends' minds
        </div>
      </div>

      {/* stacked card deck illustration */}
      <div style={{ position: 'relative', height: 220, margin: '0 auto', width: '100%' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `translate(${(i - 1) * 6}px, ${(i - 1) * 4}px) rotate(${(i - 1) * 1.5}deg)`,
          }}>
            <div style={{
              width: 200, height: 140,
              background: i === 2 ? C.paper : C.yellow,
              border: `3px solid ${C.ink}`,
              borderRadius: 14,
              boxShadow: `6px 6px 0 0 ${C.red}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 6,
            }}>
              {i === 2 && (
                <>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 32, color: C.red }}>?</div>
                  <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: 14, color: C.brown, letterSpacing: '0.15em' }}>WAVELENGTH</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={onDraw}
          style={{
            fontFamily: 'Atkinson Hyperlegible, sans-serif', fontWeight: 700,
            background: C.red, color: C.paper,
            border: 0, borderRadius: 14,
            padding: '18px 30px', fontSize: 19,
            transform: 'rotate(-0.88deg)',
            boxShadow: `6px 6px 0 0 ${C.yellow}, 0 0 0 2px ${C.ink}`,
            cursor: 'pointer', width: '100%',
          }}
        >
          draw a card →
        </button>
        <div style={{ marginTop: 18, fontFamily: 'Atkinson Hyperlegible, sans-serif', fontSize: 13, color: C.brown, lineHeight: 1.4 }}>
          one phone, two roles.<br />pass it around like the real thing.
        </div>
      </div>
    </div>
  );
}
