/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        atlasInk: '#17182B',
        atlasPaper: '#F7F5EF',
        atlasSurface: '#EEECE5',
        atlasAccent: '#5651A6',
      },
      fontFamily: {
        sans: ['NotoSans_400Regular', 'system-ui', 'sans-serif'],
        'sans-medium': ['NotoSans_500Medium', 'system-ui', 'sans-serif'],
        'sans-semibold': ['NotoSans_600SemiBold', 'system-ui', 'sans-serif'],
        'sans-bold': ['NotoSans_700Bold', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
