"use server";

import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function processpdftoword(formData) {
  console.log(formData, "formdatatatta");
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

  console.log(response, "responseee");

  if (!response.ok) {
    throw new Error("API request failed.");
  }

  // Handle the response as needed
  //   console.log(result, "resulttttt");
  const result = await response.text();

  console.log(result, "resulttttttt");

  return result;
}
