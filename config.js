import dotenv from "dotenv"
dotenv.config();
import { oauth2Client } from "./utils/googleAPI.js"

const oauth2 = await oauth2Client(process.env.OAUTH_CLIENTID, process.env.OAUTH_CLIENT_SECRET, process.env.OAUTH_REFRESH_TOKEN,process.env.REDIRECT_URL)
let transporterConfig = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: await oauth2.getAccessToken()
  }
};

const mail = { transporterConfig }

const subDomain = ["dre-aguirre", "dre-alajuela", "dre-canas", "dre-cartago", "dre-coto", "dre-desamparados", "dre-grande-del-terraba", "dre-guapiles", "dre-heredia", "dre-liberia", "dre-limon", "dre-los-santos", "dre-nicoya", "dre-occidente", "dre-peninsular", "dre-perez-zeledon", "dre-puntarenas", "dre-san-carlos", "dre-san-jose-central", "dre-san-jose-norte", "dre-san-jose-oeste", "dre-santa-cruz", "dre-sarapiqui", "dre-sula", "dre-turrialba", "dre-zona-norte-norte", "dre-puriscal"];


export { mail, subDomain }
export const SUBDOMAIN = process.env.SUBDOMAIN;
export const MAIL_USERNAME = process.env.MAIL_USERNAME;
export const OAUTH_CLIENTID = process.env.OAUTH_CLIENTID;
console.log(OAUTH_CLIENTID)
export const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
export const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
export const REDIRECT_URL = process.env.REDIRECT_URL;