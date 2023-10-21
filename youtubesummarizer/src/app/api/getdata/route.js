import { getXataClient } from "../../xata";

export const runtime = "edge";
export const preferredRegion = "iad1";

const xata = getXataClient();

export async function GET() {
  const page = await xata.db.Users.select([
    "id",
    "name",
    "email",
    "bio",
  ]).getPaginated({
    pagination: {
      size: 15,
    },
  });

  // Return the results as JSON
  return new Response(JSON.stringify(page.records), {
    headers: { "Cache-Control": "max-age=1, stale-while-revalidate=300" },
  });
}
