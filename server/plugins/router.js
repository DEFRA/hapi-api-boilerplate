const routes = [].concat(
  require('../routes/home'),
  require('../routes/about')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
