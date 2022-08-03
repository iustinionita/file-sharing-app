import { useState, useRef, useContext } from "react";
import SocketContext from "./SocketContext";
import { Link } from "react-router-dom";

function Socket() {
  const { socket, setStatus, status } = useContext(SocketContext);
  const fileInput = useRef();
  const customCode = useRef();
  const selectBtn = useRef();
  const maxFileSize = useRef();
  const downloadLink = useRef();
  const copyMessage = useRef();
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
              maxFileSize.current.style.cssText = `
              color: #f6618c;
              transform: scale(1.05);
              `;
              setTimeout(() => {
                maxFileSize.current.style.cssText = "";
                fileInput.current.value = "";
              }, 2000);
            }
          }}
        />

        <div className="upload--box--code">
          <p>Share code</p>
          <input
            type="text"
            ref={customCode}
            placeholder="Min. 10 characters"
            maxLength="20"
            onChange={() => {
              setCode(customCode.current.value);
              if (customCode.current.value.length < 10) {
                selectBtn.current.classList.add("disabled");
              } else {
                selectBtn.current.classList.remove("disabled");
              }
            }}
            value={code}
          />
        </div>

        <i
          className={`fa-solid fa-layer-group ${
            status === "Pending" ? "pulse-animation" : ""
          }`}
        ></i>

        {file ? (
          <p>{file.name}</p>
        ) : (
          <p style={{ color: "#E9E9F3" }}>Please select your fle to upload</p>
        )}

        <button
          id="upload--box--selectBtn"
          ref={selectBtn}
          onClick={() => fileInput.current.click()}
          className={status === "Pending" ? "disabled" : ""}
        >
          Browse computer
        </button>
        <small ref={maxFileSize}>Maximum file size is 50MB</small>
        <div className="download--link">
          {status === "Complete" ? (
            <div>
              <Link to={`/download/${code}`} ref={downloadLink}>{code}</Link>
              <i className="fa-solid fa-copy" onClick={() => {
                  navigator.clipboard.writeText(downloadLink.current.href);
                  copyMessage.current.classList.add("slide-in-out");
                  setTimeout(() => copyMessage.current.classList.remove("slide-in-out"), 2000)
              }}></i>
            </div>
          ) : (
            <p style={{pointerEvents: "none"}}>Your download link will appear here</p>
          )}
        </div>
      </div>

      <br />
      {/* {status === "Complete" && <Link to={`/download/${code}`}>Link</Link>} */}
      <p id="copyMessage" ref={copyMessage}>Copied Successfully</p>
    </div>
  );
}

export default Socket;
