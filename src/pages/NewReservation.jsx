import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createGuest, getAllGuests } from "../services/supabase/guests";
import { useMutation, useQuery } from "@tanstack/react-query";
import DatePicker from "react-flatpickr";
import { useState } from "react";
import GuestsSelect from "../components/GuestsSelect";

function NewReservation() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => await createGuest(data),
    onSuccess: () => {
      reset();
      navigate("/guests");
    },
  });

  async function onSubmit(data) {
    console.log(data);
    if (data.nationality) {
      const [nationality, countryFlag] = data.nationality.split("%");
      data.nationality = nationality;
      data.countryFlag = countryFlag;
    }
    mutate(data);
  }

  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-7">New Guest</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Guest
            </label>
            {/* <select
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("guest", { required: true })}
            >
              <option value="">-- Select a guest --</option>
              {guests?.map((item) => (
                <option value={item.id}>{`${item.fullname} - ${item.nationalID}`}</option>
              ))}
            </select> */}
            <GuestsSelect />

            {errors.guest?.type === "required" && <p className="text-sm text-red-700 italic">The guest is required</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Room
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("room", {
                required: true,
              })}
            />

            {errors.room?.type === "required" && <p className="text-sm text-red-700 italic">The room is required</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Number of guests
            </label>
            <input
              min={1}
              type="number"
              // ADD DEPS LATER FOR MAX COUNT
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("guests_count", { required: true, min: 1, max: 16 })}
            />

            {errors.guests_count?.type === "min" && (
              <p className="text-sm text-red-700 italic">There must be at least 1 guest</p>
            )}
            {errors.guests_count?.type === "max" && (
              <p className="text-sm text-red-700 italic">Guests cannot exceed 16</p>
            )}
            {errors.guests_count?.type === "required" && (
              <p className="text-sm text-red-700 italic">The number of guests is required</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Price per night
            </label>
            {/* ADD PHONE REGEX LATER */}
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("price", { min: 25, max: 200, required: true })}
            />
            {errors.price?.type === "min" && (
              <p className="text-sm text-red-700 italic">Price must be equal or greater than 25</p>
            )}
            {errors.price?.type === "max" && <p className="text-sm text-red-700 italic">Price cannot exceed 200</p>}
            {errors.price?.type === "min" && <p className="text-sm text-red-700 italic">Price is required</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Arrival Date
            </label>

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {/* {errors.price?.start_date === "required" && (
              <p className="text-sm text-red-700 italic">Arrival date is required</p>
            )} */}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Departure Date
            </label>
            {/* ADD PHONE REGEX LATER */}
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* {errors.price?.end_date === "required" && (
              <p className="text-sm text-red-700 italic">Departure date is required</p>
            )} */}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="" className="font-semibold">
            Status
          </label>
          <select
            {...register("status", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value=""></option>
            <option value="unconfirmed">Unconfirmed</option>
            <option value="confirmed">Confirmed</option>
          </select>
          {errors.status?.type === "required" && (
            <p className="text-sm text-red-700 italic">Reservation status is required</p>
          )}
        </div>

        <div className="mt-5 flex gap-5 justify-end">
          <button
            className="px-8 py-2 bg-blue-700 text-stone-100 disabled:bg-blue-500 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewReservation;
