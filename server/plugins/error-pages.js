/*
* Add an `onPreResponse` listener to log errors
*/

export default {
  plugin: {
    name: 'error-pages',
    register: (server, options) => {
      server.ext('onPreResponse', (request, h) => {
        const response = request.response

        if (response.isBoom) {
          // An error was raised while
          // processing the request
          const statusCode = response.output.statusCode

          // Log the error
          request.log('error', {
            statusCode,
            message: response.message,
            stack: response.data ? response.data.stack : response.stack
          })
        }

        return h.continue
      })
    }
  }
}
