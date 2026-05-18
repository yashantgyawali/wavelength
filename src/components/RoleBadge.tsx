interface RoleBadgeProps {
  text: string;
  sub: string;
  color: string;
}

export function RoleBadge({ text, sub, color }: RoleBadgeProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        display: 'inline-block',
        background: '#F3B952', color: '#130D01',
        border: '2px solid #130D01',
        borderRadius: 999, padding: '4px 14px',
        fontFamily: 'Patrick Hand, cursive', fontSize: 14, letterSpacing: '0.16em',
        transform: 'rotate(-0.88deg)',
        textTransform: 'uppercase',
        boxShadow: `3px 3px 0 0 ${color}`,
      }}>
        {text}
      </div>
      <div style={{
        marginTop: 8,
        fontFamily: 'Atkinson Hyperlegible, sans-serif', fontSize: 13,
        color: '#5A3A1F', fontWeight: 700,
      }}>
        {sub}
      </div>
    </div>
  );
}
