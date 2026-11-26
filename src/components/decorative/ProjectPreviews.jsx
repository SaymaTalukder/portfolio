/**
 * ProjectPreviews.jsx
 * Hand-drawn SVG previews for each featured project. Each preview has a
 * different composition so the showcase grid never reads as four identical
 * template cards.
 *
 * The palette is deliberately restrained — cool greys with a single accent
 * per preview — so the previews sit inside the monochrome chrome theme
 * instead of fighting it.
 */

/** AI Atlas — layered knowledge map with orbiting nodes. */
export function AtlasPreview() {
  const nodes = [
    { x: 52, y: 40, r: 14, c: '#E8EAED', label: 'AI' },
    { x: 24, y: 20, r: 8, c: '#A2AAB4', label: 'LLM' },
    { x: 82, y: 20, r: 8, c: '#FF8A3D', label: 'RAG' },
    { x: 24, y: 62, r: 8, c: '#8C939C', label: 'AGENT' },
    { x: 82, y: 62, r: 8, c: '#A2AAB4', label: 'MLOPS' },
    { x: 52, y: 76, r: 7, c: '#8C939C', label: 'VDB' },
  ];

  /* Topic list on the right edge — fills the panel the way the real
     category index does. */
  const topics = ['Embeddings', 'Fine-tuning', 'Vision', 'Agents', 'RLHF'];

  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="atlas-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#16181D" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
      </defs>
      <rect width="200" height="120" fill="url(#atlas-bg)" />

      {/* grid */}
      <g stroke="#E8EAED" strokeWidth="0.3" opacity="0.12">
        {[20, 40, 60, 80, 100].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="120" />
        ))}
        {[20, 40, 60, 80, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="200" y2={y} />
        ))}
      </g>

      {/* connections */}
      <g stroke="#E8EAED" strokeWidth="0.7" opacity="0.4">
        <line x1="52" y1="40" x2="24" y2="20" />
        <line x1="52" y1="40" x2="82" y2="20" />
        <line x1="52" y1="40" x2="24" y2="62" />
        <line x1="52" y1="40" x2="82" y2="62" />
        <line x1="52" y1="40" x2="52" y2="76" />
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
            opacity="0.45"
            style={{
              animation: `pulse 3s ${i * 0.4}s ease-in-out infinite`,
            }}
          />
          <circle cx={n.x} cy={n.y} r={n.r - 4.5} fill={n.c} opacity="0.85" />
          {/* Short core label inside the node */}
          <text
            x={n.x}
            y={n.y + 1.5}
            textAnchor="middle"
            fontSize="3.6"
            fontFamily="'Space Grotesk',sans-serif"
            fontWeight="700"
            fill="#050505"
          >
            {n.label.slice(0, 4)}
          </text>
          {/* Full label beneath the node */}
          <text
            x={n.x}
            y={n.y + n.r + 5}
            textAnchor="middle"
            fontSize="3.4"
            fontFamily="'Space Grotesk',sans-serif"
            letterSpacing="0.4"
            fill="#ffffff"
            opacity="0.5"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* topic index panel */}
      <rect x="118" y="14" width="72" height="92" rx="5" fill="#0A0A0F" opacity="0.75" />
      <rect x="124" y="20" width="30" height="3" rx="1.5" fill="#E8EAED" opacity="0.7" />
      {topics.map((t, i) => (
        <g key={t}>
          <circle cx="128" cy={34 + i * 13} r="2" fill="#FF8A3D" opacity={i === 0 ? 0.85 : 0.3} />
          <rect x="134" y={33 + i * 13} width={i === 0 ? 28 : 34} height="2.5" rx="1" fill="#ffffff" opacity={i === 0 ? 0.55 : 0.22} />
        </g>
      ))}

      {/* scrollbar mock */}
      <rect x="192" y="14" width="4" height="92" rx="2" fill="#ffffff" opacity="0.08" />
      <rect x="192" y="14" width="4" height="30" rx="2" fill="#E8EAED" opacity="0.5" />
    </svg>
  );
}

