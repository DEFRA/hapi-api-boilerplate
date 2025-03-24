export default [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        title: 'Hello',
        message: 'World'
      }
    }
  }
]
