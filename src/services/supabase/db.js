import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kapumuyablpuibhumzdj.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchGuests = async (query) => {
  const supabaseAccessToken = localStorage.getItem("sp_access_tkn");
  const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/guests?${query}`, {
    headers: {
      Authorization: `Bearer ${supabaseAccessToken}`,
    },
  });

  return req.json();
};

export default supabase;
