require("dotenv").config();
const axios = require("axios");

const getWebimState = async () => {
  return await axios.get(
    `${process.env.CURRENT_STATS_URL}${new Date().getTime()}`
  );
};

module.exports = { getWebimState };
