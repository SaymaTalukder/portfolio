/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050505',
          900: '#0A0A0F',
          800: '#12121C',
          700: '#17102B',
        },
        plum: {
          DEFAULT: '#24134B',
          mid: '#39226B',
          bright: '#49318A',
          soft: '#6C4BB0',
        },
        lime: {
          DEFAULT: '#C4E77B',
          soft: '#D8F2A4',
          deep: '#9DBF55',
        },
        blush: '#F04A9B',
        aqua: '#54D6E8',
        teal: '#2BB3A3',
        lilac: '#A99BEF',
        paper: '#F5F5F5',
        butter: '#F5E6A8',
      },
      fontFamily: {
        display: ['"Archivo Black"', '"Space Grotesk"', 'Impact', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.055em',
      },
      boxShadow: {
        lime: '0 0 40px -10px rgba(196,231,123,0.55)',
        plum: '0 24px 70px -30px rgba(73,49,138,0.85)',
        sticker: '4px 4px 0 0 #050505',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        ribbon: {
          '0%,100%': { transform: 'translateX(0) skewX(-12deg)' },
          '50%': { transform: 'translateX(6px) skewX(-12deg)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        spinSlow: 'spinSlow 26s linear infinite',
        spinReverse: 'spinReverse 34s linear infinite',
        marquee: 'marquee 26s linear infinite',
        ribbon: 'ribbon 5s ease-in-out infinite',
        wiggle: 'wiggle 4s ease-in-out infinite',
        blink: 'blink 1.6s ease-in-out infinite',
      },
      backgroundImage: {
        'plum-gradient': 'linear-gradient(135deg, #24134B 0%, #39226B 55%, #49318A 100%)',
        'lime-gradient': 'linear-gradient(120deg, #C4E77B 0%, #D8F2A4 55%, #9DBF55 100%)',
        'rule-lime': 'linear-gradient(90deg, #C4E77B, #54D6E8, #F04A9B, transparent)',
      },
    },
  },
  plugins: [],
};
