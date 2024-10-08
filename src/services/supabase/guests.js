import supabase from "./db";

export async function getGuestById(id) {
  let { data: guests, error } = await supabase.from("guests").select("*").eq("id", id).single();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return guests;
}
export async function getAllGuests(from, to) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  if (from && to) query.range(from, to);
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
  const { data, error } = await supabase.from("guests").update(guest).eq("id", id).select();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log("supa error");
    console.log(error);
  }

  return data;
}

export async function updateGuestWithPwd(id, name, nationality, countryFlag, phone, email, password) {
  const { data, error } = await supabase
    .from("guests")
    .update({ fullname: name, nationality, phone, email, countryFlag, password })
    .eq("id", id)
    .select();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log("supa error");
    console.log(error);
  }

  return data;
}

export async function createGuest(guest) {
  const { data, error } = await supabase.from("guests").insert([guest]).select();

  if (error) {
    console.log("ERROR SUPABASE");
    console.log(error);
  }

  return data;
}

export async function deleteGuest(guestID) {
  const { data, error } = await supabase.from("guests").delete().eq("id", guestID).select();
  console.log(data);

  if (error) {
    console.log("ERROR SUPABASE");
    console.log(error);
  }
}
