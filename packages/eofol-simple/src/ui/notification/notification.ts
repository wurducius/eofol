import { sy, generateId } from "@eofol/eofol";

const NOTIFICATION_POSITION_MARGIN = "32px";

sy(
  {
    position: "fixed",
    zIndex: 10,
    padding: "16px",
    minWidth: "250px",
    backgroundColor: "#222222",
    color: "#dddddd",
  },
  "notification-base"
);
sy(
  {
    left: "50%",
    transform: "translateX(-50%)",
  },
  "notification-center"
);
sy(
  {
    right: NOTIFICATION_POSITION_MARGIN,
  },
  "notification-right"
);
sy(
  {
    left: NOTIFICATION_POSITION_MARGIN,
  },
  "notification-left"
);

type NotifyPosition =
  | undefined
  | "top"
  | "top-right"
  | "top-left"
  | "bottom"
  | "bottom-right"
  | "bottom-left";

const getHorizontal = (position: NotifyPosition) => {
  if (position === "top-right" || position === "bottom-right") {
    return "right";
  }
  if (position === "top-left" || position === "bottom-left") {
    return "left";
  }
  return "center";
};

let notifyQueue: string[] = [];

const notify = ({
  title,
  icon,
  position,
  color,
}: {
  title: string;
  icon?: string;
  color?: string;
  position?: NotifyPosition;
}) => {
  const verticalFromTop =
    position === "top" || position === "top-right" || position === "top-left";
  const horizontal = getHorizontal(position);

  const id = generateId();
  const index = notifyQueue.length;
  notifyQueue.push(id);

  const element = document.createElement("div");
  element.setAttribute("id", id);
  element.innerHTML = title;
  element.className = `notification-base notification-${horizontal}`;
  element.setAttribute(
    "style",
    `${verticalFromTop ? "top" : "bottom"}: ${32 + (52 + 8) * index}px`
  );
  document.body.append(element);

  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      document.body.removeChild(element);
    }
    notifyQueue = notifyQueue.filter((itemId) => itemId !== id);
    notifyQueue.forEach((itemId, index) => {
      const item = document.getElementById(itemId);
      if (item) {
        item.setAttribute(
          "style",
          `${verticalFromTop ? "top" : "bottom"}: ${32 + (52 + 8) * index}px`
        );
      }
    });
  }, 3000);
};

export default notify;
