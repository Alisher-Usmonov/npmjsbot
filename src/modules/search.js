const axios = require("axios").default;

module.exports = async (pkgName) => {
  const req = await axios.get("https://registry.npmjs.org/-/v1/search?text="+pkgName);
  return req.data;
}