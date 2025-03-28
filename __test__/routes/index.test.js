import { describe, expect, test, beforeAll } from '@jest/globals'
import createServer from '../../server/index.js'
import auth from '../utils/test-auth.js'

describe('Main routes', () => {
  let server

  // Create server before the tests
  beforeAll(async () => {
    server = await createServer()
  })

  const defaultStatusCode = 200
  const defaultContentType = 'application/json'

  const urls = [
    '/'
  ]

  test.each(urls)(`Testing route: %p returns ${defaultStatusCode}`, async (item) => {
    if (typeof item === 'string') {
      item = { path: item }
    }

    item = Object.assign({
      path: 'get',
      auth,
      code: defaultStatusCode,
      contentType: defaultContentType
    }, item)

    const response = await server.inject({
      method: item.method,
      url: item.path,
      auth: item.auth,
      payload: item.payload
    })

    expect(response.statusCode).toEqual(item.code)
    expect(response.headers['content-type']).toContain(item.contentType)
    expect(response.result).toMatchSnapshot()
  })
})
