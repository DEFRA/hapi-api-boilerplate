module.exports = {
  method: 'GET',
  path: '/viewcount',
  options: {
    handler: (request, h) => {
      if (!request.server.hasOwnProperty('viewcount')) {
        // huge hack to store the viewcount on the server object
        request.server.viewcount = 0
      }
      request.server.viewcount += 1
      return {
        viewcount: request.server.viewcount
      }
    }
  }
}
