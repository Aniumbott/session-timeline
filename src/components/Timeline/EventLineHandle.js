import {
  IconCamera,
  IconCameraOff,
  IconDeviceDesktop,
  IconDeviceSpeaker,
  IconDeviceSpeakerOff,
  IconExclamationCircle,
  IconLogout,
  IconMicrophone,
  IconMicrophoneOff,
  IconScreenShare,
  IconScreenShareOff,
  IconWifi,
  IconWifiOff,
} from "@tabler/icons-react";
import React, { useState } from "react";

export default function EventLineHandle({
  sessionStart,
  event,
  padding,
  fixed = false,
}) {
  const [showToolTip, setShowToolTip] = useState(false);
  return (
    // Event handle
    <div
      className={`${
        fixed ? "static" : "absolute"
      } flex items-center justify-center ${
        event.type === "session" || event.type === "network"
          ? "bg-theme-border"
          : event.type === "errors"
          ? "bg-theme-error"
          : "bg-theme-primary"
      } ${
        event.type === "errors"
          ? "h-[14px] w-[14px] rounded-[5px]"
          : "h-[24px] w-[24px] rounded-[10px]"
      }
      ${event.type === "group" ? "shadow-[0_3px]" : ""}
      ${showToolTip ? "z-20" : "z-10"}
      `}
      style={{
        left: timeToPx(sessionStart, event.time, padding),
        transform: !fixed ? "translateX(-50%) translateY(-50%)" : "",
      }}
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      {event.type === "group" ? (
        <p className="text-[14px] font-bold pointer-events-none">{event.events.length}</p>
      ) : (
        Icons[event.type][event.state ? 1 : 0]
      )}
      <div className="absolute top-[100%] p-[5px]">
        <ToolTip event={event} active={showToolTip} />
      </div>
    </div>
  );
}

function timeToPx(start, end, padding) {
  const ans = (end.getTime() - start.getTime()) / (padding * 60 * 1000);
  return Math.round(ans * 150).toString() + "px";
}

// Icons for different events with their states
const Icons = {
  session: [<IconLogout size={12} />, <IconDeviceDesktop size={12} />],
  network: [<IconWifi size={12} />, <IconWifiOff size={12} />],
  mic: [<IconMicrophoneOff size={12} />, <IconMicrophone size={12} />],
  webcam: [<IconCameraOff size={12} />, <IconCamera size={12} />],
  screenShare: [
    <IconScreenShareOff size={12} />,
    <IconScreenShare size={12} />,
  ],
  screenShareAudio: [
    <IconDeviceSpeakerOff size={12} />,
    <IconDeviceSpeaker size={12} />,
  ],
  errors: [<IconExclamationCircle size={8} />],
};

// ToolTip component to show the event details with recursive eventHandles
const ToolTip = ({ event, active }) => {
  return (
    <div
      className={`min-w-[110px] bg-theme-border text-theme-background p-1 rounded-lg z-20 ${
        active ? "block" : "hidden"
      }`}
    >
        {/* Event time */}
      <p className="text-[12px] px-1">
        <span className="opacity-[75%]">Time: </span>{" "}
        <span className="font-bold">
          {event.time.getHours() > 10
            ? event.time.getHours()
            : `0${event.time.getHours()}`}
          :
          {event.time.getMinutes() > 10
            ? event.time.getMinutes()
            : `0${event.time.getMinutes()}`}
        </span>
      </p>

      {/* Event type */}
      <p className="text-[12px] px-1">
        <span className="opacity-[75%]">Event: </span>{" "}
        <span className="font-bold">{event.type}</span>
      </p>

      {/* Event action, message or list based on type of events */}
      {event.type !== "group" ? (
        <p className="text-[12px] px-1">
          <span className="opacity-[75%]">
            {event.type !== "errors" ? "Action: " : "Message: "}
          </span>
          <span className="font-bold">
            {event.type !== "errors"
              ? EventActions[event.type][event.state ? 1 : 0]
              : event.message}
          </span>
        </p>
      ) : (
        // recursive event handle for group events
        <div className="relative flex flex-row items-center justify-start flex-wrap gap-1 p-1 mt-1 w-full bg-background rounded-xl ">
          {event.events.map((e, index) => (
            <EventLineHandle
              key={index}
              sessionStart={new Date(Date.parse(e.time))}
              event={e}
              padding={15}
              fixed={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Event actions based on event types
const EventActions = {
  session: ["Start", "End"],
  network: ["Connected", "Disconnected"],
  mic: ["Muted", "Unmuted"],
  webcam: ["Off", "On"],
  screenShare: ["Off", "On"],
  screenShareAudio: ["Off", "On"],
};
