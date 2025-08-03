const { GoogleSheetService } = require("../googleSheet/googleSheetService");
const { initialMail, followUpMail } = require("../mailTemplates/mailTemp");
const { sendMail } = require("../nodemailer/sendMail");
require("dotenv").config();

const statusCol = 3; // E
const actionCol = 4; // F
const dateCol = 5; // G

function isThreeDaysPassed(sentDateStr) {
  if (!sentDateStr) return false;
  const sentDate = new Date(sentDateStr);
  const now = new Date();
  const diffInMs = now - sentDate;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays >= 2;
}

async function mailToHR() {
  const sheetService = new GoogleSheetService();
  const sheetData = await sheetService.readSheet();

  for (let i = 0; i < sheetData.length; i++) {
    const row = sheetData[i];
    const status = row[statusCol];
    const hrName = row[0] || "HR";
    const email = row[1];
    const sentDate = row[dateCol];

    let mailTemplate = null;

    if (!status) {
      mailTemplate = initialMail;
    } else if (status === "SENT" && isThreeDaysPassed(sentDate)) {
      mailTemplate = followUpMail;
    } else {
      continue; // skip
    }

    const mailOptions = {
      from: `${process.env.USER_NAME} <${process.env.MAIL_ID}>`,
      to: email,
      subject: mailTemplate.subject,
      text: mailTemplate.text.replace("[HR Name]", hrName),
      replyTo: `${process.env.MAIL_ID}`,
      headers: {
        "X-Priority": "3",
      },
    };

    const sent = await sendMail(mailOptions);
    if (sent) {
      await sheetService.writeCell(i, statusCol, "SENT");
      await sheetService.writeCell(i, actionCol, "EMAIL_SENT");
      const nowStr = new Date().toISOString().replace("T", " ").slice(0, 16); // e.g., "2025-08-03 10:30"
      await sheetService.writeCell(i, dateCol, nowStr);
    }
  }
}

module.exports = { mailToHR };
