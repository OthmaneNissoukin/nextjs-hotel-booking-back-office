import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { getActiveUser, updateUserProfile } from "../services/supabase/user";
import { useEffect, useState } from "react";
import supabase from "../services/supabase/db";
import FormSkeleton from "../components/FormSkeleton";

function EditProfile() {
  const [fullname, setFullname] = useState("");
  const clientQuery = useQueryClient();

  const {
    isLoading,
    data: user,
    isError,
    error,
    isSuccess,
  } = useQuery({ queryKey: ["userProfile"], queryFn: async () => await getActiveUser() });

  useEffect(() => {
    if (!user) return;
    const prevFullName = user?.user.user_metadata.fullname ?? "";
    setValue(prevFullName);
    setFullname(prevFullName);
  }, [isSuccess]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationKey: ["userProfile"],
    mutationFn: async (data) => await updateUserProfile(data.fullName, data.profile_image?.[0]),
    onSuccess: () => {
      clientQuery.invalidateQueries(["userProfile"]);
      toast.success("Profile has been updated successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmitForm(data) {
    mutate(data);
  }

  if (isLoading) return <FormSkeleton />;

  if (isError) return <h1>{error.message}</h1>;

  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-7">Update Profile</h1>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid md:grid-cols-2 gap-5">
          {/* FULL NAME */}
          <div>
            <label className="inline-block mb-2">Full Name</label>
            <input
              defaultValue={fullname}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
              {...register("fullName", { maxLength: 64, minLength: 3, required: true })}
            />
            {errors.fullName?.type === "minLength" && (
              <p className="text-sm text-red-700 italic">Full Name must contain at least 3 characters</p>
            )}
            {errors.fullName?.type === "maxLength" && (
              <p className="text-sm text-red-700 italic">Full Name cannot exceed 64 characters</p>
            )}
            {errors.fullName?.type === "required" && (
              <p className="text-sm text-red-700 italic">Full Name is required</p>
            )}
          </div>

          {/* PROFILE IMAGE */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Profile Image
            </label>
            <input
              {...register("profile_image", { required: false })}
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-900 file:me-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-medium file:bg-gray-600 file:text-white hover:file:bg-gray-500 file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-gray-400 dark:file:bg-gray-700 dark:hover:file:bg-gray-600 cursor-pointer file:cursor-pointer border dark:border-gray-700 dark:bg-gray-800 border-gray-300 focus:ring-gray-600 focus:border-gray-600 dark:focus:ring-gray-500 dark:focus:border-gray-500"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-5 justify-end">
          <button
            className="px-8 py-2 bg-blue-600 min-w-32 text-stone-100 hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? <LoadingSpinner /> : "Save"}
          </button>
        </div>
      </form>
      <Toaster position="top-center" />
    </div>
  );
}

export default EditProfile;
