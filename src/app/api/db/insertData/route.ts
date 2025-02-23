import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const apiKey = req.headers.get("API_KEY");
  const validApiKey = process.env.API_SECRET_KEY;

  // 🔒 API Key validation
  if (apiKey !== validApiKey) {
    return new Response(JSON.stringify({ error: "Invalid API Key." }), {
      status: 401,
    });
  }

  const {
    user_id,
    first_name,
    middle_name,
    last_name,
    birth_date,
    course,
    year_level,
    usc_id,
    scholarship_type,
    award_year,
  } = await req.json();

  // ✅ Required fields check
  const requiredFields = {
    user_id,
    first_name,
    last_name,
    birth_date,
    course,
    year_level,
    usc_id,
    scholarship_type,
    award_year,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(
      ([_, value]) => value === null || value === undefined || value === ""
    )
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return new Response(
      JSON.stringify({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      }),
      { status: 400 }
    );
  }

  // 🔎 Check if user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("user_id")
    .eq("user_id", user_id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return new Response(JSON.stringify({ error: fetchError.message }), {
      status: 500,
    });
  }

  if (existingUser) {
    return new Response(
      JSON.stringify({ error: "User with this ID already exists." }),
      { status: 409 }
    );
  }

  // 📝 Insert user data
  const { error } = await supabase.from("users").insert([
    {
      user_id,
      first_name,
      middle_name,
      last_name,
      birth_date,
      course,
      year_level,
      usc_id,
      scholarship_type,
      award_year,
    },
  ]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({ message: "Inserted User Data Successfully." }),
    { status: 201 }
  );
}
