import { useState, useRef, useContext } from "react";
import SocketContext from "./SocketContext";
import { Link } from "react-router-dom";

function Socket() {
  const { socket } = useContext(SocketContext);
  const fileInput = useRef();
  const customCode = useRef();
  const selectBtn = useRef();
  const maxFileSize = useRef();
  const maxFilesNumer = useRef();
  const downloadLink = useRef();
  const copyMessage = useRef();
  const [files, setFiles] = useState();
  // eslint-disable-next-line
  const [status, setStatus] = useState();
  let [totalFiles, setTotalFiles] = useState();
  let [totalUploads, setTotalUploads] = useState(0);
  let [totalErrors, setTotalErrors] = useState(0);
  // eslint-disable-next-line
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

  socket.on("upload.status", (upStatus) => {
    setStatus(upStatus);
    if (upStatus === "Complete") {
      setTotalUploads((totalUploads += 1));
    } else if (upStatus === "Error") {
      setTotalErrors((totalErrors += 1));
    }
  });

  return (
    <div className="socket">
      <h1>Upload files</h1>
      <h3>Please upload files you only have the right to share</h3>

      <div className="upload--box">
        <input
          multiple
          type="file"
          id="fileInput"
          ref={fileInput}
          onChange={() => {
            setTotalUploads(0);
            setTotalErrors(0);
            const files = fileInput.current.files;
            setFiles(files);
            setTotalFiles(files.length);
            if (files.length > 10) {
              setFiles();
              maxFilesNumer.current.style.cssText = `
              color: #f6618c;
              transform: scale(1.05);
              `;
              setTimeout(() => {
                maxFilesNumer.current.style.cssText = "";
              }, 2000);
              return;
            }
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (file.size < 1e7) {
                socket.emit("upload", {
                  file: file,
                  fileName: file.name,
                  code: code,
                });
              } else {
                setTotalErrors((totalErrors += 1));
                maxFileSize.current.style.cssText = `
              color: #f6618c;
              transform: scale(1.05);
              `;
                setTimeout(() => {
                  maxFileSize.current.style.cssText = "";
                }, 2000);
              }
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
            // onChange={() => {
            //   setCode(customCode.current.value);
            //   if (customCode.current.value.length < 10) {
            //     selectBtn.current.classList.add("disabled");
            //   } else {
            //     selectBtn.current.classList.remove("disabled");
            //   }
            // }}
            disabled
            value={code}
          />
        </div>

        <i className="fa-solid fa-layer-group"></i>

        {files ? (
          <p>
            {totalUploads} / {files.length} files have been uploaded.{" "}
            {totalErrors > 0 && <span>Errors: {totalErrors}</span>}
          </p>
        ) : (
          <p style={{ color: "#E9E9F3" }}>Please select your fles to upload</p>
        )}

        <button
          id="upload--box--selectBtn"
          ref={selectBtn}
          onClick={() => fileInput.current.click()}
          className={
            totalFiles > totalUploads + totalErrors
              ? "disabled pulse-animation"
              : ""
          }
        >
          {totalFiles > totalUploads + totalErrors
            ? "Uploading files ..."
            : "Browse computer"}
        </button>

        <small ref={maxFileSize}>Maximum file size is 10MB</small>
        <small ref={maxFilesNumer}>Maximum 10 files per upload</small>

        <div className="download--link">
          {totalFiles === totalUploads + totalErrors ? (
            <div>
              <Link target={"_blank"} to={`/download/${code}`} ref={downloadLink}>
                DOWNLOAD LINK
              </Link>
              <i
                className="fa-solid fa-copy"
                onClick={() => {
                  navigator.clipboard
                    .writeText(downloadLink.current.href)
                    .then(() => {
                      copyMessage.current.classList.add("slide-in-out");
                      setTimeout(
                        () =>
                          copyMessage.current.classList.remove("slide-in-out"),
                        2000
                      );
                    })
                    .catch(() => {
                      console.log("Can't copy the link");
                    });
                }}
              ></i>
            </div>
          ) : (
            <p style={{ pointerEvents: "none" }}>
              Your download link will appear here
            </p>
          )}
        </div>
      </div>

      <br />
      <p id="copyMessage" ref={copyMessage}>
        Copied Successfully
      </p>
    </div>
  );
}

export default Socket;