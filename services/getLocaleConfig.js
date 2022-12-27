require("dotenv").config();
const axios = require("axios");

const getLocaleConfig = async () => {
  const { data } = await axios(process.env.LOCAL_CONFIG_URL);
  return data;
};

module.exports = { getLocaleConfig };
