import React from "react";

export default function EventLine({
  sessionStart,
  start,
  end,
  padding,
  type,
}) {
  return (
    <div
      className={`absolute min-h-[4px] ${
        type !== "session" && type !== "network" ? "bg-theme-primary" : "bg-theme-border"
      } ${type==="network" ? "z-10" : "z-5"}`}
      style={{
        left: timeToPx(sessionStart, start, padding),
        width: timeToPx(start, end, padding),
      }}
    ></div>
  );
}

function timeToPx(start, end, padding) {
  const ans = (end.getTime() - start.getTime()) / (padding * 60 * 1000);
  return Math.round(ans * 150).toString() + "px";
}
