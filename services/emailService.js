import nodemailer from "nodemailer";
class MailService {
  constructor (transporterConfig) {
    this.transporter = nodemailer.createTransport(transporterConfig);
  }

  async sendMail (mailOptions) {
    if (this.transporter) {
      return await this.transporter.sendMail(mailOptions);
    }
  }
}

export default MailService;
