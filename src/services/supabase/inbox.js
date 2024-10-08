import supabase from "./db";

export async function getAllMessages(from = 0, to = 5) {
  let {
    data: messages,
    count,
    error,
  } = await supabase.from("inbox").select("*", { count: "exact" }).order("id", { ascending: false }).range(from, to);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) console.log(error);

  return { messages, count };
}

export async function deleteMessageByID(id) {
  let { error } = await supabase.from("inbox").delete().eq("id", id);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) console.log(error);
  return;
}
