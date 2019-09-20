module.exports = {
  method: 'GET',
  path: '/about',
  handler: (request, h) => {
    return {
      ok: 200
    }
  }
}
