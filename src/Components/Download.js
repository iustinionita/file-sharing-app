import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import SocketContext from "./SocketContext";

function Download() {
  const { socket } = useContext(SocketContext);
  const { code } = useParams();
  const [files, setFiles] = useState();

  useEffect(() => {
    socket.emit("getFilesByName", code);
    socket.on("file", (file) => {
      if (file !== "404") {
        setFiles(file);
      }
    });
  }, [code, socket]);

  function setIcon(fileType) {
    const text = [
      ".doc",
      ".docx",
      ".eml",
      ".log",
      ".msg",
      ".odt",
      ".pages",
      ".rtf",
      ".tex",
      ".txt",
      ".wpd",
    ];
    const data = [
      ".aae",
      ".bin",
      ".csv",
      ".dat",
      ".key",
      ".mpp",
      ".obb",
      ".ppt",
      ".pptx",
      ".rpt",
      ".sdf",
      ".tar",
      ".vcf",
      ".xml",
    ];
    const audio = [
      ".aif",
      ".flac",
      ".m3u",
      ".m4a",
      ".mid",
      ".mp3",
      ".ogg",
      ".wav",
      ".wma",
    ];
    const video = [
      ".3gp",
      ".asf",
      ".avi",
      ".flv",
      ".m4v",
      ".mov",
      ".mp4",
      ".mpg",
      ".srt",
      ".swf",
      ".vob",
      ".wmv",
    ];
    const image = [
      ".bmp",
      ".dds",
      ".gif",
      ".heic",
      ".jpg",
      ".jpeg",
      ".png",
      ".psd",
      ".tga",
      ".tif",
      ".ico",
    ];
    const vector = [".emf", ".ps", ".sketch", ".svg"];
    const layout = [".pdf", ".pub", ".qxp", ".xps"];
    const spreadsheet = [".numbers", ".ods", ".xlr", ".xls", ".xlsx"];
    const types = [
      text,
      data,
      audio,
      video,
      image,
      vector,
      layout,
      spreadsheet,
    ];
    const classNameObj = {
      0: "fa-file-lines",
      1: "fa-file-shield",
      2: "fa-file-audio",
      3: "fa-file-video",
      4: "fa-file-image",
      5: "fa-file-contract",
      6: "fa-file-pdf",
      7: "fa-file-excel",
    };
    let className = "fa-file";

    types.forEach((type) => {
      if (type.includes(fileType)) {
        className = classNameObj[types.indexOf(type)];
      }
    });

    return className;
  }

  return (
    <div className="download">
      <h1>Download</h1>
      <h3>
        The shared files are not scanned for viruses. Use at your own risk.
      </h3>
      <div className="download--files">
        <h2>SHARED FILES</h2>
        {files ? (
          files.map((file) => {
            return (
              <div className="download--file" key={Math.random() * 10}>
                <i
                  className={`fa-solid ${setIcon(
                    file.slice(file.lastIndexOf("."), file.length)
                  )}`}
                ></i>
                <a
                  href={`https://file-sharing.ddns.net:3000/download/file/[${code}]${file}`}
                  download
                >
                  <span>{file}</span>
                  <i className="fa-solid fa-download"></i>
                </a>
              </div>
            );
          })
        ) : (
          <div className="download--file">
            <p id="no--files">NO FILES</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Download;
