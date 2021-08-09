module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,ts,html}',
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
