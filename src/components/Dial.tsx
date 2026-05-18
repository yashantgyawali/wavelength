import { useRef, useEffect, useCallback } from 'react';

// ─── palette (mirrors tokens.css for inline SVG use) ─────────
const C = {
  red:         '#F16147',
  yellow:      '#F3B952',
  beige:       '#FAF1E4',
  ink:         '#130D01',
  brown:       '#5A3A1F',
  paper:       '#FFFFFF',
  dialFace:    '#EFE0BE',
  dialFaceDark:'#3A2611',
  scoreMd:     '#ED8345',
  scoreHi:     '#D8412B',
};

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
export const valueToDeg = (v: number) => (1 - v) * 180;

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = deg * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
};

const annularSectorPath = (cx: number, cy: number, rIn: number, rOut: number, v1: number, v2: number) => {
  const pt = (r: number, v: number) => polar(cx, cy, r, valueToDeg(v));
  const oS = pt(rOut, v1), oE = pt(rOut, v2);
  const iS = pt(rIn,  v1), iE = pt(rIn,  v2);
  if (v2 - v1 > 0.5) {
    const oM = pt(rOut, 0.5), iM = pt(rIn, 0.5);
    return `M ${oS.x} ${oS.y} A ${rOut} ${rOut} 0 0 1 ${oM.x} ${oM.y} A ${rOut} ${rOut} 0 0 1 ${oE.x} ${oE.y} L ${iE.x} ${iE.y} A ${rIn} ${rIn} 0 0 0 ${iM.x} ${iM.y} A ${rIn} ${rIn} 0 0 0 ${iS.x} ${iS.y} Z`;
  }
  return `M ${oS.x} ${oS.y} A ${rOut} ${rOut} 0 0 1 ${oE.x} ${oE.y} L ${iE.x} ${iE.y} A ${rIn} ${rIn} 0 0 0 ${iS.x} ${iS.y} Z`;
};

interface DialProps {
  value: number;
  onChange: (v: number) => void;
  target: number;
  showTarget: boolean;
  disabled?: boolean;
}

export function Dial({ value, onChange, target, showTarget, disabled }: DialProps) {
  const W = 360, H = 232, CX = 180, CY = 224;
  const R_OUT = 168, R_IN = 88;

  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);

  const updateFromPointer = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current; if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const mx = (clientX - rect.left) * (W / rect.width);
    const my = (clientY - rect.top)  * (H / rect.height);
    const dx = mx - CX, dy = CY - my;
    let angle: number;
    if (dy < 0) angle = dx >= 0 ? 0 : Math.PI;
    else        angle = Math.atan2(dy, dx);
    angle = clamp(angle, 0, Math.PI);
    onChange(clamp(1 - angle / Math.PI, 0, 1));
  }, [onChange]);

  useEffect(() => {
    if (disabled) return;
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      updateFromPointer(e.clientX, e.clientY);
    };
    const onUp = () => { draggingRef.current = false; };
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [updateFromPointer, disabled]);

  const t = target;
  const z4  = [Math.max(0, t - 0.04), Math.min(1, t + 0.04)] as const;
  const z3a = [Math.max(0, t - 0.10), Math.max(0, t - 0.04)] as const;
  const z3b = [Math.min(1, t + 0.04), Math.min(1, t + 0.10)] as const;

  const needleDeg = valueToDeg(value);
  const needleTip = polar(CX, CY, R_OUT + 6, needleDeg);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: 'block', touchAction: 'none', userSelect: 'none', cursor: disabled ? 'default' : 'pointer' }}
      onPointerDown={e => {
        if (disabled) return;
        e.preventDefault();
        draggingRef.current = true;
        updateFromPointer(e.clientX, e.clientY);
      }}
    >
      {/* outer wooden ring */}
      <path d={annularSectorPath(CX, CY, R_IN - 8, R_OUT + 8, 0, 1)} fill={C.dialFaceDark} />
      {/* beige donut */}
      <path d={annularSectorPath(CX, CY, R_IN, R_OUT, 0, 1)} fill={C.dialFace} />

      <defs>
        <linearGradient id="dialSpec" x1="0" x2="1">
          <stop offset="0" stopColor={C.yellow} stopOpacity="0.22" />
          <stop offset="1" stopColor={C.red} stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <path d={annularSectorPath(CX, CY, R_IN + 4, R_OUT - 4, 0, 1)} fill="url(#dialSpec)" />

      {/* score bands — only when showTarget */}
      {showTarget && (
        <g>
          <path d={annularSectorPath(CX, CY, R_IN + 2, R_OUT - 2, z3a[0], z3a[1])} fill={C.scoreMd} />
          <path d={annularSectorPath(CX, CY, R_IN + 2, R_OUT - 2, z3b[0], z3b[1])} fill={C.scoreMd} />
          <path d={annularSectorPath(CX, CY, R_IN + 2, R_OUT - 2, z4[0],  z4[1])}  fill={C.scoreHi} />
        </g>
      )}

      {/* needle */}
      <line x1={CX} y1={CY} x2={needleTip.x} y2={needleTip.y} stroke={C.ink} strokeWidth="5" strokeLinecap="round" />
      <circle cx={needleTip.x} cy={needleTip.y} r="7" fill={C.red} stroke={C.ink} strokeWidth="2.5" />

      {/* pivot cap */}
      <path d={`M ${CX-14} ${CY} A 14 14 0 0 1 ${CX+14} ${CY} Z`} fill={C.brown} />
      <path d={`M ${CX-8} ${CY} A 8 8 0 0 1 ${CX+8} ${CY} Z`} fill={C.yellow} stroke={C.ink} strokeWidth="1.5" />
    </svg>
  );
}


