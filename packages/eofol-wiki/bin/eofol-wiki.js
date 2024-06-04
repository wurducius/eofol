#!/usr/bin/env node

"use strict";

const path = require("path");
const fs = require("fs");

const showdown = require("showdown");

const CONFIG_INITIAL = {
  INJECT_PAGES_TABLE_OF_CONTENTS: true,
  INJECT_ARTICLE_TABLE_OF_CONTENTS: true,
  ARTICLE_TABLE_OF_CONTENTS_ADD_TOP_LINK: true,
  INJECT_FOOTER: true,
  SECTION_PREFIX_LENGTH: 3,
  LOGLEVEL: 3,
};

const TABLE_OF_CONTENTS_TITLE = "Documentation";
const TABLE_OF_CONTENTS_TITLE_TAG = "h2";

const ARTICLE_TABLE_OF_CONTENTS_TITLE = "Table of contents";

const DOCS_DIR = "docs";
const SECTIONS_DIR = "sections";
const BUILD_DIR = "build";
const DOCS_OUTPUT_DIR = "docs";

const TEMPLATE_FILENAME = "template.html";
const FOOTER_FILENAME = "footer.html";

const MARKER_TITLE = "@@TITLE";
const MARKER_TABLE_OF_CONTENTS = "@@TABLE_OF_CONTENTS";
const MARKER_ARTICLE = "@@ARTICLE";
const MARKER_ARTICLE_TABLE_OF_CONTENTS = "@@ARTICLE_TABLE_OF_CONTENTS";
const MARKER_FOOTER = "@@FOOTER";
const MARKER_PAGES_TABLE_OF_CONTENTS_WIDTH = "@@PAGES_TABLE_OF_CONTENTS_WIDTH";

const PAGES_TABLE_OF_CONTENTS_WIDTH_PX = "256px";

const BACK_TO_TOP_LINK_TITLE = "(Top)";
const ID_ARTICLE_TOP = "article-top";

const CLASSNAME_PAGES_TABLE_OF_CONTENTS_ITEM = "pages-table-of-contents-item";
const CLASSNAME_ARTICLE_TABLE_OF_CONTENTS_ITEM =
  "article-table-of-contents-item";

// ----------------------------------------------

const LOG_PREFIX = "Generate docs";
const logImpl = (loglevel, levelPrefix, skipLogPrefix) => (msg) => {
  if (CONFIG.LOGLEVEL >= loglevel) {
    console.log(
      `${skipLogPrefix ? "" : LOG_PREFIX}${
        levelPrefix ? ` [${levelPrefix}] ` : ""
      }${msg}`
    );
  }
};
const info = logImpl(3, "INFO");
const warning = logImpl(2, "WARNING");
const error = logImpl(1, "ERROR");
const main = logImpl(1, "MAIN");
const logConfig = logImpl(3, "Config");

const LOG_SCRIPT_TITLE = "Scale fiddle - Generate docs v0.1";
const LOG_MSG_START = "START";
const LOG_MSG_END = "FINISHED";
const LOG_MSG_CLEAN = "CLEAN";
const LOG_MSG_GENERATING_PAGE = "GENERATING PAGE:";

const CLI_HELP = "--help";
const CLI_SHORTHAND_HELP = "-h";

const CLI_ARGS = [
  {
    name: "LOGLEVEL",
    cli: "--loglevel",
    shorthand: "-l",
    type: "number",
    min: 0,
    max: 3,
  },
];

const HELP_RESPONSE = "Scale fiddle generate docs HELP - @TODO";

// ----------------------------------------------

const copyString = (originalString) => (" " + originalString).slice(1);

const capitalize = (str) =>
  str
    .split("")
    .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
    .join("");

const createLink = (title, href, clazz) =>
  `<a href="${href}"${clazz ? ` class="${clazz}"` : ""}>${title}</a>`;