/** ClimaGuard — regional risk map with heat cells and a weather strip. */
export function ClimaGuardPreview() {
  const cells = [
    [0, 0, '#E8EAED'], [1, 0, '#A2AAB4'], [2, 0, '#E8EAED'],
    [3, 0, '#FF8A3D'], [4, 0, '#A2AAB4'], [5, 0, '#E8EAED'],
    [0, 1, '#FF8A3D'], [1, 1, '#E8EAED'], [2, 1, '#8C939C'],
    [3, 1, '#A2AAB4'], [4, 1, '#E8EAED'], [5, 1, '#A2AAB4'],
    [0, 2, '#8C939C'], [1, 2, '#A2AAB4'], [2, 2, '#E8EAED'],
    [3, 2, '#E8EAED'], [4, 2, '#FF8A3D'], [5, 2, '#A2AAB4'],
  ];

  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="clima-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12141A" />
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
          opacity="0.6"
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
        stroke="#E8EAED"
        strokeWidth="0.7"
        opacity="0.4"
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
            fill={i % 2 ? '#8C939C' : '#E8EAED'}
            opacity="0.75"
          />
        ))}
        <line x1="12" y1="105" x2="188" y2="105" stroke="#ffffff" strokeWidth="0.5" opacity="0.2" />
      </g>

      {/* weather pill */}
      <rect x="140" y="14" width="48" height="14" rx="7" fill="#0A0A0F" opacity="0.9" />
      <circle cx="150" cy="21" r="4" fill="#E8EAED" opacity="0.8" />
      <text x="158" y="23" fontSize="5" fill="#ffffff" opacity="0.6" fontFamily="'Space Grotesk',sans-serif">
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
          <stop offset="0%" stopColor="#14161C" />
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
            stroke="#A2AAB4"
            strokeWidth="0.6"
            opacity="0.85"
          />
          <rect x="17" y={22 + i * 26} width="26" height="2" rx="1" fill="#ffffff" opacity="0.26" />
          <rect x="17" y={27 + i * 26} width="34" height="2" rx="1" fill="#ffffff" opacity="0.14" />
        </g>
      ))}

      {/* centre: pipeline node */}
      <circle cx="100" cy="60" r="17" fill="none" stroke="#E8EAED" strokeWidth="0.9" opacity="0.7" />
      <circle cx="100" cy="60" r="9" fill="#E8EAED" opacity="0.9" />
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
        stroke="#E8EAED"
        strokeWidth="0.5"
        strokeDasharray="2 5"
        opacity="0.5"
        style={{ transformOrigin: '100px 60px', animation: 'spin 14s linear infinite' }}
      />

      {/* connectors */}
      <g stroke="#A2AAB4" strokeWidth="0.6" opacity="0.5">
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
        stroke="#E8EAED"
        strokeWidth="0.7"
        opacity="0.9"
      />
      <rect x="131" y="26" width="34" height="3" rx="1.5" fill="#E8EAED" opacity="0.75" />
      <g>
        {[36, 44, 52].map((y, i) => (
          <g key={y}>
            <rect x="131" y={y} width={i === 1 ? 30 : 48} height="2.5" rx="1" fill="#ffffff" opacity="0.24" />
            <rect x="131" y={y + 5} width="40" height="2.5" rx="1" fill="#ffffff" opacity="0.13" />
          </g>
        ))}
      </g>
      {/* conflict marker */}
      <circle cx="172" cy="32" r="7" fill="none" stroke="#FF8A3D" strokeWidth="1.2" />
      <path d="M169 29l6 6M175 29l-6 6" stroke="#FF8A3D" strokeWidth="1.2" strokeLinecap="round" />

      {/* citation chips */}
      <rect x="131" y="82" width="20" height="7" rx="3.5" fill="#E8EAED" opacity="0.6" />
      <rect x="155" y="82" width="26" height="7" rx="3.5" fill="#8C939C" opacity="0.5" />
    </svg>
  );
}

