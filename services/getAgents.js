const axios = require('axios');
require('dotenv').config();

const getAgents = async () => {
  const { data } = await axios(process.env.AGENTS_URL);
  return data;
};

module.exports = { getAgents };
