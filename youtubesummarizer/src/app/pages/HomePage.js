"use client";

import { useState, useEffect } from "react";
import SubmitVideo from "./SubmitVideo";
import Pdfpage from "./Pdfpage";

export default function HomePage() {
  const [focused, setFocused] = useState();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`/api/getdata`);

        if (!response.ok) {
          console.log(response.status, "response.status");
          console.error(`Fetch failed with status ${response.status}`);
          return;
        }

        const results = await response.json();

        if (results) {
          console.log(results, "resultssss");
          setFocused(results);
        } else {
          console.error("Empty or invalid JSON response");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <>
      <h1>Homepage</h1>
      {/* <SubmitVideo /> */}
      <Pdfpage />
    </>
  );
}
