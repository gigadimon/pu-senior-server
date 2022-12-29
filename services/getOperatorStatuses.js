const axios = require('axios');
require('dotenv').config();

const getOperatorStatuses = async () => {
  const { data } = await axios(process.env.OPERATOR_STATUSES);
  return data;
};

module.exports = { getOperatorStatuses };
