require("dotenv").config();
const axios = require("axios");

const getCurrentStatuses = async () => {
  return await axios(process.env.ACTUAL_STATUSES_URL);
};

module.exports = { getCurrentStatuses };
