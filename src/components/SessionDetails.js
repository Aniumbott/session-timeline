import { useState } from "react";
import { IconClipboard } from "@tabler/icons-react";
import ToggleSwitch from "./ToggleSwitch";
import TimeLine from "./TimeLine";
import { useParams } from "react-router-dom";

export default function SessionDetails() {
  const [start, setStart] = useState(
    new Date(Date.parse("2024-04-02T11:31:52.746Z"))
  );
  const [end, setEnd] = useState(
    new Date(start.getTime() + 1000 * 60 * 60 * 2)
  );
  const [padding, setPadding] = useState(1);

  return (
    <main className="flex flex-col h-screen flex-grow items-stretch">
      <Details />
      <TimeLine
        start={start}
        end={end}
        padding={padding}
        setPadding={setPadding}
      />
    </main>
  );
}

const Details = () => {
  const { sessionId } = useParams();
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
        <p className="text-[14px] font-bold bg-theme-border px-[5px] rounded">{sessionId}</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-[14px]">Show Participants timeline</p>
        <ToggleSwitch checked={checked} setChecked={setChecked} />
      </div>
    </div>
  );
};
