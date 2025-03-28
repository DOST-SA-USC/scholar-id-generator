import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = req.headers.get("DOSTSAUSC_API_KEY");

  if (apiKey !== process.env.DOSTSAUSC_API_KEY) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid API Key" },
      { status: 401 }
    );
  }

  const { email_address, redirect_url } = await req.json();

  if (
    !Array.isArray(email_address) ||
    email_address.length === 0 ||
    !redirect_url
  ) {
    return NextResponse.json(
      { error: "Missing required fields or invalid email_address format" },
      { status: 400 }
    );
  }

  try {
    const results = await Promise.all(
      email_address.map(async (email) => {
        const response = await fetch("https://api.clerk.com/v1/invitations", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email_address: email, redirect_url }),
        });

        if (!response.ok) {
          const error = await response.json();
          return { email, success: false, error, status: response.status };
        }

        const data = await response.json();
        return { email, success: true, data };
      })
    );

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
