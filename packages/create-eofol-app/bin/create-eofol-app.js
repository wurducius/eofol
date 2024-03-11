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
      "Please provide a project name as an argument like `npx create-eofol-app project-name`."
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

console.log(primary(`Setting up project ${projectName} at ${projectPath}`));

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
spawn.sync("git", ["checkout"]);

// install
process.chdir("packages/eofol-app");
spawn.sync("npm", ["install"]);

console.log(success(`Your project is ready at ${projectPath}`));
