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

  if (error) {
    console.log(error);
    throw new Error(error);
  }

  return { messages, count };
}

export async function getMostRecentUnreadMessages(limit = 3) {
  const {
    data: messages,
    count,
    error,
  } = await supabase.from("inbox").select("*").order("id", { ascending: false }).limit(limit);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log(error);
    throw new Error(error);
  }

  return messages;
}

export async function deleteMessageByID(id) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  let { error } = await supabase.from("inbox").delete().eq("id", id);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return;
}

export async function markMessageAsRead(id) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  let { error, data } = await supabase.from("inbox").update({ is_read: true }).eq("id", id);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function markAllAsRead() {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  let { error, data } = await supabase.from("inbox").update({ is_read: true }).eq("is_read", false);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}
