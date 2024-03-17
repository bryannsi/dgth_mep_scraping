import fs from "fs";
import path from "path";
import {
  JSON_DATA_FILENAME,
  MAIL_USERNAME,
  SUBDOMAIN,
  TEMPLATES_PATH,
  getTransporterConfig
} from "./config.js";
import { MailService } from "./services/emailService.js";
import { jsonExport, truncateData } from "./services/exportService.js";
import { scraper } from "./services/scraperService.js";
import TemplateService from "./services/templateService.js";

// Realizar scrapping de la pagina

const scrapperData = async () => {
  const filePath = path.join("./", JSON_DATA_FILENAME);

  truncateData(fs.writeFileSync, filePath);
  for (const domain of SUBDOMAIN) {
    try {
      const data = await scraper(`https://dgth.mep.go.cr/${domain}/`);
      console.log(`Data for ${domain}:`, data);

      if (data && data.length > 0) {
        jsonExport(fs.appendFileSync, filePath, data);
      }
    } catch (error) {
      // console.error(`Error scraping data for ${domain}:`, error);
    }
  }
  return filePath;
};

const sendMaill = async (filePath) => {
  const transporterConfig = await getTransporterConfig();
  const templateService = new TemplateService(TEMPLATES_PATH, fs.readFileSync);

  const file = { name: JSON_DATA_FILENAME, path: filePath };
  const mailOptions = templateService.getMailTemplate(
    "template1",
    MAIL_USERNAME,
    file
  );

  if (transporterConfig && mailOptions) {
    const mailService = new MailService(transporterConfig);
    await mailService.sendMail(mailOptions).catch(console.error);
  }
};

const main = async () => {
  const filePath = await scrapperData();
  await sendMaill(filePath);
};

main();
