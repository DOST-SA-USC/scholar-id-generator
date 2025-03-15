import { supabase } from "@/lib/supabaseClient";

interface UserData {
  user_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  birth_date: string;
  program: string;
  year_level: string;
  usc_id: string;
  scholarship_type: string;
  award_year: string;
  pictureURL: string | null;
}
const uploadPicture = async (file: File, user_id: string) => {
  const { data, error } = await supabase.storage
    .from("profiles")
    .upload(user_id, file, {
      upsert: true, // Allows overwriting the file if it already exists
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("profiles")
    .getPublicUrl(user_id);

  return publicUrlData.publicUrl;
};

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

  const { error } = await supabase.from("users").insert(
    {
      user_id: data.user_id,
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      birth_date: data.birth_date,
      program: data.program,
      year_level: data.year_level,
      usc_id: data.usc_id,
      scholarship_type: data.scholarship_type,
      award_year: data.award_year,
      pictureURL: data.pictureURL,
    }
  );

  if (error) {
    console.error("Insert error:", error.message);
    return "Error inserting user.";
  }

  return "User inserted successfully.";
};

export { fetchData, insertData, uploadPicture };
