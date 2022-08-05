import "./socket.scss";
import "./download.scss";
import Socket from "./Components/Socket";
import Download from "./Components/Download";
import { SocketProvider } from "./Components/SocketContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Socket />} />
          <Route path="/download/:code" element={<Download />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
