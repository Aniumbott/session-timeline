import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import SessionDetails from "./components/SessionDetails";
import Home from "./components/Home";

function App() {
  return (
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session/:sessionId" element={<SessionDetails />} />
      </Routes>
      </BrowserRouter>
     
  );
}

export default App;
