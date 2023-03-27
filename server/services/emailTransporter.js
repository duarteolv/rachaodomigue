const { createTransport } = require("nodemailer");

module.exports = {
  transporter: function () {
    return createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "fm3209742@@gmail.com",
        pass: "hsztnubbpqcjlyeq"
      },
    });
  },
};
