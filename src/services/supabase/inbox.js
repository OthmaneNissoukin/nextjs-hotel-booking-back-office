import supabase from "./db";

export async function getAllMessages() {
  let { data: activities, error } = await supabase.from("inbox").select("*").order("id", { ascending: false });

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) console.log(error);

  return activities;
}

export async function deleteMessageByID(id) {
  let { error } = await supabase.from("inbox").delete().eq("id", id);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) console.log(error);
  return;
}
