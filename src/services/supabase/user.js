import supabase from "./db";

export async function getActiveUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error("Failed to get authenticated user!");

  return data;
}

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

export async function updateUserProfile(fullname, profile_image) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  const profileImageName = `${new Date().getTime()}`;
  if (profile_image) {
    const { data: profileImage, error: profileImageError } = await supabase.storage
      .from("general")
      .upload(profileImageName, profile_image);
    if (profileImageError) {
      console.log(profileImageError.message);
      throw new Error("Failed to upload the profile image");
    }
  }

  let newData = {};
  if (fullname) newData.fullname = fullname;
  if (profile_image) newData.profile_image = `${import.meta.env.VITE_SUPABASE_GENERAL_IMGS_URL}/${profileImageName}`;

  let { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
    data: newData,
  });

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (updateError) {
    await supabase.storage.from("general").remove([profileImageName]);
    throw new Error(updateError?.message ?? "Failed to update the profile!");
  }

  return updatedUser;
}
