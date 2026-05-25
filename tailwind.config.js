/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B2A',
          light: '#1B2D45',
          dark: '#080F1A',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          light: '#FAF7F2',
          dark: '#E8E0D0',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#D4BA6A',
          dark: '#B08E30',
        },
        slate: {
          DEFAULT: '#4A5568',
        },
        forest: {
          DEFAULT: '#1A3C34',
          light: '#245A4F',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-source-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-dm-mono)', 'Courier New', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'underline-reveal': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'float-diamond': {
          '0%, 100%': { transform: 'translateY(0) rotate(45deg)', opacity: '0.15' },
          '50%': { transform: 'translateY(-20px) rotate(45deg)', opacity: '0.25' },
        },
        'drift': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -15px) rotate(90deg)' },
          '50%': { transform: 'translate(-5px, -25px) rotate(180deg)' },
          '75%': { transform: 'translate(-15px, -10px) rotate(270deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'underline-reveal': 'underline-reveal 0.8s ease-out forwards',
        'float-diamond': 'float-diamond 6s ease-in-out infinite',
        drift: 'drift 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
