require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const sendMail = async (req, res) => {
  const { mailaddress, message, subject, firstName, lastName } = req.body;

  if (!mailaddress || !message || !subject || !firstName || !lastName) {
    return res.status(400).json({
      error:
        "Missing required fields: mails, message, and subject are required.",
    });
  }

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: process.env.SENDER_EMAIL,
      from: process.env.RECIPIENT_EMAIL,
      subject: subject,
      text: `${firstName} ${lastName} sent you the message: ${message} - sent from ${mailaddress}`,
    };

    await sgMail.send(msg);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};

module.exports = { sendMail };
