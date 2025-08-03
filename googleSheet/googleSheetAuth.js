// googleSheetAuth.js
const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");

const auth = new GoogleAuth({
  keyFile: "../sheetAccessAuth.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

async function getGoogleSheetsInstance() {
  const authClient = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: authClient });
  return googleSheets;
}

module.exports = { getGoogleSheetsInstance };
