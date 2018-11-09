module.exports = {
  ejs: {
    path: {
      watch: './src/**/*.ejs',
      exec: [
        './src/**/*.ejs',
        '!./src/variables/**/*'
      ]
    }
  }
}
