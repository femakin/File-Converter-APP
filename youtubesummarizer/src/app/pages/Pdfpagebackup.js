"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function () {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const { pending, data } = useFormStatus();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Apikey", process.env.APIKEY);

    var formdata = new FormData();
    formdata.append("inputFile", selectedFile);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://api.cloudmersive.com/convert/pdf/to/docx", requestOptions)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        setDownloadLink(blobUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>PDF to DOC Converter</h1>

      <div>
        <input type="file" name="inputFile" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload File</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : downloadLink ? (
        <div>
          <a href={downloadLink} download="converted.docx">
            <button>Download Original File</button>
          </a>
        </div>
      ) : null}
    </div>
  );
}
