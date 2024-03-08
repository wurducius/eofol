const fs = require("fs");
const { spawn } = require("eofol-dev-utils");
const { primary, error } = require("eofol-dev-utils");
const { PORT } = require("../config/eofol");
const { BUILD_PATH } = require("../config/paths");

console.log(primary("Serving build folder..."));

const args = process.argv.slice(2);

// CORS is enabled by default
if (fs.existsSync(BUILD_PATH)) {
  const result = spawn.sync(
    "http-server",
    ["./build", "-p", PORT, "-a", "localhost", "-g", "--cors", "-o", ...args],
    {
      stdio: "inherit",
    }
  );

  process.exit(result.status);
} else {
  console.log(
    error("Build folder not found. Please run 'npm run build' first.")
  );
}
