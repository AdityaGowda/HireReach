const cron = require("node-cron");
const express = require("express");
const { mailToHR } = require("./mailToHR/mailToHR");
const app = express();

app.get("/", (req, res) => {
  res.send("Mail Scheduler is running...");
});

// Schedule job at 10:25 AM daily
cron.schedule("25 10 * * *", async () => {
  console.log(`[${new Date().toLocaleString()}] Running mailToHR job...`);
  try {
    await mailToHR();
    console.log("✅ mailToHR executed successfully.");
  } catch (error) {
    console.error("❌ Error during mailToHR execution:", error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await mailToHR(); // Initial run on server start
  console.log(`🚀 Mail Scheduler server started on port ${PORT}`);
});
