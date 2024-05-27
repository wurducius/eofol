import { h1, p } from "@eofol/eofol-simple";
import { sx } from "@eofol/eofol";
import { loremIpsum } from ".";

export const navbar = () => {
  return [
    h1("Navbar", undefined, undefined, undefined, true),
    p(loremIpsum, sx({ paddingTop: "24px" })),
    p(loremIpsum),
    p(loremIpsum),
    p(loremIpsum),
  ];
};