// ─── Slider variant ───────────────────────────────────────────

export function SliderDial({ value, onChange, target, showTarget, disabled }: DialProps) {
  const W = 340, H = 80, trackY = 40, trackH = 28;
  const ref = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current!.getBoundingClientRect();
    const mx = (clientX - rect.left) * (W / rect.width);
    onChange(clamp((mx - 20) / (W - 40), 0, 1));
  }, [onChange]);

  useEffect(() => {
    if (disabled) return;
    const m = (e: PointerEvent) => { if (draggingRef.current) { e.preventDefault(); update(e.clientX); } };
    const u = () => { draggingRef.current = false; };
    window.addEventListener('pointermove', m, { passive: false });
    window.addEventListener('pointerup', u);
    return () => { window.removeEventListener('pointermove', m); window.removeEventListener('pointerup', u); };
  }, [update, disabled]);

  const xFor = (v: number) => 20 + v * (W - 40);
  const band = (lo: number, hi: number, color: string) => (
    <rect
      x={xFor(Math.max(0, lo))} y={trackY}
      width={Math.max(0, xFor(Math.min(1, hi)) - xFor(Math.max(0, lo)))}
      height={trackH} fill={color}
    />
  );

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} width="100%"
      style={{ display: 'block', touchAction: 'none', userSelect: 'none', cursor: disabled ? 'default' : 'pointer' }}
      onPointerDown={e => { if (!disabled) { e.preventDefault(); draggingRef.current = true; update(e.clientX); } }}>
      <rect x="18" y={trackY - 2} width={W - 36} height={trackH + 4} fill={C.dialFaceDark} rx="6" />
      <rect x="20" y={trackY} width={W - 40} height={trackH} fill={C.dialFace} />
      <defs>
        <linearGradient id="slidSpec" x1="0" x2="1">
          <stop offset="0" stopColor={C.yellow} stopOpacity="0.3" />
          <stop offset="1" stopColor={C.red} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x="20" y={trackY + 6} width={W - 40} height={trackH - 12} fill="url(#slidSpec)" />
      {showTarget && (
        <g>
          {band(target - 0.10, target - 0.04, C.scoreMd)}
          {band(target - 0.04, target + 0.04, C.scoreHi)}
          {band(target + 0.04, target + 0.10, C.scoreMd)}
        </g>
      )}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={xFor(i / 10)} y1={trackY + trackH - 4} x2={xFor(i / 10)} y2={trackY + trackH}
          stroke={C.brown} strokeWidth={i % 5 === 0 ? 2 : 1} opacity="0.6" />
      ))}
      {/* needle */}
      <rect x={xFor(value) - 3} y={trackY - 10} width="6" height={trackH + 20} fill={C.ink} rx="2" />
      <circle cx={xFor(value)} cy={trackY + trackH / 2} r="8" fill={C.red} stroke={C.ink} strokeWidth="2.5" />
    </svg>
  );
}


