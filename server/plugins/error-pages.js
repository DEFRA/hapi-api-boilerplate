const processErrorResponse = require('./process-error-response')
/*
* Add an `onPreResponse` listener to return error pages
*/
module.exports = {
  plugin: {
    name: 'error-pages',
    register: (server, options) => {
      server.ext('onPreResponse', (request, h) => {
        return request.response.isBoom ? processErrorResponse(request) : h.continue
      })
    }
  }
}
