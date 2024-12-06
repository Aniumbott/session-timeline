import React from "react";
import { useEffect, useState } from "react";

export default function TimeLine(props) {
  const { start, end, padding, setPadding } = props;
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
    <div className="flex flex-col items-stretch h-full w-auto overflow-x-scroll">
      <TimeStampsLables
        timeStamps={timeStamps}
        padding={padding}
        setPadding={setPadding}
      />
      <TimeLineBars timeStamps={timeStamps} />
    </div>
  );
}

const TimeStampsLables = ({ timeStamps, padding, setPadding }) => {
  return (
    <div
      className="h-[49px] w-full flex flex-row items-center cursor-ns-resize"
      onWheel={(e) => {
        let newPadding = padding + Math.round(e.deltaY / 100);
        if (newPadding < 10) newPadding = 10;
        if (newPadding > 60) newPadding = 60;
        setPadding(newPadding);
      }}
    >
      {timeStamps.map((timeStamp, index) => {
        return (
          <div
            key={index}
            className="h-full min-w-[150px] border-b border-theme-border flex items-center justify-center"
          >
            <p className="text-[14px] font-bold text-theme-text-dull select-none">
              {timeStamp}
            </p>
          </div>
        );
      })}
      <div className="w-[1px] h-full bg-theme-border"></div>
    </div>
  );
};

const TimeLineBars = ({ timeStamps }) => {
  return (
    <div className="h-full flex flex-row items-stretch cursor-ew-resize">
      {timeStamps.map((timeStamp, index) => {
        return (
          <div
            key={index}
            className="min-w-[150px] flex items-center justify-center"
          >
            <div className="w-[1px] h-full bg-theme-border"></div>
          </div>
        );
      })}
      <div className="w-[1px] h-full bg-theme-border"></div>
    </div>
  );
};