/** My Safety App — mobile phone mockup with safety controls. */
export function SafetyAppPreview() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="safety-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#15171D" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#safety-bg)" />

      {/* soft glow */}
      <circle cx="100" cy="62" r="52" fill="#E8EAED" opacity="0.07" />

      {/* connector lines from the phone to the side panels */}
      <g stroke="#E8EAED" strokeWidth="0.6" opacity="0.28">
        <path d="M72 44 C60 44 56 40 50 40" fill="none" />
        <path d="M72 82 C60 82 56 78 50 78" fill="none" />
        <path d="M128 44 C140 44 144 40 150 40" fill="none" />
        <path d="M128 82 C140 82 144 78 150 78" fill="none" />
      </g>

      {/* phone body */}
      <rect
        x="72"
        y="10"
        width="56"
        height="100"
        rx="11"
        fill="#0A0A0F"
        stroke="#E8EAED"
        strokeWidth="0.8"
        opacity="0.95"
      />
      <rect x="93" y="14" width="14" height="3" rx="1.5" fill="#ffffff" opacity="0.18" />

      {/* screen */}
      <rect x="77" y="21" width="46" height="84" rx="8" fill="#101319" />

      {/* status row */}
      <rect x="83" y="27" width="18" height="3" rx="1.5" fill="#FF8A3D" opacity="0.8" />
      <circle cx="115" cy="28.5" r="2.5" fill="#A2AAB4" opacity="0.7" />

      {/* big SOS button */}
      <circle cx="100" cy="56" r="16" fill="#E8EAED" opacity="0.85" />
      <circle
        cx="100"
        cy="56"
        r="21"
        fill="none"
        stroke="#E8EAED"
        strokeWidth="0.8"
        opacity="0.4"
        style={{ transformOrigin: '100px 56px', animation: 'pulse 2.4s ease-in-out infinite' }}
      />
      <text
        x="100"
        y="59"
        textAnchor="middle"
        fontSize="7"
        fontFamily="'Archivo Black',sans-serif"
        fill="#050505"
      >
        SOS
      </text>

      {/* contact chips */}
      <rect x="83" y="82" width="34" height="7" rx="3.5" fill="#ffffff" opacity="0.1" />
      <rect x="83" y="93" width="26" height="7" rx="3.5" fill="#A2AAB4" opacity="0.3" />

      {/* side cards — trusted contacts and live location */}
      <rect x="12" y="30" width="38" height="20" rx="4" fill="#0A0A0F" opacity="0.8" stroke="#FF8A3D" strokeWidth="0.5" />
      <rect x="17" y="36" width="20" height="2.5" rx="1" fill="#FF8A3D" opacity="0.6" />
      <rect x="17" y="42" width="14" height="2" rx="1" fill="#ffffff" opacity="0.18" />

      <rect x="150" y="30" width="38" height="20" rx="4" fill="#0A0A0F" opacity="0.8" stroke="#A2AAB4" strokeWidth="0.5" />
      <rect x="155" y="36" width="17" height="2.5" rx="1" fill="#A2AAB4" opacity="0.6" />
      <rect x="155" y="42" width="24" height="2" rx="1" fill="#ffffff" opacity="0.18" />

      <rect x="12" y="68" width="38" height="20" rx="4" fill="#0A0A0F" opacity="0.8" stroke="#E8EAED" strokeWidth="0.5" />
      <rect x="17" y="74" width="22" height="2.5" rx="1" fill="#E8EAED" opacity="0.5" />
      <rect x="17" y="80" width="15" height="2" rx="1" fill="#ffffff" opacity="0.18" />

      <rect x="150" y="68" width="38" height="20" rx="4" fill="#0A0A0F" opacity="0.8" stroke="#E8EAED" strokeWidth="0.5" />
      <rect x="155" y="74" width="19" height="2.5" rx="1" fill="#E8EAED" opacity="0.5" />
      <rect x="155" y="80" width="26" height="2" rx="1" fill="#ffffff" opacity="0.18" />
    </svg>
  );
}
