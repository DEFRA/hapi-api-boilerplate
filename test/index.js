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

  lab.test('GET /viewcount route works', async () => {
    const options = {
      method: 'GET',
      url: '/viewcount'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result.viewcount).to.be.number()
  })

  lab.test('GET /viewcount increases', async () => {
    const options = {
      method: 'GET',
      url: '/viewcount'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result.viewcount).to.be.number()

    const secondresponse = await server.inject(options)
    Code.expect(secondresponse.statusCode).to.equal(200)
    Code.expect(secondresponse.result.viewcount).to.equal(response.result.viewcount + 1)
  })
})
