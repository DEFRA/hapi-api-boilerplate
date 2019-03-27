const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('API test', () => {
  let server

  // Create server before each test
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('GET / route works', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.equal({ hello: 'world' })
  })

  lab.test('GET /about route works', async () => {
    const options = {
      method: 'GET',
      url: '/about'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.equal({ ok: 200 })
  })

  lab.test('GET unknown route returns 404 error with statusCode, error, and message', async () => {
    const options = {
      method: 'GET',
      url: '/noSuchRoute'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
    Code.expect(response.result.statusCode).to.equal(404)
    Code.expect(response.result.error).to.equal('Not Found')
    Code.expect(response.result.message).to.equal('Not Found')
  })
})
