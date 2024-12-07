import { useEffect, useState } from "react";
import { IconClipboard } from "@tabler/icons-react";
import ToggleSwitch from "../components/ToggleSwitch";
import TimeLine from "../components/Timeline";
import { useParams } from "react-router-dom";
import { sessions } from "../data/sessions";

export default function Session() {
  const [session, setSession] = useState(null);
  const [showTimeline, setShowTimeline] = useState(true);
  const { sessionId } = useParams();
  useEffect(() => {
    setSession(sessions.find((s) => s.meetingId === sessionId));
  }, [sessionId]);

  return (
    <main className="flex flex-col h-screen flex-grow items-stretch">
      {/* Header section */}
      <Details
        showTimeline={showTimeline}
        setShowTimeline={setShowTimeline}
      />

      {/* Timeline section */}
      <TimeLine session={session} showTimeline={showTimeline} />
    </main>
  );
}

const Details = ({ showTimeline, setShowTimeline }) => {
  return (
    <div className="w-full h-[49px] p-[16px] border-b border-theme-border bg-background-secondary flex flex-row items-center justify-between">
      <div className="flex flex-row gap-1 items-center">
        <IconClipboard size={"17px"} />
        <p className="text-[14px] font-bold">
          Participants wise Session Timeline
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-[14px]">Show Participants timeline</p>
        <ToggleSwitch checked={showTimeline} setChecked={setShowTimeline} />
      </div>
    </div>
  );
};
