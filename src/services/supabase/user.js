import supabase from "./db";

export async function updateUserPwd(newPassword) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  let { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (updateError) {
    throw new Error(updateError?.message ?? "Failed to update the password!");
  }

  return updatedUser;
}
