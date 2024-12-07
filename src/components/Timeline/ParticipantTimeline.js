import React, { useEffect, useState } from "react";
import EventLine from "./EventLine";
import EventLineHandle from "./EventLineHandle";

export default function ParticipantTimeline({
  sessionStart,
  participant,
  padding,
}) {
  const [events, setEvents] = useState([]);
  const [networkEvents, setNetworkEvents] = useState([]);

  // Building total events based on the participant data
  // event : {time, state, type|message}
  useEffect(() => {
    let newEvents = [];

    // Adding timelogs to events
    participant.timelog.map((t, key) => {
      newEvents.push({
        time: new Date(Date.parse(t.start)),
        state: true,
        type: "session",
      });
      newEvents.push({
        time: new Date(Date.parse(t.end)),
        state: false,
        type: "session",
      });
    });

    // Adding events
    Object.keys(participant.events).map((event, key) => {
      participant.events[event].map((e, k) => {
        if (event === "errors") {
          newEvents.push({
            time: new Date(Date.parse(e.start)),
            state: false,
            type: "errors",
            message: e.message,
          });
        } else {
          newEvents.push({
            time: new Date(Date.parse(e.start)),
            state: true,
            type: event,
          });
          newEvents.push({
            time: new Date(Date.parse(e.end)),
            state: false,
            type: event,
          });
        }
      });
    });

    // Sorting the events keeping the session events at the end
    newEvents.sort((a, b) => {
      if (Math.abs(a.time - b.time) < 100) {
        if (a.type === "session") {
          return 1;
        }
        if (b.type === "session") {
          return -1;
        }
        return 0;
      }
      return a.time - b.time;
    });

    // Network issue detection based on the total active events
    let eventCount = 0;
    let networkEvents = [];
    for (let i = 0; i < newEvents.length; i++) {
      if (newEvents[i].type !== "session" && newEvents[i].type !== "errors") {
        if (newEvents[i].state) {
          eventCount++;
        } else {
          eventCount--;
        }
      } else if (newEvents[i].type === "session" && eventCount > 0) {
        // Network issue detected
        newEvents[i].type = "network";
        newEvents[i].state = !newEvents[i].state;
        if (newEvents[i].state) {
          networkEvents.push({
            start: newEvents[i].time,
            end: newEvents[i].time,
          });
        } else {
          if (networkEvents.length > 0) {
            networkEvents[networkEvents.length - 1].end = newEvents[i].time;
          }
        }
      }
    }

    // Grouping of the overlapping events based on their time difference
    for (let i = 0; i < newEvents.length - 1; i++) {
      let j = 1;
      while (
        i + j < newEvents.length &&
        timeToPx(sessionStart, newEvents[i + j].time, padding) -
          timeToPx(sessionStart, newEvents[i].time, padding) <
          12
      ) {
        j++;
      }
      if (j > 1) {
        newEvents.splice(i, j, {
          time: newEvents[i].time,
          type: "group",
          events: newEvents.slice(i, i + j),
        });
      }
    }

    // Set the events and network events states
    setEvents(newEvents);
    setNetworkEvents(networkEvents);
  }, [participant, padding]);

  return (
    <div className="absolute top-[75%] left-[75px] w-[calc(100%-75px)]">
      {
        // Sessions lines
        participant.timelog.map((t, key) => {
          const n = participant.timelog.length;
          return (
            <EventLine
              key={key}
              sessionStart={sessionStart}
              start={new Date(Date.parse(t.start))}
              end={new Date(Date.parse(t.end))}
              padding={padding}
              type={"session"}
            />
          );
        })
      }
      {
        // Network issue lines
        networkEvents.map((e, key) => {
          return (
            <EventLine
              key={key}
              sessionStart={sessionStart}
              start={e.start}
              end={e.end}
              padding={padding}
              type={"network"}
            />
          );
        })
      }
      {
        // Events lines
        Object.keys(participant.events).map((event, key) => {
          if (event !== "errors") {
            return participant.events[event].map((e, k) => {
              return (
                <EventLine
                  key={key + k}
                  sessionStart={sessionStart}
                  start={new Date(Date.parse(e.start))}
                  end={new Date(Date.parse(e.end))}
                  padding={padding}
                  type={event}
                />
              );
            });
          }
        })
      }
      {
        // Line handles
        events.map((e, key) => {
          return (
            <EventLineHandle
              key={key}
              event={e}
              sessionStart={sessionStart}
              padding={padding}
            />
          );
        })
      }
    </div>
  );
}

function timeToPx(start, end, padding) {
  const ans = (end.getTime() - start.getTime()) / (padding * 60 * 1000);
  return Math.round(ans * 150);
}
