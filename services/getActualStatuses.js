require('dotenv').config();
const axios = require('axios');

const getActualStatuses = async () => {
  return await axios(process.env.ACTUAL_STATUSES_URL);
};

module.exports = { getActualStatuses };
