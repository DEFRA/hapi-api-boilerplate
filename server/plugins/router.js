import home from '../routes/home.js'

const routes = [].concat(
  home
)

export default {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
