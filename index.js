import { jsonExport, truncateData } from "./services/exportService.js";
import { scraper } from "./services/scraperService.js";
import { sendMailService, getMailTemplate } from "./services/emailService.js";
import {
  createTransporterConfig,
  MAIL_USERNAME,
  SUBDOMAIN,
  TEMPLATES_PATH,
  JSON_DATA_FILENAME
} from "./config.js";

// Realizar scrapping de la pagina

const scrapperData = async () => {
  let filePath = null;
  truncateData("./", JSON_DATA_FILENAME);
  for (const domain of SUBDOMAIN) {
    try {
      const data = await scraper(`https://dgth.mep.go.cr/${domain}/`);
      console.log(`Data for ${domain}:`, data);

      if (data && data.length > 0) {
        filePath = jsonExport("./", JSON_DATA_FILENAME, data);
      }
    } catch (error) {
      // console.error(`Error scraping data for ${domain}:`, error);
    }
  }
  return filePath;
};

const sendMail = async (filePath) => {
  const transporterConfig = await createTransporterConfig();
  const file = { name: JSON_DATA_FILENAME, path: filePath };
  const template = getMailTemplate(
    TEMPLATES_PATH,
    "template1",
    MAIL_USERNAME,
    file
  );
  if (transporterConfig && template) {
    await sendMailService(transporterConfig, template).catch(console.error);
  }
};

const main = async () => {
  const filePath = await scrapperData();
  await sendMail(filePath);
};

main();
