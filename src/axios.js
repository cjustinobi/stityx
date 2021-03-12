
const axios = require('axios');

export default axios.create({
  baseURL: process.env.VUE_APP_URL,
});