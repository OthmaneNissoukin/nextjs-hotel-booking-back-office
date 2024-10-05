import { format } from "date-fns";
import supabase from "./db";

// export async function getStats() {
//   let { data: reservations, error } = await supabase
//     .from("reservations")
//     .select("*")
//     .eq("status", "confirmed")
//     .order("created_at", false);

//   // await new Promise((res) => setTimeout(res, 2000));

//   return reservations;
// }
