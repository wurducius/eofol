const { clean } = require("@eofol/eofol-dev-utils");
const { primary, success } = require("@eofol/eofol-dev-utils");
const { BUILD_PATH } = require("../config/paths");

console.log(primary("Cleaning build folder.."));
clean(BUILD_PATH);
console.log(success("Clean succesful."));
