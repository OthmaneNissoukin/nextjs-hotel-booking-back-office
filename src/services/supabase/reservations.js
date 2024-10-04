import { formatISO, formatISO9075 } from "date-fns";
import supabase from "./db";

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
  status
) {
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
        status,
      },
    ])
    .select();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return reservations;
}

export async function deleteReservation(id, isDeletedByAdmin) {
  // FOR DELETION IM USING SOFT DELETE
  // ACTUAL DELETE WILL ONLY HAPPEN IN CASE IF THE CLIENT HAS ALREADY DELETED RESERVATION FROM HIS HISTORY
  if (isDeletedByAdmin) {
    const { error, data: reservations } = await supabase.from("reservations").delete().eq("id", id).select();
    return reservations;
  } else {
    const { data: reservations, error } = await supabase
      .from("reservations")
      .update({ admin_deleted_at: formatISO9075(new Date()) })
      .eq("id", id);
    return reservations;
  }
}

export async function getReservationByID(id) {
  let { data: reservations, error } = await supabase
    .from("reservations")
    .select("*, rooms(name, capacity, price), guests(fullname, nationalID)")
    .eq("id", id)
    .single();

  return reservations;
}

export async function getAllReservation() {
  let { data: reservations, error } = await supabase
    .from("reservations")
    .select("*, rooms(thumbnail, name, capacity, price), guests(fullname, nationalID, email)")
    .neq("admin_deleted_at", null)
    .order("id", { ascending: false });

  console.log(error);

  return reservations;
}

export async function updateReseration(id, room_id, price, guests_count, start_date, end_date, status) {
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
    .eq("id", id);

  return reservations;
}

export async function cancelReservation(id) {
  const { data: reservations, error } = await supabase
    .from("reservations")
    .update({ status: "cancelled" })
    .eq("id", id);

  console.log("datetime", formatISO9075(new Date()));
  return reservations;
}
