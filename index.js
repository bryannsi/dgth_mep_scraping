import { jsonExport } from "./services/exportService.js";
import { scraper } from "./services/scraperService.js";
import { sendMail } from "./services/emailService.js";
import { mail, subDomain } from "./config.js";

//Realizar scrapping de la pagina

let mailOptions = {
  from: "bryannsi@gmail.com",// dirección del remitente
  to: 'bryannsi@outlook.com', // lista de receptores
  subject: 'Hola ✔', // Línea de asunto
  text: 'Hola mundo!', // cuerpo de texto plano
  html: '<b>Hola mundo!</b>' // cuerpo de html
};

const result = await sendMail(mail.transporterConfig, mailOptions).catch(console.error)
console.dir(result)


const processData = async () => {
  for (let domain of subDomain) {
    try {
      let data = await scraper(`https://dgth.mep.go.cr/${domain}/`);
      console.log(`Data for ${domain}:`, data);
      // const result = await sendMail(transporterConfig, mailOptions).catch(console.error)
      // console.log(result)
      jsonExport('datos.json', './', data);
    } catch (error) {
      console.error(`Error scraping data for ${domain}:`, error);
    }
  }
};

// processData();