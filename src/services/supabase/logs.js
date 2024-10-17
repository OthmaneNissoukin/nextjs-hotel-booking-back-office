import supabase from "./db";

export async function getAllActivities(from = 0, to = 5, search) {
  let query = supabase.from("logs").select("*", { count: "exact" }).order("id", { ascending: false }).range(from, to);

  if (from !== undefined && to !== undefined) query.or(`description.ilike.%${search}%`);
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  let { data: logs, error, count } = await query;

  if (error) console.log(error);

  return { logs, count };
}

export async function getRecentActivities(count = 10) {
  let { data: logs, error } = await supabase.from("logs").select("*").order("id", { ascending: false }).limit(count);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return logs;
}

export async function deleteActivity(id) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  let { error } = await supabase.from("logs").delete().eq("id", id);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return;
}
