/**
 * Decorative.jsx
 * Hand-built vector ornaments that carry the editorial/artistic language:
 * stars, scribbles, sticker shapes, blobs and dashed rings.
 * All inline SVG so nothing depends on external assets.
 */

/** Four-point sparkle / star used as a scattered accent. */
export function Star({ className = '', size = 24, fill = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0c.6 5.6 3.4 8.4 9 9-5.6.6-8.4 3.4-9 9-.6-5.6-3.4-8.4-9-9 5.6-.6 8.4-3.4 9-9Z" />
    </svg>
  );
}

/** Eight-point burst used as a sticker accent. */
export function Burst({ className = '', size = 40, fill = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill={fill}
      className={className}
      aria-hidden="true"
    >
      <path d="M24 0l3.6 15.2L42 6l-6.8 15.2L48 24l-14.4 2.2L42 42l-14.4-9.2L24 48l-3.6-15.2L6 42l6.8-15.8L0 24l12.8-2.8L6 6l14.4 9.2L24 0Z" />
    </svg>
  );
}

/** Squiggly hand-drawn underline. */
export function Squiggle({ className = '', width = 160, color = '#FF8A3D' }) {
  return (
    <svg
      width={width}
      height="10"
      viewBox="0 0 160 10"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 6c8-6 16 6 24 0s16 6 24 0 16 6 24 0 16 6 24 0 16 6 24 0 16 6 24 0"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Dashed circle, often used behind badges. */
export function DashedRing({ className = '', size = 120, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="60"
        cy="60"
        r="56"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="5 9"
        opacity="0.7"
      />
    </svg>
  );
}

/** Organic blob used as a soft backdrop shape. */
export function Blob({ className = '', fill = '#49318A' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        fill={fill}
        d="M43.6 -58.9C56.1 -49.5 63.9 -31.5 65 13.2C66.1 57.9 60.5 115.3 41.2 145.1C21.9 174.9 -10.8 177.1 -35.2 149.6C-59.6 122.1 -75.7 64.9 -73.2 23.1C-70.7 -18.7 -49.6 -44.9 -23.4 -59.5C2.8 -74.1 31.1 -68.3 43.6 -58.9Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

/** Hand-drawn arrow for editorial call-outs. */
export function HandArrow({ className = '', color = '#FFA25C', width = 120 }) {
  return (
    <svg
      width={width}
      height="70"
      viewBox="0 0 120 70"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 12c26 2 48 14 62 34"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M54 40c5 3 9 5 14 6-2-6-4-11-6-16"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small cross/plus ornament. */
export function PlusMark({ className = '', size = 16, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={color}
      className={className}
      aria-hidden="true"
    >
      <path d="M7 0h2v7h7v2H9v7H7V9H0V7h7V0Z" />
    </svg>
  );
}

/** Concentric ring target used for the "focus" motif. */
export function TargetRings({ className = '', size = 90, color = '#FF8A3D' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 90"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="45" cy="45" r="42" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <circle cx="45" cy="45" r="28" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="45" cy="45" r="14" stroke={color} strokeWidth="1.6" />
      <circle cx="45" cy="45" r="4" fill={color} />
    </svg>
  );
}

/** Scribbled circle highlight (like a marker ring around a word). */
export function MarkerRing({ className = '', color = '#FFA25C' }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M8 34c22-16 44-22 68-19 26 4 52 4 74-4 18-7 34-6 42 4"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M14 44c26-14 52-16 76-10 24 6 46 4 66-4 14-6 26-4 34 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
