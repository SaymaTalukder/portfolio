/**
 * ProjectPreviews.jsx
 * Hand-drawn SVG previews for each featured project. Each preview has a
 * different composition so the showcase grid never reads as four identical
 * template cards.
 */

/** AI Atlas — layered knowledge map with orbiting nodes. */
export function AtlasPreview() {
  const nodes = [
    { x: 50, y: 46, r: 13, c: '#C4E77B', label: 'AI' },
    { x: 22, y: 26, r: 8, c: '#54D6E8', label: 'LLM' },
    { x: 80, y: 26, r: 8, c: '#F04A9B', label: 'RAG' },
    { x: 18, y: 70, r: 8, c: '#A99BEF', label: 'AGENT' },
    { x: 82, y: 70, r: 8, c: '#C4E77B', label: 'MLOPS' },
    { x: 50, y: 82, r: 7, c: '#54D6E8', label: 'VDB' },
  ];

  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="atlas-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#24134B" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
      </defs>
      <rect width="200" height="120" fill="url(#atlas-bg)" />

      {/* grid */}
      <g stroke="#C4E77B" strokeWidth="0.3" opacity="0.18">
        {[20, 40, 60, 80, 100].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="120" />
        ))}
        {[20, 40, 60, 80, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="200" y2={y} />
        ))}
      </g>

      {/* connections */}
      <g stroke="#C4E77B" strokeWidth="0.7" opacity="0.55">
        <line x1="50" y1="46" x2="22" y2="26" />
        <line x1="50" y1="46" x2="80" y2="26" />
        <line x1="50" y1="46" x2="18" y2="70" />
        <line x1="50" y1="46" x2="82" y2="70" />
        <line x1="50" y1="46" x2="50" y2="82" />
      </g>

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={n.label}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="none"
            stroke={n.c}
            strokeWidth="0.8"
            opacity="0.5"
            style={{
              animation: `pulse 3s ${i * 0.4}s ease-in-out infinite`,
            }}
          />
          <circle cx={n.x} cy={n.y} r={n.r - 3.5} fill={n.c} opacity="0.9" />
          <text
            x={n.x}
            y={n.y + 1.4}
            textAnchor="middle"
            fontSize="4.2"
            fontFamily="'Space Grotesk',sans-serif"
            fontWeight="700"
            fill="#050505"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* scrollbar mock */}
      <rect x="176" y="18" width="6" height="60" rx="3" fill="#ffffff" opacity="0.12" />
      <rect x="176" y="18" width="6" height="24" rx="3" fill="#C4E77B" opacity="0.7" />
    </svg>
  );
}

/** ClimaGuard — regional risk map with heat cells and a weather strip. */
export function ClimaGuardPreview() {
  const cells = [
    [0, 0, '#54D6E8'], [1, 0, '#C4E77B'], [2, 0, '#54D6E8'],
    [3, 0, '#F5E6A8'], [4, 0, '#C4E77B'], [5, 0, '#54D6E8'],
    [0, 1, '#F04A9B'], [1, 1, '#F5E6A8'], [2, 1, '#F04A9B'],
    [3, 1, '#F04A9B'], [4, 1, '#F5E6A8'], [5, 1, '#C4E77B'],
    [0, 2, '#F04A9B'], [1, 2, '#F04A9B'], [2, 2, '#F5E6A8'],
    [3, 2, '#F5E6A8'], [4, 2, '#C4E77B'], [5, 2, '#54D6E8'],
  ];

  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="clima-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B1520" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#clima-bg)" />

      {/* risk heat grid */}
      {cells.map(([cx, cy, c], i) => (
        <rect
          key={i}
          x={14 + cx * 26}
          y={14 + cy * 26}
          width="23"
          height="23"
          rx="3"
          fill={c}
          opacity="0.75"
          style={{ animation: `pulse 4s ${i * 0.12}s ease-in-out infinite` }}
        />
      ))}

      {/* map outline */}
      <rect
        x="10"
        y="10"
        width="160"
        height="80"
        rx="6"
        fill="none"
        stroke="#54D6E8"
        strokeWidth="0.7"
        opacity="0.5"
        strokeDasharray="3 3"
      />

      {/* bar chart — SHAP contributions */}
      <g>
        {[18, 30, 24, 40, 34, 48, 28].map((h, i) => (
          <rect
            key={i}
            x={16 + i * 9}
            y={104 - h}
            width="6"
            height={h}
            rx="1.5"
            fill={i % 2 ? '#F04A9B' : '#C4E77B'}
            opacity="0.85"
          />
        ))}
        <line x1="12" y1="105" x2="188" y2="105" stroke="#ffffff" strokeWidth="0.5" opacity="0.25" />
      </g>

      {/* weather pill */}
      <rect x="140" y="14" width="48" height="14" rx="7" fill="#0A0A0F" opacity="0.85" />
      <circle cx="150" cy="21" r="4" fill="#F5E6A8" />
      <text x="158" y="23" fontSize="5" fill="#ffffff" opacity="0.7" fontFamily="'Space Grotesk',sans-serif">
        31° · Dhaka
      </text>
    </svg>
  );
}

