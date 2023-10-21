export async function POST(req) {
  const formData = await req.formData();

  const res = await fetch(
    "https://api.cloudmersive.com/convert/pdf/to/docx/rasterize",
    {
      method: "POST",
      headers: {
        "API-Key": process.env.CLUD_MSSV_APIKEY,
      },
      body: req.formData,
    }
  );

  const data = await res.json();

  return Response.json(data);
}

//   method: "POST",
//   headers: {
//     Apikey: process.env.CLUD_MSSV_APIKEY, // Replace with your actual API key
//   },
//   body: formData,
