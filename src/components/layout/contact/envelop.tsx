export const EnvelopeIllustration = ({ size = 160 }: { size?: number }) => {
  return (
    <svg
      viewBox="0 0 280 220"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      className="drop-shadow-[0_24px_48px_rgba(30,26,28,0.18)] animate-float"
    >
      <defs>
        {/* Envelope body gradient — warm dark */}
        <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2527" />
          <stop offset="100%" stopColor="#1a1518" />
        </linearGradient>

        {/* Flap gradient — slightly lighter than body */}
        <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#353032" />
          <stop offset="100%" stopColor="#232022" />
        </linearGradient>

        {/* Paper gradient — warm white */}
        <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F3F0" />
        </linearGradient>

        {/* Seal glow */}
        <radialGradient id="sealGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Subtle inner shadow at top of envelope */}
        <linearGradient id="innerShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Paper drop shadow filter */}
        <filter id="paperShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1E1A1C" floodOpacity="0.18" />
        </filter>

        {/* Seal filter */}
        <filter id="sealShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* ── Letter / paper — peeking out ──────────────────────────── */}
      <g filter="url(#paperShadow)">
        <rect x="80" y="4" width="120" height="96" rx="12" fill="url(#paperGrad)" />
      </g>
      {/* Paper border */}
      <rect x="80" y="4" width="120" height="96" rx="12" fill="none" stroke="#1E1A1C" strokeWidth="0.75" strokeOpacity="0.07" />

      {/* Decorative stamp top-right corner */}
      <rect x="172" y="14" width="20" height="26" rx="3" fill="none" stroke="#1E1A1C" strokeWidth="0.75" strokeOpacity="0.15" strokeDasharray="2 1" />
      <rect x="174" y="16" width="16" height="22" rx="2" fill="#1E1A1C" fillOpacity="0.06" />
      {/* Tiny stamp lines */}
      <rect x="176" y="20" width="12" height="2" rx="1" fill="#1E1A1C" fillOpacity="0.15" />
      <rect x="176" y="24" width="9" height="2" rx="1" fill="#1E1A1C" fillOpacity="0.1" />
      <rect x="176" y="28" width="11" height="2" rx="1" fill="#1E1A1C" fillOpacity="0.1" />

      {/* Text lines on paper */}
      <rect x="96" y="20" width="64" height="5" rx="2.5" fill="#1E1A1C" fillOpacity="0.18" />
      <rect x="96" y="32" width="64" height="4" rx="2" fill="#1E1A1C" fillOpacity="0.1" />
      <rect x="96" y="42" width="48" height="4" rx="2" fill="#1E1A1C" fillOpacity="0.1" />
      <rect x="96" y="52" width="56" height="4" rx="2" fill="#1E1A1C" fillOpacity="0.07" />
      <rect x="96" y="62" width="40" height="4" rx="2" fill="#1E1A1C" fillOpacity="0.07" />

      {/* Signature scribble */}
      <path
        d="M96 78 Q104 72 112 78 Q120 84 128 78"
        fill="none"
        stroke="#1E1A1C"
        strokeWidth="1.5"
        strokeOpacity="0.2"
        strokeLinecap="round"
      />

      {/* ── Envelope body ─────────────────────────────────────────── */}
      <rect x="14" y="72" width="252" height="140" rx="20" fill="url(#envBody)" />

      {/* Subtle inner top shadow */}
      <rect x="14" y="72" width="252" height="28" rx="20" fill="url(#innerShadow)" />

      {/* Bottom fold — gives 3D depth */}
      <path
        d="M14 210 Q14 212 34 212 L246 212 Q266 212 266 210 L140 148 Z"
        fill="#111010"
        fillOpacity="0.55"
      />
      {/* Bottom fold highlight edge */}
      <path
        d="M14 210 L140 148 L266 210"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeOpacity="0.05"
      />

      {/* Side folds — subtle triangles for depth */}
      <path d="M14 72 L14 210 L140 148 Z" fill="#000000" fillOpacity="0.12" />
      <path d="M266 72 L266 210 L140 148 Z" fill="#000000" fillOpacity="0.08" />

      {/* ── Envelope flap (closed) ────────────────────────────────── */}
      <path
        d="M14 90 C14 80 20 74 30 74 L250 74 C260 74 266 80 266 90 L140 158 Z"
        fill="url(#envFlap)"
      />
      {/* Flap centre crease highlight */}
      <path
        d="M14 90 L140 158 L266 90"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.6"
        strokeOpacity="0.07"
      />
      {/* Flap top edge highlight */}
      <path
        d="M30 74 L250 74"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.75"
        strokeOpacity="0.09"
      />

      {/* ── Wax seal ─────────────────────────────────────────────── */}
      <g filter="url(#sealShadow)">
        {/* Outer ring */}
        <circle cx="140" cy="158" r="18" fill="#2a2527" />
        {/* Mid ring */}
        <circle cx="140" cy="158" r="14" fill="url(#sealGlow)" />
        <circle cx="140" cy="158" r="14" fill="#343032" />
        {/* Inner disc */}
        <circle cx="140" cy="158" r="10" fill="#3d393b" />
        {/* Notched border — decorative dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const x = 140 + 16.5 * Math.cos(rad);
          const y = 158 + 16.5 * Math.sin(rad);
          return <circle key={idx} cx={x} cy={y} r="1.2" fill="#ffffff" fillOpacity="0.15" />;
        })}
        {/* Monogram */}
        <text
          x="140"
          y="162"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#ffffff"
          fillOpacity="0.55"
          fontFamily="serif"
          letterSpacing="0"
        >
          ✦
        </text>
      </g>

      {/* ── Envelope edge highlight — top rim ────────────────────── */}
      <path
        d="M34 74 Q14 74 14 90"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.75"
        strokeOpacity="0.1"
      />
      <path
        d="M246 74 Q266 74 266 90"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.75"
        strokeOpacity="0.1"
      />
    </svg>
  );
};