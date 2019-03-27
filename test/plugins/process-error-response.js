const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const processErrorResponse = require('../../server/plugins/process-error-response')

function createRequest (statusCode, data, message) {
  const logs = []
  return {
    response: {
      data,
      message,
      output: {
        statusCode
      }
    },
    log: (type, info) => logs.push({ type, info }),
    logs
  }
}

lab.experiment('process error response', () => {
  lab.test('logs non 404 errors', async () => {
    const statusCode = 500
    const data = { status: 'server error' }
    const message = 'Action failed'
    const request = createRequest(statusCode, data, message)
    const response = processErrorResponse(request)
    Code.expect(request.logs.length).to.equal(1)
    Code.expect(request.logs[0].type).to.equal('error')
    Code.expect(request.logs[0].info).to.exist()
    Code.expect(request.logs[0].info.statusCode).to.equal(statusCode)
    Code.expect(request.logs[0].info.data).to.equal(data)
    Code.expect(request.logs[0].info.message).to.equal(message)
    Code.expect(response).to.equal(request.response)
  })

  lab.test('does not log 404 errors', async () => {
    const statusCode = 404
    const data = { status: 'user error' }
    const message = 'Page not found'
    const request = createRequest(statusCode, data, message)
    const response = processErrorResponse(request)
    Code.expect(request.logs.length).to.equal(0)
    Code.expect(response).to.equal(request.response)
  })
})
