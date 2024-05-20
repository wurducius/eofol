import forceRerender from "../core/force-rerender";
import debounce from "./debounce";
import { theme } from "../styles/theme";
import { Breakpoint } from "@eofol/eofol-types";

const BREAKPOINT_RESIZE_HANDLER_INTERVAL_MS = 20;

const config = theme.breakpoints;
const breakpoints = config.values;
const keys = config.keys;

export const mediaQueryMaxWidth = (width: number) => () =>
  window.matchMedia(`(max-width: ${width}px)`).matches;

const breakpointQuery = breakpoints.map((value) => mediaQueryMaxWidth(value));

const getBreakpoints = () =>
  keys.reduce((acc, next, i) => ({ ...acc, [next]: breakpointQuery[i]() }), {});

export let breakpoint: Breakpoint = getBreakpoints();

const getBreakpoint = () => breakpoint;

const handleResize = () => {
  breakpoint = getBreakpoints();
};

window.addEventListener("resize", () => {
  debounce(
    () => {
      handleResize();
      forceRerender();
    },
    BREAKPOINT_RESIZE_HANDLER_INTERVAL_MS,
    "debounce-breakpoint-resize-handler"
  );
});

export default { mediaQueryMaxWidth, getBreakpoint };
