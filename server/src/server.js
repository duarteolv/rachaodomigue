const express = require("express");
const path = require("path");
const helmet = require("helmet");
const mailDataValidator = require("../services/validator");
const { transporter } = require("../services/emailTransporter");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.static(path.resolve("../assets")));

app.get("/", (_, res) => {
  return res.sendFile(path.resolve("../index.html"));
});

app.post("/contato", async function (req, res) {
  const mailData = req.body;
  try {
    if (await mailDataValidator.isValid(mailData)) {
      await transporter().sendMail({
        from: mailData.email,
        to: process.env.EMAIL_USER,
        subject: `${mailData.name} ${mailData.surname} <${mailData.email}>`,
        text: mailData.message,
      });
    } else {
      return res.status(400).json({
        error: "verify fields",
      });
    }
  } catch (e) {
    return res.status(500).json(e.message);
  }
  return res.json({
    success: true,
  });
});

app.listen(PORT, console.log("Server is listening at port " + PORT));
