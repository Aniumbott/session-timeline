import React from "react";
import { useEffect, useState } from "react";
import TimeLineEntry from "./TimeLineEntry";

export default function TimeLine({ session }) {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [padding, setPadding] = useState(1);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (session) {
      setStart(new Date(Date.parse(session.start)));
      setEnd(new Date(Date.parse(session.end)));
      setParticipants(session.participantArray);
    }
  }, [session]);

  const [timeStamps, setTimeStamps] = useState([]);
  useEffect(() => {
    const lst = [];
    for (
      let i = new Date(start);
      i < end;
      i.setMinutes(i.getMinutes() + padding)
    ) {
      lst.push(i.toTimeString().split(" ")[0].slice(0, 5));
    }
    if (lst[lst.length - 1] !== end.toTimeString().split(" ")[0].slice(0, 5)) {
      lst.push(end.toTimeString().split(" ")[0].slice(0, 5));
    }
    setTimeStamps(lst);
  }, [start, end, padding]);

  return (
    <div className="h-full w-auto overflow-x-scroll">
      <table
        className="border-separate border-spacing-0 border-l border-theme-border"
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
          <TimeLineLabels
            timeStamps={timeStamps}
            padding={padding}
            setPadding={setPadding}
          />
        </thead>
        <tbody>
          {participants.map((p) => {
            return (
              <TimeLineEntry
                key={p.participantId}
                timeStamps={timeStamps}
                participant={p}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const TimeLineLabels = ({ timeStamps, padding, setPadding }) => {
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
