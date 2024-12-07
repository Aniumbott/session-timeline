import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Session from "./pages/Session";
import Home from "./pages/Home";
import DisableZoom from "./components/DisableZoom";

function App() {
  return (
       <BrowserRouter>
       <DisableZoom />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions/:sessionId" element={<Session />} />
      </Routes>
      </BrowserRouter>
     
  );
}

export default App;
