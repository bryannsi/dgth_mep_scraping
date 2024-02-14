import { jsonExport } from "./services/exportService.js";
import { scraper } from "./services/scraperService.js";
import { sendMail } from "./services/emailService.js";

//Realizar scrapping de la pagina


const subDomain = ["dre-aguirre", "dre-alajuela", "dre-canas", "dre-cartago", "dre-coto", "dre-desamparados", "dre-grande-del-terraba", "dre-guapiles", "dre-heredia", "dre-liberia", "dre-limon", "dre-los-santos", "dre-nicoya", "dre-occidente", "dre-peninsular", "dre-perez-zeledon", "dre-puntarenas", "dre-san-carlos", "dre-san-jose-central", "dre-san-jose-norte", "dre-san-jose-oeste", "dre-santa-cruz", "dre-sarapiqui", "dre-sula", "dre-turrialba", "dre-zona-norte-norte", "dre-puriscal"];

let transporterConfig = {
  host: 'gmail',
  auth: {
    user: 'test@example.com', // tu cuenta
    pass: 'yourpassword' // tu contraseña
  }
};

let mailOptions = {
  from: 'bryannsi@gmail.com', // dirección del remitente
  to: 'bryannsi@outlook.com', // lista de receptores
  subject: 'Hola ✔', // Línea de asunto
  text: 'Hola mundo!', // cuerpo de texto plano
  html: '<b>Hola mundo!</b>' // cuerpo de html
};

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

processData();