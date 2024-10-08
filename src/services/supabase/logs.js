import supabase from "./db";

export async function getAllActivities() {
  let { data: guests, error } = await supabase.from("logs").select("*").order("id", { ascending: false });

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) console.log(error);

  return guests;
}

export async function getRecentActivities(count = 10) {
  let { data: logs, error } = await supabase.from("logs").select("*").order("id", { ascending: false }).limit(count);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) console.log(error);

  return logs;
}

export async function deleteActivity(id) {
  let { error } = await supabase.from("logs").delete().eq("id", id);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) console.log(error);
  return;
}
