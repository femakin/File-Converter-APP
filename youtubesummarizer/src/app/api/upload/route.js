import { worker, isMainThread, parentPort, workerData } from "worker_threads";
import path from "path";
import { NextResponse, NextRequest } from "next/server";

const AsposePDFWebWorkerPath = path.join(__dirname, "AsposePDFforJS.js");

if (!isMainThread) {
  // This code will run in the worker thread
  parentPort.on("message", async (message) => {
    const { operation, params } = message;

    if (operation === "AsposePdfToDocX") {
      const [fileContent, fileName, outputFileName] = params;

      // Your PDF to DOCX conversion logic here

      // For example, if you were using a hypothetical conversion function:
      const result = await hypotheticalConversionFunction(
        fileContent,
        fileName
      );

      if (result.success) {
        parentPort.postMessage({ errorCode: 0, json: result });
      } else {
        parentPort.postMessage({
          errorCode: 1,
          errorText: "Conversion failed",
        });
      }
    }
  });
}

export async function POST(req, res) {
  console.log(req, "reqqqq");
  if (req.method === "POST") {
    console.log(req.file, "req.file");
    console.log(req.files, "reqqqqq222222");
    const file = req.files;
    if (!file) {
      return NextResponse.status(400).json({ message: "No File selected!" });
    }
    const fileContent = await file.arrayBuffer();
    const worker = new Worker(AsposePDFWebWorkerPath);
    worker.postMessage({
      operation: "AsposePdfToDocX",
      params: [fileContent, file.name, "ResultPDFtoDocX.docx"],
    });
    worker.on("message", async (result) => {
      if (result.errorCode === 0) {
        const docxFile = new Blob([result.json.fileContent], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        const docxFileName = result.json.fileNameResult;
        NextResponse.setHeader(
          "Content-Disposition",
          `attachment; filename="${docxFileName}"`
        );
        NextResponse.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        NextResponse.send(docxFile);
      } else {
        NextResponse.status(500).json({ message: result.json.errorText });
      }
    });
  } else {
    return NextResponse.status(405).json({ message: "Method Not Allowed" });
  }
}
