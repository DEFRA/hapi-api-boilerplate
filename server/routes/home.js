module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: (request, h) => {
      return {
        hello: 'world'
      }
    }
  }
}
