var merge = require('webpack-merge')
var apiKeyEnv = require('./apikey.env')

module.exports = merge(apiKeyEnv, {
  NODE_ENV: '"production"'
})
