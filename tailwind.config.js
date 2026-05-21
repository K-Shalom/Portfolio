export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '481px',
        md: '769px',
        lg: '1025px',
        xl: '1281px',
      },
      fontSize: {
        hero: ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1', fontWeight: '700' }],
        section: ['clamp(1.8rem, 4vw, 2.8rem)', { lineHeight: '1.1', fontWeight: '700' }],
        body: ['clamp(0.85rem, 1.5vw, 0.95rem)', { lineHeight: '1.75' }],
        mono: ['clamp(0.65rem, 1.2vw, 0.78rem)', { lineHeight: '1.3' }],
      },
    },
  },
};
