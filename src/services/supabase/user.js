import supabase from "./db";

export async function updateUserPwd(newPassword) {
  let { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (updateError) {
    throw new Error(updateError?.message ?? "Failed to update the password!");
  }

  return updatedUser;
}
