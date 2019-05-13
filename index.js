const createServer = require('./server')

process.on('SIGINT', function () {
  process.exit()
})

createServer()
  .then(server => server.start())
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
