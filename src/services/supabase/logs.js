import supabase from "./db";

export async function getAllActivities() {
  let { data: guests, error } = await supabase.from("guests").select("*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) console.log(error);

  return guests;
}

export async function getRecentActivities(count = 10) {
  let { data: logs, error } = await supabase.from("logs").select("*").limit(count);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) console.log(error);

  return logs;
}
