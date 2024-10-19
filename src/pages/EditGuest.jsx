import { useForm } from "react-hook-form";
import { getGuestById, updateGuest } from "../services/supabase/guests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SelectCountry from "../components/CountrySelector";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect } from "react";

function EditGuest() {
  const { id } = useParams();
  const query = useQueryClient();
  const {
    data: guest,
    error,
    isLoading,
  } = useQuery({ queryKey: ["editedUser"], staleTime: 60 * 60, queryFn: async () => getGuestById(id) });

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    const values = getValues();
    if (!values?.nationality && guest) setValue("nationality", guest.nationality);
  }, [isLoading]);

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: async (data) => await updateGuest(id, data),
    onSuccess: () => {
      query.invalidateQueries(["editedUser"]);
      toast.success("Guest has been updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  async function onSubmit(data) {
    if (data.nationality) {
      const [nationality, countryFlag] = data.nationality.split("%");
      data.nationality = nationality;
      data.countryFlag = countryFlag;
    }
    mutate(data);
  }

  if (isLoading) return "Loading Guest...";
  if (error) return "Error occured !!!";

  if (!guest) return "Guest not found!";

  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-7">New Guest</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Fullname
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("fullname", { maxLength: 32, minLength: 3, required: true, value: guest.fullname })}
            />
            {errors.fullname?.type === "min" && (
              <p className="text-sm text-red-700 italic">Fullname must contain at least 3 charcters</p>
            )}
            {errors.fullname?.type === "max" && (
              <p className="text-sm text-red-700 italic">Fullname cannot exceed 32 charcters</p>
            )}
            {errors.fullname?.type === "required" && (
              <p className="text-sm text-red-700 italic">Fullname is required</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              National ID
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("nationalID", {
                maxLength: 12,
                minLength: 5,
                pattern: "/^[a-zA-Z0-9]{6,12}$/",
                required: true,
                value: guest.nationalID,
              })}
            />
            {errors.nationalID?.type === "min" && (
              <p className="text-sm text-red-700 italic">NationalID must contain at least 5 charcters</p>
            )}
            {errors.nationalID?.type === "max" && (
              <p className="text-sm text-red-700 italic">NationalID cannot exceed 12 charcters</p>
            )}
            {errors.nationalID?.type === "pattern" && (
              <p className="text-sm text-red-700 italic">NationalID is invalid</p>
            )}
            {errors.nationalID?.type === "required" && (
              <p className="text-sm text-red-700 italic">NationalID is required</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Email
            </label>
            {/* ADD EMAIL REGEX LATER */}
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("email", { required: true, value: guest.email })}
            />

            {errors.email?.type === "pattern" && <p className="text-sm text-red-700 italic">Email is invalid</p>}
            {errors.email?.type === "required" && <p className="text-sm text-red-700 italic">Email is required</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Phone
            </label>
            {/* ADD PHONE REGEX LATER */}
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("phone", { minLength: 8, required: true, value: guest.phone })}
            />
            {errors.phone?.type === "min" && (
              <p className="text-sm text-red-700 italic">Phone must contain at least 8 charcters</p>
            )}

            {errors.phone?.type === "pattern" && <p className="text-sm text-red-700 italic">Phone is invalid</p>}
            {errors.phone?.type === "required" && <p className="text-sm text-red-700 italic">Phone is required</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="" className="font-semibold flex items-center gap-3">
            <span>Nationality</span>{" "}
            <span className="inline-block w-7  overflow-hidden">
              <img src={guest.countryFlag} alt={`${guest.nationality} flag`} className="w-full" />
            </span>
          </label>
          <SelectCountry
            register={register}
            defaultCountry={guest.nationality}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.nationality?.type === "required" && (
            <p className="text-sm text-red-700 italic">Nationality is required</p>
          )}
        </div>

        <div className="mt-5 flex gap-5 justify-end">
          <button
            className="px-8 py-2 bg-blue-700 min-w-32 text-stone-100 disabled:bg-blue-500 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingSpinner /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditGuest;
