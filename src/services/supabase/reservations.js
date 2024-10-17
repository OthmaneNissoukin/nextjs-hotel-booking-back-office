import { formatISO, formatISO9075 } from "date-fns";
import supabase from "./db";
import { data } from "autoprefixer";

export async function getRoomReservations(id) {
  let { data: reservations, error } = await supabase.from("reservations").select("*").eq("room_id", id);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return reservations;
}

export async function getGuestReservations(guest_id) {
  let { data: reservations, error } = await supabase
    .from("reservations")
    .select("*, rooms(thumbnail, name, capacity)")
    .eq("guest_id", guest_id)
    .is("deleted_at", null);

  if (error) {
    console.log("SUPABASE ERROR");
    console.log(error);
  }

  return reservations;
}
/**
 * fullname,
  email,
  phone,
  nationality,
  countryFlag,
  reserved_price,
  nationalID,
 */

export async function createNewReservation(
  room_id,
  guest_id,
  guests_count,
  message,
  reserved_price,
  start_date,
  end_date,
  guest_fullname,
  status
) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  const { data: reservations, error } = await supabase
    .from("reservations")
    .insert([
      {
        room_id,
        guest_id,
        guests_count,
        reserved_price,
        message,
        start_date,
        end_date,
        guest_fullname,
        status,
      },
    ])
    .select();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return reservations;
}

export async function deleteReservation(id, wasDeletedByGuest) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  // FOR DELETION IM USING SOFT DELETE
  // ACTUAL DELETE WILL ONLY HAPPEN IN CASE IF THE CLIENT HAS ALREADY DELETED RESERVATION FROM HIS HISTORY
  if (wasDeletedByGuest) {
    const { error, data: reservations } = await supabase.from("reservations").delete().eq("id", id).select();
    console.log(reservations);
    if (error || !reservations.length) {
      throw new Error(error.message);
    }
  } else {
    const { data: reservations, error } = await supabase
      .from("reservations")
      .update({ admin_deleted_at: formatISO9075(new Date()) })
      .eq("id", id);

    if (error || !reservations.length) {
      console.log(error);
      throw new Error(error.message);
    }
    return reservations;
  }
}

export async function getReservationByID(id) {
  let { data: reservations, error } = await supabase
    .from("reservations")
    .select("*, rooms(name, capacity, price), guests(fullname, nationalID)")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return reservations;
}

export async function getAllReservation(from, to, search) {
  let query = supabase
    .from("reservations")
    .select("*, rooms(thumbnail, name, capacity, price)", { count: "exact" })
    .is("admin_deleted_at", null)
    .order("id", { ascending: false });

  if (search) {
    query = query.or(`guest_fullname.ilike.%${search}%`);
  }

  if (from !== undefined && to !== undefined) query.range(from, to);

  const { data: reservations, error, count } = await query;

  if (error) {
    console.log(error);
  }

  return { reservations, count };
}

export async function updateReseration(id, room_id, price, guests_count, start_date, end_date, status) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");
  const { data: reservations, error } = await supabase
    .from("reservations")
    .update({
      reserved_price: price,
      guests_count,
      room_id,
      start_date: formatISO9075(new Date(start_date)),
      end_date: formatISO9075(new Date(end_date)),
      status,
    })
    .eq("id", id)
    .select();

  if (error || !reservations.length) {
    console.log(error);
    throw new Error(error.message);
  }

  return reservations;
}
