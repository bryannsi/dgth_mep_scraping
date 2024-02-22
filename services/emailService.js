import { log } from 'console';
import fs from 'fs';
import nodemailer from "nodemailer";

const sendMailService = async (transporterConfig, mailOptions) => {
  let transporter = nodemailer.createTransport(transporterConfig)
  return await transporter.sendMail(mailOptions);
}

const getMailTemplate = (templatesPath, templateName, emailFrom, file) => {
  let template = null;
  if (templatesPath && templateName && emailFrom && file.name && file.path) {
    const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));

    template = templates[templateName];
    template.from = emailFrom;
    template.attachments = [
      {
        "filename": file.name,
        "path": file.path
      }
    ];
  }
  return template;
}


export { sendMailService, getMailTemplate }