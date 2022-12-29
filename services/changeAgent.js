const axios = require('axios');
require('dotenv').config;

const changeAgent = async (agentId, body) => {
  const res = await axios.put(`${process.env.AGENTS_URL}/${agentId}`, body);
  return res.data;
};

module.exports = { changeAgent };
