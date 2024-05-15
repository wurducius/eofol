import { Theme } from "@eofol/eofol-types";

export const INPUT_TRANSITION_COLOR_INTERVAL_MS = 200;

export const INPUT_TRANSITION_STYLE = `outline ${INPUT_TRANSITION_COLOR_INTERVAL_MS}ms linear`;

export const INPUT_NO_FOCUS_OUTLINE = `2px solid transparent`;

export const INPUT_FOCUS_OUTLINE = (theme: Theme) =>
  `2px solid ${theme.color.secondary}`;

export const INPUT_ERROR_OUTLINE = (theme: Theme) =>
  `2px solid ${theme.color.error}`;

export const INPUT_BORDER = (theme: Theme) =>
  `1px solid ${theme.color.secondary}`;

export const INPUT_ERROR_BORDER = (theme: Theme) =>
  `1px solid ${theme.color.error}`;
