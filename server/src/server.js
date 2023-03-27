const express = require("express");
const path = require("node:path");
const helmet = require("helmet");
const mailDataValidator = require("../services/validator");
const { transporter } = require("../services/emailTransporter");
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "https://cdn.jsdelivr.net"],
      },
    },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("../assets")));

app.get("/", function (_, res) {
  return res.sendFile(path.resolve("../index.html"));
});

app.post("/contato", async function (req, res) {
  const mailData = req.body;
  try {
    await mailDataValidator.isValid(mailData);
    await transporter().sendMail({
      from: mailData.email,
      to: "fm3209742@gmail.com",
      subject: `${mailData.name} ${mailData.surname}`,
      text: mailData.message,
    });
  } catch (e) {
    return res.json(e.errors);
  }
  return res.json({
    success: true,
  });
});

app.listen(3000, console.log("Server is listening at port " + 3000));
