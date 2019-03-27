
function processErrorResponse (request) {
  const response = request.response
  const statusCode = response.output.statusCode
  if (statusCode !== 404) {
    request.log('error', {
      statusCode: statusCode,
      data: response.data,
      message: response.message
    })
  }
  return response
}
module.exports = processErrorResponse