const createTableOfContentsWrapper = (links, tableOfContentsTitle, listTag) =>
  `<div><${TABLE_OF_CONTENTS_TITLE_TAG}>${tableOfContentsTitle}</${TABLE_OF_CONTENTS_TITLE_TAG}><${listTag}>${links}</${listTag}></div>`;

const createTableItem = (item, clazz) => `<li class="${clazz}">${item}</li>`;

const convertToHashLink = (str) =>
  str
    .split("")
    .map((letter) => (letter === " " ? "" : letter))
    .map((letter, i) => (i === 0 ? letter.toLowerCase() : letter))
    .join("");

function prettyTime(ms) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  let millis = ms - seconds * 1000;
  if (seconds <= 0) return millis + " ms";
  if (seconds < 60) return seconds + " Seconds";
  else if (minutes < 60) return minutes + " Minutes";
  else if (hours < 24) return hours + " Hours";
  else return days + " Days";
}

// ----------------------------------------------
// --------------  GENERATE DOCS  ---------------
// ----------------------------------------------

const args = process.argv.slice(2);

if (args.includes(CLI_HELP) || args.includes(CLI_SHORTHAND_HELP)) {
  console.log(HELP_RESPONSE);
  process.exit();
}

const CONFIG_ARGS = {};

args.forEach((arg) => {
  const split = arg.split("=");
  CLI_ARGS.forEach((cliArg) => {
    if (split[0] === cliArg.cli || split[0] === cliArg.shorthand) {
      let val = undefined;
      if (cliArg.type === "number") {
        const parsed = Number(split[1]);
        if (
          Number.isFinite(parsed) &&
          Number.isInteger(parsed) &&
          !Number.isNaN(parsed) &&
          (cliArg.min === undefined || parsed >= cliArg.min) &&
          (cliArg.max === undefined || parsed <= cliArg.max)
        ) {
          val = parsed;
        }
      } else if (cliArg.type === "boolean") {
        val = split[1] === "true";
      } else {
        val = split[1];
      }
      if (val !== undefined) {
        CONFIG_ARGS[cliArg.name] = val;
      }
    }
  });
});

const CONFIG = { ...CONFIG_INITIAL, ...CONFIG_ARGS };

logImpl(1, "", true)(LOG_SCRIPT_TITLE);
main(LOG_MSG_START);

logConfig(
  `Inject pages table of contents: ${CONFIG.INJECT_PAGES_TABLE_OF_CONTENTS}`
);
logConfig(
  `Inject article table of contents: ${CONFIG.INJECT_ARTICLE_TABLE_OF_CONTENTS}`
);
logConfig(
  `Add back to top link to article table of contents: ${CONFIG.ARTICLE_TABLE_OF_CONTENTS_ADD_TOP_LINK}`
);
logConfig(`Inject footer: ${CONFIG.INJECT_FOOTER}`);
logConfig(`Section prefix length: ${CONFIG.SECTION_PREFIX_LENGTH}`);
logConfig(`Log level: ${CONFIG.LOGLEVEL}`);

const timeStart = new Date();

const docsPath = path.resolve(process.cwd(), DOCS_DIR);
const sectionsPath = path.resolve(docsPath, SECTIONS_DIR);
const templatePath = path.resolve(docsPath, TEMPLATE_FILENAME);
const footerPath = path.resolve(docsPath, FOOTER_FILENAME);
const buildDocsPath = path.resolve(process.cwd(), BUILD_DIR, DOCS_OUTPUT_DIR);

const sectionFilenames = fs.readdirSync(sectionsPath);

const sectionPageNames = sectionFilenames.map((sectionFilename) =>
  sectionFilename.substring(
    CONFIG.SECTION_PREFIX_LENGTH,
    sectionFilename.length - 3
  )
);

const sectionTitles = sectionPageNames
  .map((sectionName) => sectionName.replaceAll("-", " "))
  .map(capitalize);

const linkElements = sectionTitles.map((title, i) =>
  createLink(title, "./" + sectionPageNames[i] + ".html")
);

