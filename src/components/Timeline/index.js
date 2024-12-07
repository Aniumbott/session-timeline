import React from "react";
import { useEffect, useState } from "react";
import TimeLineEntry from "./TimeLineEntry";

export default function TimeLine({ session, showTimeline }) {
  const [start, setStart] = useState(new Date()); // Session start time
  const [end, setEnd] = useState(new Date()); // Session end time
  const [padding, setPadding] = useState(1); // Padding between timestamps
  const [participants, setParticipants] = useState([]); // List of participants in the session
  const [timeStamps, setTimeStamps] = useState([]); // List of timestamps

  // Update the state when the session changes
  useEffect(() => {
    if (session) {
      setStart(new Date(Date.parse(session.start)));
      setEnd(new Date(Date.parse(session.end)));
      setParticipants(session.participantArray);
    }
  }, [session]);

  // Generate timestamps based on the session start and end time
  useEffect(() => {
    const lst = [];
    for (
      let i = new Date(start);
      i < end;
      i.setMinutes(i.getMinutes() + padding)
    ) {
      lst.push(i.toTimeString().split(" ")[0].slice(0, 5));
    }
    setTimeStamps(lst);
  }, [start, end, padding]);

  return (
    <div className="h-full w-auto overflow-x-scroll">
      <table
        className="border-separate border-spacing-0 border-x border-theme-border"
        // Update padding on CTRL+scrolL
        onWheel={(e) => {
          if (e.ctrlKey || e.metaKey) {
            let newPadding = padding + Math.round(e.deltaY / 100);
            if (newPadding < 1) newPadding = 1;
            if (newPadding > 60) newPadding = 60;
            setPadding(newPadding);
          }
        }}
      >
        <thead>
          {/* Timestamps as table header data */}
          <TimeLineLabels timeStamps={timeStamps} />
        </thead>
        <tbody>
          {participants.map((p) => {
            return (
              // Timeline entry for each participant as table row
              <TimeLineEntry
                key={p.participantId}
                sessionStart={start}
                participant={p}
                padding={padding}
                timeStamps={timeStamps}
                showTimeline={showTimeline}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const TimeLineLabels = ({ timeStamps }) => {
  return (
    <tr className="sticky top-0 bg-background z-10">
      <th className="w-[75px] border-b border-theme-border"></th>
      {timeStamps.map((timeStamp, index) => {
        return (
          <th
            key={index}
            className="h-[49px] w-[150px]  relative border-b border-theme-border"
          >
            <p className="text-[14px] absolute top-[25%] left-[-20px] font-bold text-theme-text-dull select-none">
              {timeStamp}
            </p>
          </th>
        );
      })}
    </tr>
  );
};
