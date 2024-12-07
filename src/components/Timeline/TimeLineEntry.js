import ParticipantDetails from "./ParticipantDetails";
import ParticipantTimeline from "./ParticipantTimeline";

export default function TimeLineEntry({
  sessionStart,
  participant,
  padding,
  timeStamps,
  showTimeline,
}) {
  return (
    <tr className="relative">
      {/* Empty cells as table data */}
      <td className="min-w-[75px] border-b border-y-theme-border border-x-theme-border-light h-[119px]"></td>
      {timeStamps.map((timeStamp, index) => {
        return (
          <td
            key={index}
            className="border-b border-x border-y-theme-border border-x-theme-border-light min-w-[150px]"
          ></td>
        );
      })}
      <td className="absolute top-0 left-0 h-full w-full pl-[23px] pt-4">
        {/* Information about participant */}
        <ParticipantDetails
          name={participant.name}
          id={participant.participantId}
          sessionStart={sessionStart}
          timelog={participant.timelog}
        />
        {showTimeline && (
          // Timeline of events of the participant
          <ParticipantTimeline
            sessionStart={sessionStart}
            participant={participant}
            padding={padding}
          />
        )}
      </td>
    </tr>
  );
}
