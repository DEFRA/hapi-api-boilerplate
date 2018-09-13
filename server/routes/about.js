module.exports = {
  method: 'GET',
  path: '/about',
  options: {
    handler: (request, h) => {
      return {
        ok: 200
      }
    }
  }
}
