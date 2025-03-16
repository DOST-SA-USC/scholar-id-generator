"use server";

import { supabase } from "@/lib/supabaseClient";
import { UserData } from "@/types";

const uploadPicture = async (file: File, user_id: string) => {
  const { error } = await supabase.storage
    .from("profiles")
    .upload(user_id, file, {
      upsert: false, // Do not overwrite existing files
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
  if (existingUser) return 0; // User already exists

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
    pictureURL: data.pictureURL,
  });

  if (error) {
    console.error("Insert error:", error.message);
    return -1; // Duplicate usc_id_key
  }

  return 1; // Success
};

export { fetchData, insertData, uploadPicture };