// ─── Thermometer variant ──────────────────────────────────────

export function ThermometerDial({ value, onChange, target, showTarget, disabled }: DialProps) {
  const W = 110, H = 360, trackX = 55, trackW = 26, top = 30, bottom = 320;
  const ref = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);

  const update = useCallback((clientY: number) => {
    const rect = ref.current!.getBoundingClientRect();
    const my = (clientY - rect.top) * (H / rect.height);
    onChange(clamp(1 - (my - top) / (bottom - top), 0, 1));
  }, [onChange]);

  useEffect(() => {
    if (disabled) return;
    const m = (e: PointerEvent) => { if (draggingRef.current) { e.preventDefault(); update(e.clientY); } };
    const u = () => { draggingRef.current = false; };
    window.addEventListener('pointermove', m, { passive: false });
    window.addEventListener('pointerup', u);
    return () => { window.removeEventListener('pointermove', m); window.removeEventListener('pointerup', u); };
  }, [update, disabled]);

  const yFor = (v: number) => bottom - v * (bottom - top);
  const band = (lo: number, hi: number, color: string) => {
    const ya = yFor(Math.min(1, hi)), yb = yFor(Math.max(0, lo));
    return <rect x={trackX} y={ya} width={trackW} height={Math.max(0, yb - ya)} fill={color} />;
  };

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} width="100%" height="100%"
      style={{ display: 'block', touchAction: 'none', userSelect: 'none', cursor: disabled ? 'default' : 'pointer' }}
      onPointerDown={e => { if (!disabled) { e.preventDefault(); draggingRef.current = true; update(e.clientY); } }}>
      <rect x={trackX - 2} y={top - 2} width={trackW + 4} height={bottom - top + 4} fill={C.dialFaceDark} rx="6" />
      <rect x={trackX} y={top} width={trackW} height={bottom - top} fill={C.dialFace} />
      <defs>
        <linearGradient id="thermSpec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.red} stopOpacity="0.3" />
          <stop offset="1" stopColor={C.yellow} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x={trackX + 6} y={top + 2} width={trackW - 12} height={bottom - top - 4} fill="url(#thermSpec)" />
      {showTarget && (
        <g>
          {band(target - 0.10, target - 0.04, C.scoreMd)}
          {band(target - 0.04, target + 0.04, C.scoreHi)}
          {band(target + 0.04, target + 0.10, C.scoreMd)}
        </g>
      )}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={trackX + trackW - 4} y1={yFor(i / 10)} x2={trackX + trackW} y2={yFor(i / 10)}
          stroke={C.brown} strokeWidth={i % 5 === 0 ? 2 : 1} opacity="0.6" />
      ))}
      {/* bulb */}
      <circle cx={trackX + trackW / 2} cy={bottom + 22} r="18" fill={C.red} stroke={C.brown} strokeWidth="3" />
      {/* needle marker */}
      <rect x={trackX - 12} y={yFor(value) - 3} width={trackW + 24} height="6" fill={C.ink} rx="2" />
      <polygon
        points={`${trackX + trackW + 12},${yFor(value) - 8} ${trackX + trackW + 22},${yFor(value)} ${trackX + trackW + 12},${yFor(value) + 8}`}
        fill={C.red} stroke={C.ink} strokeWidth="2"
      />
    </svg>
  );
}


// ─── Switcher ─────────────────────────────────────────────────

export type DialStyle = 'curve' | 'slider' | 'thermometer';

export function DialView({ style, ...props }: DialProps & { style: DialStyle }) {
  if (style === 'slider')       return <SliderDial      {...props} />;
  if (style === 'thermometer')  return <ThermometerDial {...props} />;
  return <Dial {...props} />;
}
