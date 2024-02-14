import nodemailer from "nodemailer";

const sendMail = async (transporterConfig, mailOptions) => {
  let transporter = nodemailer.createTransport(transporterConfig)
  return await transporter.sendMail(mailOptions);
}

export { sendMail }