const webpackConfig = require('./webpack.config.js')

module.exports = function(karma) {
  karma.set({
    plugins: ['karma-webpack', 'karma-mocha', 'karma-chrome-launcher'],
    frameworks: ['mocha'],

    files: ['index.js', 'index.test.js'],

    preprocessors: {
      'index.js': ['webpack'],
      'index.test.js': ['webpack']
    },

    webpack: {
      module: webpackConfig.module,
      plugins: webpackConfig.plugins
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    browsers: ['Chrome']
  })
}
