import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { sessions } from "../data/sessions";
import axios from "axios";
export default function Home() {
  const [sessions, setSessions] = React.useState([]);
  
  useEffect(() => {
    gatherSessions().then((sessions) => {
      setSessions(sessions);
      console.log(sessions);
    });
  }, []);

  return (
    <main className="flex flex-col h-screen flex-grow items-stretch p-5">
      <p className="text-2xl font-bold">Available Sessions</p>
      <div className="flex flex-row flex-wrap gap-2 m-5">
        {
          // List of available sessions
          sessions.map((session) => (
            <Link to={`/sessions/${session.id}`} key={session.id}>
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
    <div className="w-[300px] flex flex-row items-center justify-between gap-3 p-3 bg-theme-border-light rounded-xl hover:bg-theme-primary">
      <p className="text-[12px]">{session.meetingId}</p>
     <div className="flex flex-row text-[10px] py-1 px-2 bg-background rounded-md opacity-60"><span>id: </span> <span className="font-bold">{session.id}</span></div>
    </div>
  );
};

async function gatherSessions() {
  let allSessions = [];
  try {
    // Fetch first page to get total pages
    const firstPageResponse = await axios.get(`${process.env.REACT_APP_API_URL}/sessions?page=1`);
    allSessions = allSessions.concat(firstPageResponse.data.sessions);
    const totalPages = firstPageResponse.data.totalPages;

    // Fetch the rest of the pages
    const requests = [];
    for (let i = 2; i <= totalPages; i++) {
      requests.push(axios.get(`${process.env.REACT_APP_API_URL}/sessions?page=${i}`));
    }

    // Wait for all requests to finish
    const responses = await Promise.all(requests);
    responses.forEach(response => {
      allSessions = allSessions.concat(response.data.sessions);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }

  return allSessions;
}