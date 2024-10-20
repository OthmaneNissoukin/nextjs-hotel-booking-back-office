import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../components/LoadingSpinner";
import { updateUserPwd } from "../services/supabase/user";

function EditPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newPwd) => await updateUserPwd(newPwd),
    onSuccess: () => {
      reset();
      toast.success("Password has been updated successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmitForm(data) {
    if (data.pwd !== data.pwd_confirmation) {
      toast.error("Password doesn't match confirmation!");
      return;
    }
    mutate(data.newPwd);
  }

  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-7">Update Password</h1>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid md:grid-cols-2 gap-5">
          {/* PASSWORD */}
          <div>
            <label className="inline-block mb-2">Password</label>
            <div className="flex rounded-lg shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-md focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                {...register("pwd", { maxLength: 64, minLength: 6, required: true })}
              />
              <button
                type="button"
                className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center rounded-r-md bg-gray-600 text-white hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.pwd?.type === "minLength" && (
              <p className="text-sm text-red-700 italic">Password must contain at least 6 characters</p>
            )}
            {errors.pwd?.type === "maxLength" && (
              <p className="text-sm text-red-700 italic">Password cannot exceed 64 characters</p>
            )}
            {errors.pwd?.type === "required" && <p className="text-sm text-red-700 italic">The password is required</p>}
          </div>

          {/* PASSWORD CONFIRMATION */}
          <div>
            <label className="inline-block mb-2">Confirm Password</label>
            <div className="flex rounded-lg shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-md focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                {...register("pwd_confirmation", { maxLength: 64, minLength: 6, required: true })}
              />
              <button
                type="button"
                className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center rounded-r-md bg-gray-600 text-white hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.pwd_confirmation?.type === "minLength" && (
              <p className="text-sm text-red-700 italic">Confirmation must contain at least 6 characters</p>
            )}
            {errors.pwd_confirmation?.type === "maxLength" && (
              <p className="text-sm text-red-700 italic">Confirmation cannot exceed 64 characters</p>
            )}
            {errors.pwd_confirmation?.type === "required" && (
              <p className="text-sm text-red-700 italic">The confirmation is required</p>
            )}
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

export default EditPassword;
