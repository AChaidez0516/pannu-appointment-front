module.exports.webpackDevMiddleware = config => {
  config.watchOptions = {
    poll: 1000,
    aggregateTimeout: 300,
  }
  return config
}

module.exports.devIndicators = {
  autoPrerender: false,
}

module.exports.compiler = {
  styledComponents: true
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = {
  output: 'standalone',
}

module.exports = withBundleAnalyzer({
  // put the rest of config here
})
/* module.exports = {
  swcMinify: true,
}
*/
module.exports = {
  images: {
    domains: ['www.gravatar.com', 'img.freepik.com'],
  },
}