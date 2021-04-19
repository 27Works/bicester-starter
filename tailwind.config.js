module.exports = {
  purge: [
    'components/**/*.js',
    'pages/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#5A989F'
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
