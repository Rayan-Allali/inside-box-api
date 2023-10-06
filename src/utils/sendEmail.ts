/* eslint-disable prettier/prettier */
import { createTransport } from 'nodemailer';

export async function sendMail({ html = undefined, text, email, subject }) {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.G_EMAIL,
      pass: process.env.G_PASSWORD,
    },
  });

  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"keybox" <rayan.allali@aiesec.net>', // Set your Gmail address here
      to: email,
      subject,
      text,
      html: html,
    });

    console.log('Email sent successfully');
  } catch (err) {
    throw new Error('Failed to send account to user' + err);
  }
}
