const { getGoogleSheetsInstance } = require("./googleSheetAuth");
require("dotenv").config();
class GoogleSheetService {
  constructor() {
    this.spreadsheetId = process.env.SPREADSHEET_ID,
    this.range = "Sheet1!A2:M100";
  }

  async readSheet() {
    try {
      const googleSheets = await getGoogleSheetsInstance();
      const response = await googleSheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: this.range,
      });
      const rows = response.data.values || [];
      return rows;
    } catch (error) {
      console.error("❌ Error reading Google Sheet:", error.message);
      return [];
    }
  }

  async writeCell(rowIndex, colIndex, value) {
    const columnLetter = String.fromCharCode(65 + colIndex); // A=0, B=1,...
    const range = `Sheet1!${columnLetter}${rowIndex + 2}`; // +2: skip header and 0-index

    const googleSheets = await getGoogleSheetsInstance();
    return googleSheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[value]],
      },
    });
  }
}

module.exports = { GoogleSheetService };
