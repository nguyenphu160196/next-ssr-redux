const express = require('express')
const next = require('next')
const port = process.env.PORT || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare()
.then(() => {
  const server = express()

  server.get('/', (req, res) => {
    app.render(req, res, '/homeview', req.query)
  })

  server.get('/login', (req, res) => {
    app.render(req, res, '/login', req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})