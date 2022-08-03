import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
const socket = io("192.168.0.33:3000");

export function SocketProvider({ children }) {
    const [status, setStatus] = useState();
    useEffect(() => {
        socket.on("upload.status", (upStatus) => setStatus(upStatus));
    }, []);
    return (
        <SocketContext.Provider value={{ socket, setStatus, status }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;