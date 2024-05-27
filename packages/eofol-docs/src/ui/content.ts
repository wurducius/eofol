import { h1, p } from "@eofol/eofol-simple";
import { loremIpsum } from ".";

export const content = () => {
  return [
    h1("Content"),
    p(loremIpsum),
    p(loremIpsum),
    p(loremIpsum),
    p(loremIpsum),
    p(loremIpsum),
    p(loremIpsum),
    p(loremIpsum),
    p(loremIpsum),
    p(loremIpsum),
  ];
};
