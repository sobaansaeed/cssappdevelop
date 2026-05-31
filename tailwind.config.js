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
        background: 'hsl(201, 100%, 13%)',
        foreground: 'hsl(0, 0%, 100%)',
        'muted-foreground': 'hsl(240, 4%, 66%)',
        primary: 'hsl(0, 0%, 100%)',
        'primary-foreground': 'hsl(0, 0%, 4%)',
        secondary: 'hsl(0, 0%, 10%)',
        muted: 'hsl(0, 0%, 10%)',
        accent: 'hsl(0, 0%, 10%)',
        border: 'hsl(0, 0%, 18%)',
        input: 'hsl(0, 0%, 18%)',
        
        // Legacy colors (keep for other pages)
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
        display: ['var(--font-instrument-serif)', 'var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'var(--font-source-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-dm-mono)', 'Courier New', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