/** GridMate — document ingestion and contradiction detection. */
export function GridMatePreview() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="gm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1B1430" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#gm-bg)" />

      {/* left: source documents */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x="12"
            y={16 + i * 26}
            width="46"
            height="20"
            rx="3"
            fill="#0A0A0F"
            stroke="#A99BEF"
            strokeWidth="0.6"
            opacity="0.9"
          />
          <rect x="17" y={22 + i * 26} width="26" height="2" rx="1" fill="#ffffff" opacity="0.3" />
          <rect x="17" y={27 + i * 26} width="34" height="2" rx="1" fill="#ffffff" opacity="0.18" />
        </g>
      ))}

      {/* centre: pipeline node */}
      <circle cx="100" cy="60" r="17" fill="none" stroke="#C4E77B" strokeWidth="0.9" opacity="0.8" />
      <circle cx="100" cy="60" r="9" fill="#C4E77B" opacity="0.9" />
      <path
        d="M96 60l3 3 6-7"
        fill="none"
        stroke="#050505"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="100"
        cy="60"
        r="24"
        fill="none"
        stroke="#C4E77B"
        strokeWidth="0.5"
        strokeDasharray="2 5"
        opacity="0.6"
        style={{ transformOrigin: '100px 60px', animation: 'spin 14s linear infinite' }}
      />

      {/* connectors */}
      <g stroke="#A99BEF" strokeWidth="0.6" opacity="0.6">
        <path d="M58 26 C78 26 82 48 84 55" fill="none" />
        <path d="M58 52 C76 52 82 58 84 60" fill="none" />
        <path d="M58 78 C78 78 82 70 84 65" fill="none" />
      </g>

      {/* right: contradiction panel */}
      <rect
        x="124"
        y="18"
        width="66"
        height="82"
        rx="5"
        fill="#0A0A0F"
        stroke="#F04A9B"
        strokeWidth="0.7"
        opacity="0.92"
      />
      <rect x="131" y="26" width="34" height="3" rx="1.5" fill="#F04A9B" opacity="0.85" />
      <g>
        {[36, 44, 52].map((y, i) => (
          <g key={y}>
            <rect x="131" y={y} width={i === 1 ? 30 : 48} height="2.5" rx="1" fill="#ffffff" opacity="0.28" />
            <rect x="131" y={y + 5} width="40" height="2.5" rx="1" fill="#ffffff" opacity="0.16" />
          </g>
        ))}
      </g>
      {/* conflict marker */}
      <circle cx="172" cy="32" r="7" fill="none" stroke="#F04A9B" strokeWidth="1.2" />
      <path d="M169 29l6 6M175 29l-6 6" stroke="#F04A9B" strokeWidth="1.2" strokeLinecap="round" />

      {/* citation chips */}
      <rect x="131" y="82" width="20" height="7" rx="3.5" fill="#C4E77B" opacity="0.75" />
      <rect x="155" y="82" width="26" height="7" rx="3.5" fill="#54D6E8" opacity="0.65" />
    </svg>
  );
}

/** My Safety App — mobile phone mockup with safety controls. */
export function SafetyAppPreview() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="safety-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A1338" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#safety-bg)" />

      {/* soft glow */}
      <circle cx="100" cy="62" r="52" fill="#F04A9B" opacity="0.12" />

      {/* phone body */}
      <rect
        x="72"
        y="10"
        width="56"
        height="100"
        rx="11"
        fill="#0A0A0F"
        stroke="#F5F5F5"
        strokeWidth="0.8"
        opacity="0.95"
      />
      <rect x="93" y="14" width="14" height="3" rx="1.5" fill="#ffffff" opacity="0.2" />

      {/* screen */}
      <rect x="77" y="21" width="46" height="84" rx="8" fill="#17102B" />

      {/* status row */}
      <rect x="83" y="27" width="18" height="3" rx="1.5" fill="#C4E77B" opacity="0.85" />
      <circle cx="115" cy="28.5" r="2.5" fill="#54D6E8" opacity="0.8" />

      {/* big SOS button */}
      <circle cx="100" cy="56" r="16" fill="#F04A9B" opacity="0.9" />
      <circle
        cx="100"
        cy="56"
        r="21"
        fill="none"
        stroke="#F04A9B"
        strokeWidth="0.8"
        opacity="0.5"
        style={{ transformOrigin: '100px 56px', animation: 'pulse 2.4s ease-in-out infinite' }}
      />
      <text
        x="100"
        y="59"
        textAnchor="middle"
        fontSize="7"
        fontFamily="'Archivo Black',sans-serif"
        fill="#ffffff"
      >
        SOS
      </text>

      {/* contact chips */}
      <rect x="83" y="82" width="34" height="7" rx="3.5" fill="#ffffff" opacity="0.12" />
      <rect x="83" y="93" width="26" height="7" rx="3.5" fill="#54D6E8" opacity="0.35" />

      {/* side cards */}
      <rect x="16" y="30" width="46" height="22" rx="4" fill="#0A0A0F" opacity="0.7" stroke="#C4E77B" strokeWidth="0.5" />
      <rect x="22" y="37" width="24" height="2.5" rx="1" fill="#C4E77B" opacity="0.7" />

      <rect x="138" y="66" width="46" height="22" rx="4" fill="#0A0A0F" opacity="0.7" stroke="#A99BEF" strokeWidth="0.5" />
      <rect x="144" y="73" width="20" height="2.5" rx="1" fill="#A99BEF" opacity="0.7" />
    </svg>
  );
}
