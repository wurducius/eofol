require("dotenv").config();

const defaultEnv = require("../config/default-env");

module.exports = { ...defaultEnv, ...process.env };
