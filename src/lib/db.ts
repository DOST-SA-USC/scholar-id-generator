import { supabase } from "@/lib/supabaseClient";

interface UserData {
  user_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  birth_date: string;
  course: string;
  year_level: string;
  usc_id: string;
  scholarship_type: string;
  award_year: string;
}

// Fetch user by user_id
const fetchData = async (user_id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id)
    .single();

  return error ? null : data;
};

// Insert new user
const insertData = async (data: UserData) => {
  const existingUser = await fetchData(data.user_id);
  if (existingUser) return "User with this ID already exists.";

  const { error } = await supabase.from("users").insert([data]);

  if (error) {
    console.error("Insert error:", error.message);
    return "Error inserting user.";
  }

  return "User inserted successfully.";
};

export { fetchData, insertData };
