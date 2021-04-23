module.exports = {
  purge: [
    'components/**/*.js',
    'pages/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        white: '#F1E9D7',
        accent: '#B63E1A'
      }
    },
    fontFamily: {
      sans: ['Kanit', '"Helvetica Nueue"', 'Helvetica', 'sans-serif']
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
