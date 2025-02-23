import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();

    const apiKey = req.headers.get("API_KEY");
    const validApiKey = process.env.API_SECRET_KEY;

    if (apiKey !== validApiKey) {
      return new Response(JSON.stringify({ error: "Invalid API Key." }), {
        status: 401,
      });
    }

    if (!user_id) {
      return new Response(JSON.stringify({ error: "User ID is required." }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid request body or headers." }),
      { status: 400 }
    );
  }
}
