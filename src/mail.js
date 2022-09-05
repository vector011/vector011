require('dotenv').config()

const { MAIL_API_KEY = '', MAIL_DOMAIN = '' } = process.env

const mailgun = require('mailgun-js')({
  apiKey: MAIL_API_KEY,
  domain: MAIL_DOMAIN,
})

exports.sendContactMails = function (from, text) {
  const mailToUser = {
    from: 'vector011 <info@vector011.com>',
    to: from,
    subject: 'Stick around',
    text: `
Hi,

thank you for your email. We are stick around.

vector011`,
  }

  const mailToAdmin = {
    from: `<${from}>`,
    to: 'info@vector011.com',
    subject: 'Contact from vector011.com',
    text: text,
  }

  mailgun.messages().send(mailToUser, function (_, body) {
    console.log(body)
  })

  mailgun.messages().send(mailToAdmin, function (_, body) {
    console.log(body)
  })
}
