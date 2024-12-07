import React from "react";

export default function ParticipantDetails({
  name,
  id,
  sessionStart,
  timelog,
}) {
  return (
    <div className="fixed flex flex-col gap-2 bg-background">
      <p className="text-[16px] font-semibold">
        {name} ({id})
      </p>
      <p className="text-[12px] font-medium opacity-[75%]">
        {getDateFormat(new Date(sessionStart))} | Duration{" "}
        {getDuration(timelog)}
      </p>
    </div>
  );
}

// Helper functions
function getDateFormat(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

function getDuration(timelog) {
  let sec = 0;
  // Calculate total duration of participant based on timelog
  for (let i = 0; i < timelog.length; i++) {
    const start = new Date(Date.parse(timelog[i].start));
    const end = new Date(Date.parse(timelog[i].end));
    sec += Math.round((end.getTime() - start.getTime()) / 1000);
  }
  if (sec < 60) {
    return sec.toString() + " Secs";
  } else {
    let min = Math.floor(sec / 60);
    sec = sec % 60;
    if (min < 60) {
      return min.toString() + " Mins, " + sec.toString() + " Secs";
    } else {
      const hour = Math.floor(min / 60);
      min = min % 60;
      return (
        hour.toString() +
        " Hrs, " +
        min.toString() +
        " Mins, " +
        sec.toString() +
        " Secs"
      );
    }
  }
}
