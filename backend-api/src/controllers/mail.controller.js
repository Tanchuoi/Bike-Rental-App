import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path"; // Import path
import { fileURLToPath } from "url"; // Import for getting the file path

dotenv.config();

// Get the directory name from the file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendMail = async (req, res) => {
  const { to } = req.body;

  // Check if the email is provided
  if (!to) {
    return res.status(400).json({ message: "Recipient email is required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: "RentBike Newsletter Subscription",
    html: `
      <h1>Thank You ${to} for Subscribing 🎉</h1>
      <h3>You will get update on our event</h3>
      <img src="cid:unique@image" style="width: 100%; max-width: 600px; height: auto; border: 0;" />
    `,
    attachments: [
      {
        filename: "thankyou_mail.webp",
        path: path.join(__dirname, "../public/img/thankyou_mail.webp"), // Now __dirname is defined
        cid: "unique@image",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
};

export { sendMail };
