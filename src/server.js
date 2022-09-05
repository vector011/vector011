const express = require('express')
const serverless = require('serverless-http')
require('dotenv').config()

const app = express()
const harp = require('harp')
const mail = require('./mail')

const port = process.env.PORT || 8080

const router = express.Router()

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true)

  app.use(function (req, res, next) {
    if (req.headers.host.slice(0, 4) === 'www.') {
      return next()
    }
    res.redirect(301, 'https://www.' + req.headers.host + req.url)
  })

  app.use(function (req, res, next) {
    if (req.secure) {
      return next()
    }
    res.redirect('https://' + req.headers.host + req.url)
  })
}

router.use(express.static(__dirname + '/../public'))
app.use(harp.mount(__dirname + '/../public'))

router.get('/contact-form', function (req, res) {
  let from = req.param('from')
  let text = req.param('text')
  mail.sendContactMails(from, text)
  res.redirect('contact-success')
})

app.use(harp.middleware.fallback)

/*app.listen(port, function () {
  console.log('Example app listening on port: ' + port)
})*/

module.exports = app
module.exports.handler = serverless(app)
