import fs from "fs";
import path from "path";
import {
  JSON_DATA_FILENAME,
  JSON_DATA_PATH,
  MAIL_USERNAME,
  SUBDOMAIN,
  TEMPLATES_PATH,
  getTransporterConfig
} from "./config.js";
import { createHtmlTable } from "./services/dataTableService.js";
import MailService from "./services/emailService.js";
import { jsonExport, truncateData } from "./services/exportService.js";
import { scraper } from "./services/scraperService.js";
import TemplateService from "./services/templateService.js";

// Realizar scrapping de la pagina

const scrapperData = async () => {
  const filePath = path.normalize(
    path.join(JSON_DATA_PATH, JSON_DATA_FILENAME)
  );
  truncateData(fs.writeFileSync, filePath);
  const allData = []; // Array to store all objects
  for (const domain of SUBDOMAIN) {
    const data = await scraper(`https://dgth.mep.go.cr/${domain}/`, [""]);
    console.log(`Data for ${domain}:`, data);

    if (data && data.length > 0) {
      allData.push(data);
    }
  }
  jsonExport(fs.appendFileSync, filePath, allData);
  return filePath;
};

const sendMaill = async (filePath) => {
  const file = { name: JSON_DATA_FILENAME, path: filePath };
  const htmlTable = createHtmlTable(
    JSON.parse(fs.readFileSync(filePath, "utf8"))
  );

  const templateService = new TemplateService(TEMPLATES_PATH, fs.readFileSync);
  const mailOptions = templateService.getMailTemplate(
    "template1",
    MAIL_USERNAME,
    file,
    htmlTable
  );

  const transporterConfig = await getTransporterConfig();
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
