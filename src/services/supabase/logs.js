import supabase from "./db";

export async function getAllActivities(from = 0, to = 5) {
  let {
    data: logs,
    error,
    count,
  } = await supabase.from("logs").select("*", { count: "exact" }).order("id", { ascending: false }).range(from, to);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) console.log(error);

  return { logs, count };
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
