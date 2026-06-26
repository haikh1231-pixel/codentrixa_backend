const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "codentrixa.services@gmail.com",
    pass: "uisj dznx psdo zkso",
  },
});

app.post("/send-mail", async (req, res) => {
  try {
    const body = req.body;
    // JOB APPLICATION
    if (body.type === "job") {
      await transporter.sendMail({
        from: `"${body.name}" `,
        to:"codentrixa.services@gmail.com",
        replyTo: body.email,
        subject: `New Job Application - ${body.position}`,
        html: `
          <h2>New Job Application</h2>

          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Position:</strong> ${body.position}</p>
          <p><strong>Experience:</strong> ${body.experience}</p>
          <p><strong>Portfolio:</strong> ${body.portfolio}</p>
          <p><strong>Resume:</strong> ${body.resumeName}</p>
          <p><strong>Message:</strong> ${body.message}</p>
        `,
      });
    }

    // BUSINESS INQUIRY
    if (body.type === "inquiry") {
      await transporter.sendMail({
        from: `"${body.name}"`,
        to: "codentrixa.services@gmail.com",
        replyTo: body.email,
        subject: `New Business Inquiry - ${body.service}`,
        html: `
          <h2>New Business Inquiry</h2>

          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Company:</strong> ${body.company}</p>
          <p><strong>Service:</strong> ${body.service}</p>
          <p><strong>Budget:</strong> ${body.budget}</p>
          <p><strong>Message:</strong> ${body.message}</p>
        `,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

const PORT =  5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});