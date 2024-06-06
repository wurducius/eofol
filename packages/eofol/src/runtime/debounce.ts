import { Handler } from "@eofol/eofol-types";

const debounce = (function () {
  let timers: Record<string, NodeJS.Timeout> = {};

  return function (callback: Handler, delay: number, id: string) {
    delay = delay || 500;
    id = id || "duplicated event";

    if (timers[id]) {
      clearTimeout(timers[id]);
    }

    timers[id] = setTimeout(callback, delay);
  };
})();

export default debounce;
