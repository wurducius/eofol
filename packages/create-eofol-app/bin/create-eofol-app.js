#!/usr/bin/env node

"use strict";

const path = require("path");
const fs = require("fs");
const spawn = require("cross-spawn");
const chalk = require("chalk");

const primary = chalk.cyan;
const success = chalk.green;
const error = chalk.red;

console.log(primary("Create eofol app"));

process.on("unhandledRejection", (err) => {
  throw err;
});

const args = process.argv.slice(2);

if (args.length < 1 || !args[0]) {
  console.log(
    error(
      "Please provide a project name as an argument like `npx @eofol/create-eofol-app project-name`."
    )
  );
  process.exit(1);
}

const projectName = args[0];
const projectPath = path.resolve(process.cwd(), projectName);

if (fs.existsSync(projectPath)) {
  console.log(
    error(
      `Project directory ${projectName} already exists. Cannot create eofol app at this path.`
    )
  );
  process.exit(1);
}

console.log(
  primary(`Setting up project ${projectName} at ${projectPath}... [1/3]`)
);

// create project directory
fs.mkdirSync(projectPath);
process.chdir(projectName);

// sparse checkout eofol-app package from github repository to project directory
spawn.sync("git", [
  "clone",
  "--filter=blob:none",
  "--no-checkout",
  "--depth",
  "1",
  "--sparse",
  "https://github.com/wurducius/eofol",
  ".",
]);
spawn.sync("git", ["sparse-checkout", "add", "packages/eofol-app"]);
console.log(primary("Cloning eofol-app template... [2/3]"));
spawn.sync("git", ["checkout"]);

// install
console.log(primary("Installing dependencies... [3/3]"));
const installChild = spawn("npm", ["install"]);
installChild.stderr.setEncoding("utf8");
installChild.stderr.on("data", function (data) {
  console.log(error(data));
  process.exit(1);
});
installChild.on("close", function (closingCode) {
  if (closingCode === 0) {
    console.log(success(`Your project is ready at ${projectPath}`));
    console.log(
      primary(
        "Run `cd packages/eofol-app` and then `npm start` to start development."
      )
    );
  } else {
    console.log(error("Install failed."));
  }
});
