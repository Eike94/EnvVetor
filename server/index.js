const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const Lead = mongoose.model("Lead", {
  name: String,
  email: String,
  message: String,
  fileName: String,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/form", upload.single("image"), async (req, res) => {
  const { name, email, message } = req.body;
  const file = req.file;

  await Lead.create({ name, email, message, fileName: file.originalname });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"SnapForm" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    subject: "Novo formulário recebido",
    text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ],
  });

  res.json({ ok: true });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3001"));
