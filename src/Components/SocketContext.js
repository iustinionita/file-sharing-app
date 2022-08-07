import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
const socket = io("http://file-sharing.ddns.net:3000");

export function SocketProvider({ children }) {

    // const [code, setCode] = useState("");

    // useEffect(() => {
    //     const shareCode = sessionStorage.getItem("shareCode");
    //     if (shareCode == null) {
    //         const newCode = createCode(15);
    //         setCode(newCode);
    //         sessionStorage.setItem("shareCode", newCode);
    //     } else {
    //         setCode(shareCode);
    //     }
    // }, []);

    // function createCode(length) {
    //     var result = "";
    //     var characters =
    //         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //     var charactersLength = characters.length;
    //     for (var i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // }

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;