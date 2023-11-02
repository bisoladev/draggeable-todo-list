/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        grey: '#9495A5',
        darkColor: '#393A4B',
        lightColor: '#C8CBE7',
        activeText: '#3A7CFD',
        borderLine: '#979797',
        darkNote: '#5B5E7E',
        bgDark: '#171823',
        bgLight: '#FAFAFA',
        cardBgDark: '#25273D',
      },
      backgroundImage: {
        light: "url('/img/bg-light.png')",
        dark: "url('/img/bg-dark.png')",
      },
    },
  },
  plugins: [],
};