let tableOfContentsHTML = "";
let pagesTableOfContentsWidthPx = "0px";
if (CONFIG.INJECT_PAGES_TABLE_OF_CONTENTS) {
  tableOfContentsHTML = createTableOfContentsWrapper(
    linkElements
      .map((item) =>
        createTableItem(item, CLASSNAME_PAGES_TABLE_OF_CONTENTS_ITEM)
      )
      .join(""),
    TABLE_OF_CONTENTS_TITLE,
    "ul"
  );
  pagesTableOfContentsWidthPx = PAGES_TABLE_OF_CONTENTS_WIDTH_PX;
}

const templateHTML = fs.readFileSync(templatePath);

let footerHTML = "";
if (CONFIG.INJECT_FOOTER) {
  footerHTML = fs.readFileSync(footerPath).toString();
}

info(LOG_MSG_CLEAN);

if (fs.existsSync(buildDocsPath)) {
  fs.rmSync(buildDocsPath, { recursive: true, force: true });
}
fs.mkdirSync(buildDocsPath);

const converter = new showdown.Converter();

sectionFilenames.forEach((sectionFilename, i) => {
  const timeSectionStart = new Date();

  const sectionMd = fs
    .readFileSync(path.resolve(sectionsPath, sectionFilename))
    .toString();

  let articleTableOfContents = "";
  if (CONFIG.INJECT_ARTICLE_TABLE_OF_CONTENTS) {
    const headingLines = sectionMd
      .split(/\r?\n/)
      .filter((line) => line && line.startsWith("#"));
    const headings = headingLines.map((headingLine) => {
      const pos = headingLine.search(" ");
      const itemTitle = headingLine.substring(pos + 1, headingLine.length);
      return {
        rank: headingLine.substring(0, pos).length,
        title: itemTitle,
        link: "#" + convertToHashLink(itemTitle),
      };
    });
    if (CONFIG.ARTICLE_TABLE_OF_CONTENTS_ADD_TOP_LINK) {
      headings.unshift({
        rank: 0,
        title: BACK_TO_TOP_LINK_TITLE,
        link: "#" + ID_ARTICLE_TOP,
      });
    }
    articleTableOfContents = createTableOfContentsWrapper(
      headings
        .map((item) =>
          createTableItem(
            createLink(item.title, item.link, "a-unstyled"),
            CLASSNAME_ARTICLE_TABLE_OF_CONTENTS_ITEM
          )
        )
        .join(""),
      ARTICLE_TABLE_OF_CONTENTS_TITLE,
      "ol"
    );
  }

  const articleHTML = converter.makeHtml(sectionMd);
  const resultHTML = copyString(templateHTML)
    .replaceAll(MARKER_TITLE, capitalize(sectionPageNames[i]))
    .replaceAll(MARKER_TABLE_OF_CONTENTS, tableOfContentsHTML)
    .replaceAll(MARKER_ARTICLE_TABLE_OF_CONTENTS, articleTableOfContents)
    .replaceAll(MARKER_ARTICLE, articleHTML)
    .replaceAll(MARKER_FOOTER, footerHTML)
    .replaceAll(
      MARKER_PAGES_TABLE_OF_CONTENTS_WIDTH,
      pagesTableOfContentsWidthPx
    );
  fs.writeFileSync(
    path.resolve(buildDocsPath, sectionPageNames[i] + ".html"),
    resultHTML
  );

  const timeSectionEnd = new Date();
  const timeSectionDelta = timeSectionEnd - timeSectionStart;
  const timeSectionElapsed = prettyTime(timeSectionDelta);

  info(
    `${i + 1}/${sectionFilenames.length} ${LOG_MSG_GENERATING_PAGE} ${
      sectionPageNames[i]
    } (${timeSectionElapsed})`
  );
});

const timeEnd = new Date();
const timeDelta = timeEnd - timeStart;
const prettyTimeElapsed = prettyTime(timeDelta);
info(`Compilation took ${prettyTimeElapsed}`);

main(LOG_MSG_END);
