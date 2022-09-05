const app = require('./src/server')
require('dotenv').config()

const port = process.env.PORT || 8080

app.listen(port, function () {
  console.log('Example app listening on port: ' + port)
})
