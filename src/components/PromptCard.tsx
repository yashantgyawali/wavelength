import type { Prompt } from '../data/prompts';

interface PromptCardProps {
  prompt: Prompt;
  compact?: boolean;
}

export function PromptCard({ prompt, compact = true }: PromptCardProps) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '2px solid #130D01',
      borderRadius: 14,
      padding: compact ? '10px 14px 12px' : '20px 18px',
      boxShadow: '5px 5px 0 0 #F3B952',
      transform: 'rotate(-0.6deg)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 4, left: 8,
        fontFamily: 'Patrick Hand, cursive', color: '#5A3A1F', fontSize: 11, letterSpacing: '0.1em',
      }}>
        WAVELENGTH
      </div>
      <div style={{
        position: 'absolute', top: 4, right: 8,
        fontFamily: 'Patrick Hand, cursive', color: '#5A3A1F', fontSize: 11,
      }}>
        •
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 10, marginTop: compact ? 8 : 18,
      }}>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{
            fontFamily: 'Manrope, sans-serif', fontWeight: 800,
            fontSize: compact ? 18 : 26, color: '#130D01', lineHeight: 1.05,
          }}>
            {prompt.left}
          </div>
        </div>
        <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: compact ? 20 : 24, color: '#F16147', padding: '0 4px' }}>
          ↔
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{
            fontFamily: 'Manrope, sans-serif', fontWeight: 800,
            fontSize: compact ? 18 : 26, color: '#130D01', lineHeight: 1.05,
          }}>
            {prompt.right}
          </div>
        </div>
      </div>
      {prompt.nepali && (
        <div style={{
          marginTop: 4, textAlign: 'center',
          fontFamily: 'Baloo 2, sans-serif', fontWeight: 600,
          color: '#5A3A1F', fontSize: compact ? 13 : 16,
        }}>
          {prompt.nepali}
        </div>
      )}
    </div>
  );
}
