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
          600: '#1F1B2E',
        },
        // Metallic silver ramp used for the cinematic display type.
        silver: {
          DEFAULT: '#E8EAED',
          100: '#FFFFFF',
          200: '#E4E7EB',
          300: '#C9CFD6',
          400: '#A2AAB4',
          500: '#7C848F',
          600: '#565D66',
          700: '#363B42',
          800: '#1F2228',
        },
        plum: {
          DEFAULT: '#24134B',
          mid: '#39226B',
          bright: '#49318A',
          soft: '#6C4BB0',
        },
        lime: {
          DEFAULT: '#FF8A3D',
          soft: '#FFB37A',
          deep: '#E86A1E',
        },
        /*
         * Orange — the site's single accent. Every neon hue that used to
         * carry an accent (lime, blush, aqua, lilac, butter) now resolves to
         * a shade of this ramp, so the palette stays coherent.
         */
        ember: {
          DEFAULT: '#FF8A3D',
          soft: '#FFB37A',
          deep: '#E86A1E',
          dark: '#B84A12',
          glow: '#FFA25C',
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
        // Wide cinematic display face for the hero and section titles.
        cinema: ['"Anton"', '"Archivo Black"', '"Space Grotesk"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.055em',
        cinema: '-0.03em',
        wider: '0.22em',
      },
      boxShadow: {
        lime: '0 0 40px -10px rgba(255,138,61,0.55)',
        plum: '0 24px 70px -30px rgba(73,49,138,0.85)',
        sticker: '4px 4px 0 0 #050505',
        glass: '0 18px 50px -24px rgba(0,0,0,0.9)',
        'metal-glow': '0 0 90px -20px rgba(232,234,237,0.35)',
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
        // Animated film grain: the noise tile drifts so the texture never
        // reads as a static overlay.
        grainShift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '10%': { transform: 'translate3d(-3%,-4%,0)' },
          '20%': { transform: 'translate3d(-8%,2%,0)' },
          '30%': { transform: 'translate3d(4%,-6%,0)' },
          '40%': { transform: 'translate3d(-2%,7%,0)' },
          '50%': { transform: 'translate3d(-6%,3%,0)' },
          '60%': { transform: 'translate3d(7%,1%,0)' },
          '70%': { transform: 'translate3d(0,6%,0)' },
          '80%': { transform: 'translate3d(3%,-3%,0)' },
          '90%': { transform: 'translate3d(-5%,1%,0)' },
        },
        // Slow horizontal shimmer for metallic text.
        metalSheen: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        // Digital scan / glitch sweep.
        glitchSweep: {
          '0%,100%': { transform: 'translateY(-120%)', opacity: '0' },
          '10%': { opacity: '0.55' },
          '50%': { opacity: '0.25' },
          '90%': { opacity: '0.55' },
        },
        // Vertical light bar travelling down the viewport.
        lightSweep: {
          '0%': { transform: 'translateY(-30%)', opacity: '0' },
          '35%': { opacity: '0.7' },
          '100%': { transform: 'translateY(130%)', opacity: '0' },
        },
        // Faint pulsing used on the active nav indicator.
        navPulse: {
          '0%,100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
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
        'grain-shift': 'grainShift 0.9s steps(6) infinite',
        'metal-sheen': 'metalSheen 7s linear infinite',
        'glitch-sweep': 'glitchSweep 2.6s ease-in-out infinite',
        'light-sweep': 'lightSweep 6s ease-in-out infinite',
        'nav-pulse': 'navPulse 2.4s ease-in-out infinite',
      },
      backgroundImage: {
        'plum-gradient': 'linear-gradient(135deg, #24134B 0%, #39226B 55%, #49318A 100%)',
        'lime-gradient': 'linear-gradient(120deg, #FFB37A 0%, #FF8A3D 55%, #E86A1E 100%)',
        'rule-lime': 'linear-gradient(90deg, #FF8A3D, #FFB37A, #FFA25C, transparent)',
        'rule-ember': 'linear-gradient(90deg, #FF8A3D, #FFB37A, #FFA25C, transparent)',
        // Brushed-metal gradient for the giant PORTFOLIO heading.
        'metal-text':
          'linear-gradient(100deg, #6B727C 0%, #C9CFD6 18%, #FFFFFF 32%, #8C939C 46%, #E4E7EB 62%, #7C848F 78%, #C9CFD6 100%)',
        'metal-text-soft':
          'linear-gradient(100deg, #8C939C 0%, #E8EAED 26%, #FFFFFF 44%, #A2AAB4 60%, #E4E7EB 82%, #8C939C 100%)',
        // Soft cinematic light pools.
        'light-pool':
          'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(232,234,237,0.10) 0%, rgba(232,234,237,0) 70%)',
        'glass-dark':
          'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.015) 100%)',
      },
    },
  },
  plugins: [],
};
