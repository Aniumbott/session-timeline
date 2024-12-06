import { useEffect, useState } from "react";
import { IconClipboard } from "@tabler/icons-react";
import ToggleSwitch from "./ToggleSwitch";
import TimeLine from "./Timeline";
import { useParams } from "react-router-dom";
import sesJSON from "../data/session.json";

export default function SessionDetails() {
  const [session, setSession] = useState(sesJSON);

  return (
    <main className="flex flex-col h-screen flex-grow items-stretch">
      <Details sessionId={session.meetingId}/>
      <TimeLine
        session={session}
      />
    </main>
  );
}

const Details = ({sessionId}) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="w-full h-[49px] p-[16px] border-b border-theme-border bg-background-secondary flex flex-row items-center justify-between">
      <div className="flex flex-row gap-1 items-center">
        <IconClipboard size={"17px"} />
        <p className="text-[14px] font-bold">
          Participants wise Session Timeline
        </p>
      </div>
      <div className="flex flex-row gap-1">
        <p className="text-[14px]">Session:</p>
        <p className="text-[14px] font-bold bg-theme-border px-[5px] rounded">
          {sessionId}
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-[14px]">Show Participants timeline</p>
        <ToggleSwitch checked={checked} setChecked={setChecked} />
      </div>
    </div>
  );
};
