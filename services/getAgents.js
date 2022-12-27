const axios = require("axios");
require("dotenv").config();

const getAgents = async () => {
  return await axios(process.env.AGENTS_URL);
};

module.exports = { getAgents };
