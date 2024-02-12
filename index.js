import { jsonExport } from "./export.js";
import { scraper } from "./scraper.js";

//Realizar scrapping de la pagina


const subDomain=["dre-aguirre","dre-alajuela","dre-canas","dre-cartago","dre-coto","dre-desamparados","dre-grande-del-terraba","dre-guapiles","dre-heredia","dre-liberia","dre-limon","dre-los-santos","dre-nicoya","dre-occidente","dre-peninsular","dre-perez-zeledon","dre-puntarenas","dre-san-carlos","dre-san-jose-central","dre-san-jose-norte","dre-san-jose-oeste","dre-santa-cruz","dre-sarapiqui","dre-sula","dre-turrialba","dre-zona-norte-norte","dre-puriscal"];


const processData = async () => {
  for (let domain of subDomain) {
    try {
      let data = await scraper(`https://dgth.mep.go.cr/${domain}/`);
      console.log(`Data for ${domain}:`, data);
      jsonExport('datos.json', './', data);
    } catch (error) {
      console.error(`Error scraping data for ${domain}:`, error);
    }
  }
};

processData();