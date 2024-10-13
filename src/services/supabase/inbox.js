import supabase from "./db";

export async function getAllMessages(from, to, limit, search) {
  let query = supabase.from("inbox").select("*", { count: "exact" }).order("id", { ascending: false });

  if (search)
    query = query.or(
      `email.ilike.%${search}%,fullname.ilike.%${search}%,phone.ilike.%${search}%,message.ilike.%${search}%`
    );

  if (limit) query = query.limit(limit);

  if (from !== undefined && to !== undefined) query = query.range(from, to);

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
