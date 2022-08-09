import { createContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
const socket = io("https://file-sharing.ddns.net:3000");

export function SocketProvider({ children }) {

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;