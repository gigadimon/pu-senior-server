require("dotenv").config();
const axios = require("axios");

const getDepartments = async () => {
  const { data } = await axios(process.env.DEPARTMENTS_URL);
  return data;
};

module.exports = { getDepartments };
