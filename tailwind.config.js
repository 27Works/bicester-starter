module.exports = {
  purge: [
    'components/**/*.js',
    'pages/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#8F9F77'
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
