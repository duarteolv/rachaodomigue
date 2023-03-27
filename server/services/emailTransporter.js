const { createTransport } = require("nodemailer");
const { config } = require("dotenv");

config({
  debug: true,
});

module.exports = {
  transporter: function () {
    return createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  },
};
