# 📬 HireReach - Automated HR Emailing System

**HireReach** is a Node.js-based automation tool that sends customized job application emails to HRs listed in a Google Sheet. It supports both **initial outreach** and **follow-ups**, tracks status updates in the sheet, and runs daily using a **cron job**.

---

## 🚀 Features

- ✅ Sends personalized **initial emails** to HRs
- 🔁 Automatically sends **follow-up emails after 3 days**
- 🗂 Tracks status (`SENT`, `EMAIL_SENT`) in **Google Sheets**
- ⏰ Runs **daily at 10:25 AM** using cron
- 📄 Reads contact and job data from Google Sheets
- 📧 Sends email via **nodemailer** (Gmail)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **Nodemailer**
- **Google Sheets API**
- **dotenv**
- **cron**
