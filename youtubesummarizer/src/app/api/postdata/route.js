import { NextResponse } from "next/server";
import { getXataClient } from "../../xata";

const xata = getXataClient();

// Next.js edge runtime
// https://nextjs.org/docs/pages/api-reference/edge
export const runtime = "edge";
export const preferredRegion = "iad1";

export async function POST(request) {
  const formData = await request.formData();

  const name = formData.get("name");
  const bio = formData.get("bio");
  const email = formData.get("email");

  const record = await xata.db.Users.create({
    name: name,
    email: email,
    bio: bio,
  });

  return NextResponse.json(record.toSerializable());
}
