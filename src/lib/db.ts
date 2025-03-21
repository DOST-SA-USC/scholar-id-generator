"use server";

import { supabase } from "@/lib/supabaseClient";
import { UserData } from "@/types";

const uploadPicture = async (file: File, file_name: string) => {
  const { error } = await supabase.storage
    .from("profiles")
    .upload(file_name, file, {
      upsert: false, // Do not overwrite existing files
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  return "Picture Uploaded Successfully.";
};

// Fetch user by user_id
const fetchData = async (user_id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (error || !data) return null;

  const { data: publicUrlData } = supabase.storage
    .from("profiles")
    .getPublicUrl(user_id);

  return { ...data, pictureURL: publicUrlData.publicUrl };
};

// Insert new user
const insertData = async (data: UserData) => {
  const { error } = await supabase.from("users").insert({
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
  });

  if (error) {
    console.error("Insert error:", error.message);

    if (error.message.includes("usc_id_key")) {
      return "Duplicate USC_ID_KEY"; // Duplicate usc_id_key
    } else if (error.message.includes("user_id_key")) {
      return "Duplicate USER_ID_KEY"; // Duplicate user_id_key
    }
  }

  return "INSERTED SUCCESSFULLY"; // Success
};

export { fetchData, insertData, uploadPicture };
