import dotenv from "dotenv";
import { oauth2Client } from "./utils/googleAPI.js";
dotenv.config();

const createTransporterConfig = async () => {
  const oauth2 = await oauth2Client(
    process.env.OAUTH_CLIENTID,
    process.env.OAUTH_CLIENT_SECRET,
    process.env.OAUTH_REFRESH_TOKEN,
    process.env.REDIRECT_URL
  );
  const accessToken = await oauth2.getAccessToken();

  const transporterConfig = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken
    }
  };

  return transporterConfig;
};

export { createTransporterConfig };

export const SUBDOMAIN = process.env.SUBDOMAIN.split(",");

export const MAIL_USERNAME = process.env.MAIL_USERNAME;
export const OAUTH_CLIENTID = process.env.OAUTH_CLIENTID;

export const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
export const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
export const REDIRECT_URL = process.env.REDIRECT_URL;

export const TEMPLATES_PATH = process.env.TEMPLATES_PATH;
export const JSON_DATA_FILENAME = process.env.JSON_DATA_FILENAME;
