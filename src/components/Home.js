import React from "react";
import { Link } from "react-router-dom";
import { sessions } from "../data/sessions";
export default function Home() {
  return (
    <main className="flex flex-col h-screen flex-grow items-stretch p-5">
      <p className="text-2xl font-bold">Available Sessions</p>
      <div className="flex flex-row flex-wrap gap-2 m-5">
        {
          // List of available sessions
          sessions.map((session) => (
            <Link to={`/sessions/${session.meetingId}`} key={session.meetingId}>
              <Card session={session} />
            </Link>
          ))
        }
      </div>
    </main>
  );
}

// Card component for session
const Card = ({ session }) => {
  return (
    <div className="w-[300px] flex flex-row  gap-3 p-3 bg-theme-border-light rounded-xl">
      <p className="text-sm">{session.meetingId}</p>
      <p>{session.description}</p>
    </div>
  );
};
