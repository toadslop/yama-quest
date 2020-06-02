const { environment } = require('@rails/webpacker')
const erb = require('./loaders/erb')
const css = require('./loaders/css')

environment.loaders.prepend('erb', erb)
environment.loaders.prepend('css', css)
environment.loaders.delete('nodeModules')
module.exports = environment
