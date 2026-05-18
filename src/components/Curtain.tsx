import { useState, useEffect } from 'react';

interface CurtainProps {
  closed: boolean;
  children: React.ReactNode;
}

function Curtain({ closed, children }: CurtainProps) {
  return (
    <div style={{
      position: 'absolute', inset: 0, perspective: 1200,
      pointerEvents: closed ? 'auto' : 'none', zIndex: 5,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        transformOrigin: 'top center',
        transformStyle: 'preserve-3d',
        transform: closed ? 'rotateX(0deg)' : 'rotateX(-95deg)',
        transition: 'transform 0.7s cubic-bezier(0.6, 0.05, 0.2, 1)',
        background: 'linear-gradient(180deg, #5A3A1F 0%, #3A2611 100%)',
        borderBottom: '4px solid #130D01',
        boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4), 0 20px 40px rgba(0,0,0,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backfaceVisibility: 'hidden',
      }}>
        {/* dot pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(circle at 18% 24%, rgba(243,185,82,0.18) 0 3px, transparent 3px),
            radial-gradient(circle at 72% 64%, rgba(241,97,71,0.16) 0 3px, transparent 3px),
            radial-gradient(circle at 42% 88%, rgba(243,185,82,0.14) 0 3px, transparent 3px)
          `,
          backgroundSize: '90px 90px',
          opacity: 0.9,
        }} />
        <div style={{ position: 'relative', textAlign: 'center', padding: 20 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface CurtainSlotProps {
  active: boolean;
  children: React.ReactNode;
}

export function CurtainSlot({ active, children }: CurtainSlotProps) {
  const [present, setPresent] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (active) {
      setPresent(true);
      let r1: number, r2: number;
      r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setClosed(true));
      });
      return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
    } else if (present) {
      setClosed(false);
      const t = setTimeout(() => setPresent(false), 780);
      return () => clearTimeout(t);
    }
  }, [active]);

  if (!present) return null;
  return <Curtain closed={closed}>{children}</Curtain>;
}
