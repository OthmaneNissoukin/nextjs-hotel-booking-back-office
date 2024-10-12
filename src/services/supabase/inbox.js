import supabase from "./db";

export async function getAllMessages(from, to, limit) {
  let query = supabase.from("inbox").select("*", { count: "exact" }).order("id", { ascending: false });

  if (limit) query.limit(limit);

  if (from && to) query.range(from, to);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data: messages, count, error } = await query;

  if (error) console.log(error);

  return { messages, count };
}

export async function deleteMessageByID(id) {
  let { error } = await supabase.from("inbox").delete().eq("id", id);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return;
}
