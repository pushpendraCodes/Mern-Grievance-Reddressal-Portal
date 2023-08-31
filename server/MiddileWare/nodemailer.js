const nodemailer = require("nodemailer")
const mail_pass = process.env.REACT_GMAIL_KEY;
const email = process.env.REACT_EMAIL;
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
   port: 465,
   secure: true,
    auth: {
      user: email,
      pass: mail_pass,
    },
  });
  module.exports = mailTransporter