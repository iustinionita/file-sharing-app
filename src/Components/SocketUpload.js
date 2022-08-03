import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import SocketIOFileUpload from "socketio-file-upload";

function SocketUpload() {
  const socket = io("192.168.0.33:8000");
  const input = useRef();
  const uploadBtn = useRef();
  const [progress, setProgress] = useState();

  useEffect(() => {
    const uploader = new SocketIOFileUpload(socket);
    uploader.listenOnSubmit(uploadBtn.current, input.current);
    // uploader.on("progress", (e) => {
    //   console.log(e);
    // });
    socket.on('upload.progress', uploadProgress => setProgress(uploadProgress))
  })



  return (
    <>
      <input type="file" ref={input} />
      <button ref={uploadBtn}>Upload</button>
      {progress && <p>{progress}</p>}
    </>
  );
}

export default SocketUpload;
