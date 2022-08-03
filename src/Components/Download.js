import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import SocketContext from "./SocketContext";

function Download() {
  const { socket } = useContext(SocketContext);
  const { code } = useParams();
  const [files, setFiles] = useState();

  useEffect(() => {
    socket.emit("getFiles", code);
    socket.on("file", (files) => {
      if (files !== "404") {
        setFiles(files);
      }
    });
  });

  return (
    <div className="download">
      <h1>Download</h1>
      <p>{code}</p>
      <button
        onClick={() => {
          socket.emit("download", code);
        }}
      >
        Download
      </button>
      <button onClick={() => console.log(files)}>Show files</button>
      {files &&
        files.map((file) => {
          return (
            <a
              key={files.indexOf(file)}
              href={`http://192.168.0.33:3000/download/file/[${code}]${file}`}
            >
              {file}
            </a>
          );
        })}
    </div>
  );
}

export default Download;
