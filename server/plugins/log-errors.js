/*
* Add an `onPreResponse` listener to return error pages
*/

module.exports = {
  plugin: {
    name: 'log-errors',
    register: (server, options) => {
      server.ext('onPreResponse', (request, h) => {
        const response = request.response

        if (response.isBoom) {
          // An error was raised while
          // processing the request
          const statusCode = response.output.statusCode

          // Log the error
          request.log('error', {
            statusCode: statusCode,
            message: response.message,
            stack: response.data ? response.data.stack : response.stack
          })
        }

        return h.continue
      })
    }
  }
}
