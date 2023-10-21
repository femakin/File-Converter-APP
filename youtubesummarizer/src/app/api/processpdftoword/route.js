import { NextResponse, NextRequest } from "next/server";

export async function POST(req, res) {
  const formData = await req.formData();
  const inputFile = formData.get("inputFile");

  const apiKey = process.env.APIKEY;

  if (!inputFile) {
    throw new Error("No file provided.");
  }

  const formdata = new FormData();
  formdata.append("inputFile", inputFile);

  // Set up the request headers
  const myHeaders = new Headers();
  myHeaders.append("Apikey", apiKey);

  // Configure the request options
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  // Make the request to the Cloudmersive API
  const response = await fetch(
    "https://api.cloudmersive.com/convert/pdf/to/docx",
    requestOptions
  );

  if (!response.ok) {
    throw new Error("API request failed.");
  }

  //   console.log(response, "responseeeeee");

  const result = await response.blob();

  return new Response(result);
}
