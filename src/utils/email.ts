import nodemailer from "nodemailer";
import { env } from "@/config";

const transporter = nodemailer.createTransport({
  host: env.MAILER_HOST,
  port: env.MAILER_PORT,
  auth: {
    user: env.MAILER_USER,
    pass: env.MAILER_PASSWORD,
  },
});

/**
 * This function is used to send emails.
 * 
 * @example
 * const { sendEmail } = require('./email');
 * const { email: to } = req.body;
 * 
 * const subject = 'Email verification';
 * const text = 'Please verify your email';
 * 
 * sendEmail(to, subject, text);
 * 
 * @function sendEmail - used to send email
 * @param {string} to - email address of the recipient
 * @param {string} subject - subject of the email
 * @param {string} text - content of the email
 */

export const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: env.MAILER_FROM,
    to,
    subject,
    text,
  });
};
