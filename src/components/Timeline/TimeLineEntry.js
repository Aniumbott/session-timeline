import React, { useEffect, useState } from "react";

export default function TimeLineEntry({ timeStamps, participant }) {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    setStart(new Date(Date.parse(participant.timelog[0].start)));
    setEnd(
      new Date(
        Date.parse(participant.timelog[participant.timelog.length - 1].end)
      )
    );
  }, [participant]);

  return (
    <tr className="relative">
      <td className="min-w-[75px] border-b border-y-theme-border border-x-theme-border-light h-[119px]"></td>
      {timeStamps.map((timeStamp, index) => {
        return (
          <td
            key={index}
            className="border-b border-x border-y-theme-border border-x-theme-border-light min-w-[150px]"
          ></td>
        );
      })}
    </tr>
  );
}