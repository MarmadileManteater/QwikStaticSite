/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {},
  plugins: [],
  options: {
    safelist:  [
      'bg-black',
      'bg-zinc-700'
    ]
  }
};
