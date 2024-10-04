import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createGuest, getAllGuests } from "../services/supabase/guests";
import { useMutation, useQuery } from "@tanstack/react-query";
import DatePicker from "react-flatpickr";
import { useEffect, useRef, useState } from "react";
import FormSelect from "../components/FormSelect";
import { getAllRooms } from "../services/supabase/rooms";
import { areIntervalsOverlapping } from "date-fns";
import { createNewReservation } from "../services/supabase/reservations";
import toast, { Toaster } from "react-hot-toast";

function NewReservation() {
  const [bookingPeriod, setBookingPeriod] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [disabledDays, setDisabledDays] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (!selectedRoom) return;
    const targetRoom = rooms.find((item) => item.id === selectedRoom);
    console.log(ref.current);
    ref?.current?.flatpickr.clear();

    setDisabledDays(
      targetRoom.reservations?.map((item) => ({
        from: new Date(item.start_date),
        to: new Date(item.end_date),
      }))
    );

    console.log(
      targetRoom.reservations?.map((item) => ({
        start: new Date(item.start_date),
        end: new Date(item.end_date),
      }))
    );
  }, [selectedRoom]);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    setError,
    trigger,
    clearErrors,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) =>
      await createNewReservation(
        selectedRoom,
        selectedGuest,
        data.guests_count,
        data.message,
        data.price,
        data.booking_period.at(0),
        data.booking_period.at(1),
        data.status
      ),
    onSuccess: () => {
      reset();
      navigate("/reservations");
    },
    onError: (err) => {
      toast.error("Failed to submit!");
      console.log(err);
    },
  });

  const {
    data: guests,
    error: guestsError,
    isFetchingGuests,
  } = useQuery({ queryKey: ["guests"], queryFn: async () => getAllGuests() });
  const {
    data: rooms,
    error: roomsError,
    isFetchingRooms,
  } = useQuery({ queryKey: ["rooms"], queryFn: async () => getAllRooms() });

  const targetRoom = rooms?.find((item) => item.id === selectedRoom);

  function onSubmit(data) {
    console.log("Submit()");
    console.log(data);
    mutate(data);
  }

  function handleArrivalSelect(value = []) {
    clearErrors("booking_period");
    if (value.length < 2) {
      setError("booking_period", { type: "required", message: "Booking period is required!" });
      return;
    }

    const start_date = new Date(value[0]);
    const end_date = new Date(value[1]);

    if (!selectedRoom) {
      setError("booking_period", { type: "missing_room", message: "Room must be selected first" });
      return;
    }

    const planned_room_reservations = targetRoom?.reservations.filter((item) =>
      item.status === "confirmed"
        ? {
            start: new Date(item.start_date),
            end: new Date(item.end_date),
          }
        : ""
    );

    if (planned_room_reservations.find((item) => areIntervalsOverlapping(item, { start: start_date, end: end_date }))) {
      console.log("range_error");
      setError("booking_period", {
        type: "range",
        message: "Invalid date! The selected range already have a booked plan.",
      });
      return;
    }

    setBookingPeriod(value);
    setValue("booking_period", value);

    // console.log(start_date);
    // console.log(rooms?.find((item) => item.id === selectedRoom));
  }

  if (isFetchingGuests || isFetchingRooms) return <h1>Please wait...</h1>;

  if (guestsError || roomsError) return <h1>Error occured!</h1>;

  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-7">New Reservations</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          {/* GUEST SELECT */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Guest
            </label>

            <FormSelect
              placeholder={"-- Select a Guest --"}
              onChange={() => setValue("guestID", selectedGuest)}
              setValue={setSelectedGuest}
              options={guests?.map((item) => ({ label: `${item.fullname} - ${item.nationalID}`, value: item.id }))}
            />
            <input type="hidden" value={selectedGuest} {...register("guestID", { required: true })} />

            {errors.guestID?.type === "required" && (
              <p className="text-sm text-red-700 italic">The guest is required</p>
            )}
          </div>
          {/* ROOM SELECT */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Room
            </label>
            <FormSelect
              onChange={() => setValue("roomID", selectedRoom)}
              setValue={setSelectedRoom}
              options={rooms?.map((item) => ({
                label: `${item.name} => (${item.capacity} guests | $${item.price.toFixed(2)})`,
                value: item.id,
              }))}
              placeholder={"-- Select a Room --"}
            />
            <input type="hidden" value={selectedRoom} {...register("roomID", { required: true })} />

            {errors.roomID?.type === "required" && <p className="text-sm text-red-700 italic">The room is required</p>}
          </div>
          {/* GUESTS COUNT */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Number of guests
            </label>
            <input
              min={1}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("guests_count", {
                required: true,
                min: 1,
                max: targetRoom?.capacity ?? 16,
              })}
            />

            {errors.guests_count?.type === "min" && (
              <p className="text-sm text-red-700 italic">There must be at least 1 guest</p>
            )}
            {errors.guests_count?.type === "max" && (
              <p className="text-sm text-red-700 italic">Guests cannot exceed {targetRoom?.capacity ?? 16}</p>
            )}
            {errors.guests_count?.type === "required" && (
              <p className="text-sm text-red-700 italic">The number of guests is required</p>
            )}
          </div>

          {/* PRICE */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Price per night
            </label>
            {/* ADD PHONE REGEX LATER */}
            <input
              type="number"
              step={0.01}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("price", {
                min: 15,
                max: 200,
                required: true,
              })}
            />
            {errors.price?.type === "min" && (
              <p className="text-sm text-red-700 italic">Price can only start from $15.00</p>
            )}
            {errors.price?.type === "max" && <p className="text-sm text-red-700 italic">Price cannot exceed $200.00</p>}
            {errors.price?.type === "required" && <p className="text-sm text-red-700 italic">Price is required</p>}
          </div>

          {/* Booking Range */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Booking Period
            </label>

            <DatePicker
              {...register("booking_period", { required: true })}
              ref={ref}
              onChange={(date) => handleArrivalSelect(date)}
              options={{
                mode: "range",
                dateFormat: "d-m-Y",
                disable: [...disabledDays],
                minDate: new Date(),
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {errors.booking_period && <p className="text-sm text-red-700 italic">{errors.booking_period.message}</p>}
          </div>

          {/* STATUS */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Status
            </label>
            <select
              {...register("status", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="unconfirmed">Unconfirmed</option>
              <option value="confirmed">Confirmed</option>
            </select>
            {errors.status?.type === "required" && (
              <p className="text-sm text-red-700 italic">Reservation status is required</p>
            )}

            {errors ? console.log(errors) : ""}
          </div>
        </div>

        <div className="mt-5 flex gap-5 justify-end">
          <button
            className="px-8 py-2 bg-blue-700 text-stone-100 disabled:bg-blue-500 disabled:cursor-not-allowed"
            disabled={isPending}
            onClick={async () => await trigger("start_date")}
          >
            {isPending ? "Submitting..." : "Save"}
          </button>
        </div>
      </form>
      <Toaster position="top-center" />
    </div>
  );
}

export default NewReservation;
