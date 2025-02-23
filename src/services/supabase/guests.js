import supabase from "./db";

export async function getGuestById(id) {
  const supabaseAccessToken = localStorage.getItem("sp_access_tkn");

  if (isNaN(Number(id))) throw new Error("Invalid guest id");

  try {
    const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/guests?select=*&id=${id}`, {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    });

    const { data: guests, count } = await req.json();

    return guests;
  } catch (err) {
    throw new Error(`Failed to retrieve guests: ${err.message}`);
  }
}
export async function getAllGuests(from, to, search) {
  const supabaseAccessToken = localStorage.getItem("sp_access_tkn");

  try {
    let query = `select=*`;

    if (search)
      query = query.concat(`&or=fullname.ilike.%${search}%,email.ilike.%${search}%,nationalID.ilike.%${search}%`);

    if (from !== undefined && to !== undefined) query = `&from=${from}&to=${to}`;

    const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/guests?${query}&order=desc`, {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    });

    const { data: guests, count } = await req.json();

    return { guests, count };
  } catch (err) {
    throw new Error(`Failed to retrieve guests: ${err.message}`);
  }
}

export async function getGuestByEmail(email) {
  const supabaseAccessToken = localStorage.getItem("sp_access_tkn");

  try {
    const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/guests?select=*&email=${email}`, {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    });

    const { data: guests, count } = await req.json();

    return guests;
  } catch (err) {
    throw new Error(`Failed to retrieve guests: ${err.message}`);
  }
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
  console.log(guestID);
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  const { data, error } = await supabase.from("guests").delete().eq("id", guestID);
  console.log(guestID);
  console.log(data);

  if (error) {
    console.log("ERROR SUPABASE");
    console.log(error);
    throw new Error(error.message);
  }
}
