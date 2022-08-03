import { useState, useRef, useContext } from "react";
import SocketContext from "./SocketContext";
import { Link } from "react-router-dom";

function Socket() {
  const { socket, setStatus, status } = useContext(SocketContext);
  const fileInput = useRef();
  const customCode = useRef();
  const [file, setFile] = useState();
  const [code, setCode] = useState(createCode(15));

  function createCode(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <div className="socket">
      <h1>Upload file</h1>
      <h3>Please upload files you only have the right to share</h3>

      <div className="upload--box">
        <input
          type="file"
          id="fileInput"
          ref={fileInput}
          onChange={() => {
            if (fileInput.current.files[0].size < 5e7) {
              setStatus("Pending");
              setFile(fileInput.current.files[0]);
              socket.emit("upload", {
                file: fileInput.current.files[0],
                fileName: fileInput.current.files[0].name,
                code: code,
              });
            } else {
              alert("File is too big!");
            }
          }}
        />

        <div className="upload--box--code">
          <p>Share code</p>
          <input
            type="text"
            ref={customCode}
            onChange={() => setCode(customCode.current.value)}
            value={code}
          />
        </div>

        <i className="fa-solid fa-layer-group"></i>
        {file ? (
          <p>{file.name}</p>
        ) : (
          <p style={{ color: "#E9E9F3" }}>Please select your fle to upload</p>
        )}

        <button
          id="upload--box--selectBtn"
          onClick={() => fileInput.current.click()}
          className={status === "Pending" ? "disabled" : ""}
        >
          Browse computer
        </button>
        <small>Maximum file size is 50MB</small>
      </div>

      <br />
      {status === "Complete" && <Link to={`/download/${code}`}>Link</Link>}
    </div>
  );
}

export default Socket;
