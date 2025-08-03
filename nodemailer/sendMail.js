const { transporter } = require("./email");

async function sendMail(mailOptions) {
  const result = await transporter.sendMail(mailOptions);
  return result.accepted.length > 0 ? true : false;
}

module.exports = { sendMail };
