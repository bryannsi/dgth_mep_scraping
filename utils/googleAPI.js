import { google } from "googleapis";

const oauth2Client = async (
  oauthClientId,
  oauthClientSecret,
  oauth2RefreshToken,
  redirectUrl
) => {
  const oAuth2Client = new google.auth.OAuth2(
    oauthClientId,
    oauthClientSecret,
    redirectUrl
  );
  oAuth2Client.setCredentials({ refresh_token: oauth2RefreshToken });
  return oAuth2Client;
};

export { oauth2Client };
