import supabase from "./db";

export async function getGuestById(id) {
  let { data: guests, error } = await supabase.from("guests").select("*").eq("id", id).single();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return guests;
}
export async function getAllGuests(from, to, search) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  if (search) query = query.or(`fullname.ilike.%${search}%,email.ilike.%${search}%,nationalID.ilike.%${search}%`);
  if (from !== undefined && to !== undefined) query = query.range(from, to);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data: guests, error, count } = await query;
  if (error) console.log(error);

  return { guests, count };
}

export async function getGuestByEmail(email) {
  let { data: guests, error } = await supabase.from("guests").select("*").eq("email", email).single();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return guests;
}

export async function updateGuest(id, guest) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  const { data, error } = await supabase.from("guests").update(guest).eq("id", id).select();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error || !data.length) {
    console.log("supa error");
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function createGuest(guest) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  const { data, error } = await supabase.from("guests").insert([guest]).select();

  if (error) {
    console.log("ERROR SUPABASE");
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteGuest(guestID) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  const { data, error } = await supabase.from("guests").delete().eq("id", guestID).select();
  console.log(guestID);
  console.log(data);

  if (error) {
    console.log("ERROR SUPABASE");
    console.log(error);
    throw new Error(error.message);
  }
}
