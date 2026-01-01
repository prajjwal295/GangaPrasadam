const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gangapradam0@gmail.com",
    pass: functions.config().gmail.pass,
  },
});

exports.sendQueryEmail = functions.firestore
  .document("queries/{docId}")
  .onCreate(async (snap) => {
    const data = snap.data();

    const {
      fullName,
      email,
      contact,
      location,
      date,
      services,
      message,
    } = data;

    await transporter.sendMail({
      from: `"Ganga Prasadam" <gangapradam0@gmail.com>`,
      to: "gangapradam0@gmail.com",
      subject: "📿 New Service Query",
      html: `
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Contact:</b> ${contact}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Services:</b> ${services.join(", ")}</p>
        <p><b>Message:</b> ${message || "—"}</p>
      `,
    });

    /* User Email */
    await transporter.sendMail({
      from: `"Ganga Prasadam" <gangapradam0@gmail.com>`,
      to: email,
      subject: "🙏 Query Received – Ganga Prasadam",
      html: `
        <p>Dear ${fullName},</p>
        <p>We have received your query for:</p>
        <p><b>${services.join(", ")}</b></p>
        <p>We will contact you shortly.</p>
        <br/>
        <p>🙏 Ganga Prasadam Team</p>
      `,
    });
  });
