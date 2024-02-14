import dotenv from "dotenv"

dotenv.config();

let transporterConfig = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.AUTH_ACCESS_TOKEN
  }
};

let mailOptions = {
  from: 'bryannsi@gmail.com', // dirección del remitente
  to: 'bryannsi@outlook.com', // lista de receptores
  subject: 'Hola ✔', // Línea de asunto
  text: 'Hola mundo!', // cuerpo de texto plano
  html: '<b>Hola mundo!</b>' // cuerpo de html
};

const mail = { transporterConfig, mailOptions }

const subDomain = ["dre-aguirre", "dre-alajuela", "dre-canas", "dre-cartago", "dre-coto", "dre-desamparados", "dre-grande-del-terraba", "dre-guapiles", "dre-heredia", "dre-liberia", "dre-limon", "dre-los-santos", "dre-nicoya", "dre-occidente", "dre-peninsular", "dre-perez-zeledon", "dre-puntarenas", "dre-san-carlos", "dre-san-jose-central", "dre-san-jose-norte", "dre-san-jose-oeste", "dre-santa-cruz", "dre-sarapiqui", "dre-sula", "dre-turrialba", "dre-zona-norte-norte", "dre-puriscal"];


export { mail, subDomain }
