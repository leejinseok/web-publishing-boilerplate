module.exports = {
  pug: {
    path: {
      watch: './src/**/*.pug',
      exec: [
        './src/**/*.pug',
        '!./src/views/variables/**/*'
      ]
    }
  }
}
