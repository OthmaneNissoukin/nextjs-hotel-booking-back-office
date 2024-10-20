import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createGuest, getAllGuests } from "../services/supabase/guests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-flatpickr";
import { useEffect, useRef, useState } from "react";
import FormSelect from "../components/FormSelect";
import { getAllRooms } from "../services/supabase/rooms";
import { areIntervalsOverlapping, isBefore, subDays, isAfter } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { getReservationByID, updateReseration } from "../services/supabase/reservations";
import LoadingSpinner from "../components/LoadingSpinner";
import FormSkeleton from "../components/FormSkeleton";

function EditReservation() {
  const { id: reservationID } = useParams();
  const [bookingPeriod, setBookingPeriod] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [disabledDays, setDisabledDays] = useState([]);
  const [targetRoom, setTargetRoom] = useState(null);
  const ref = useRef(null);
  const query = useQueryClient();

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
      await updateReseration(
        reservationID,
        data.roomID,
        reservation.guest_id,
        data.guests_count,
        data.start_date,
        data.end_date,
        data.status
      ),
    onSuccess: () => {
      // reset();
      toast.success("Updated successfully!");
      query.invalidateQueries({ queryKey: ["editedReservation"] });
      query.invalidateQueries({ queryKey: ["reservations"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const {
    data: reservation,
    isError: isReservationError,
    isLoading: isLoadingReservation,
  } = useQuery({
    queryKey: ["editedReservation"],
    queryFn: async () => getReservationByID(reservationID),
    staleTime: 0,
  });

  const {
    data: { rooms } = {},
    isError: isRoomsError,
    isLoading: isLoadingRooms,
    isSuccess,
  } = useQuery({ queryKey: ["rooms"], queryFn: async () => getAllRooms(), staleTime: 60 * 60 });

  useEffect(() => {
    // Target room is needed to get data for validation for a specific room
    const targetRoom = rooms?.find((item) => item.id == selectedRoom || item.id == reservation?.room_id);
    if (!targetRoom) return;
    setTargetRoom(targetRoom);

    setValue("roomID", selectedRoom ?? reservation.id);
    setValue("booking_period", [reservation?.start_date, reservation?.end_date]);

    setDisabledDays(
      targetRoom?.reservations?.map((item) => ({
        from: new Date(item.start_date),
        to: new Date(item.end_date),
      }))
    );
  }, [selectedRoom, reservation, rooms]);

  async function onSubmit(data) {
    data.roomID = selectedRoom ? selectedRoom : reservation.room_id;
    data.start_date = data.booking_period.at(0);
    data.end_date = data.booking_period.at(1);

    console.log(data);
    mutate(data);
  }

  function handleArrivalSelect(value = []) {
    clearErrors("booking_period");
    if (value.length < 2) {
      setError("booking_period", { type: "required", message: "Booking period is required!" });
      return;
    }

    console.log("DATE");
    console.log(value);

    const start_date = new Date(value[0]);
    const end_date = new Date(value[1]);

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

    setValue("booking_period", value);
    // setBookingPeriod(value);
  }

  if (isLoadingReservation || isLoadingRooms) return <FormSkeleton />;

  if (isReservationError || isRoomsError) return <h1>Error occured!</h1>;

  if (!reservation || !rooms) return <h1>Reservation not found!</h1>;

  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-7">Edit Reservation</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          {/* GUEST SELECT */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Guest
            </label>

            <input
              type="text"
              defaultValue={
                reservation?.guests ? `${reservation.guests.fullname} - ${reservation.guests.nationalID}` : ""
              }
              disabled={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
            />

            {errors.guestID?.type === "required" && (
              <p className="text-sm text-red-700 italic">The guest is required</p>
            )}
          </div>
          {/* ROOM SELECT */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Room
            </label>

            {/* PREVENT EDITING RESERVATION ROOM WHICH HAS BEEN CONFIRMED AND IS ALREADY STARTED */}
            {reservation.status === "confirmed" && isAfter(new Date(), new Date(reservation.start_date)) ? (
              <input
                type="text"
                defaultValue={`${reservation.rooms.name} => (${
                  reservation.rooms.capacity
                } guests | $${reservation.rooms.price.toFixed(2)})`}
                disabled={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:dark:bg-gray-800 disabled:cursor-not-allowed"
              />
            ) : (
              <>
                <FormSelect
                  onChange={() => setValue("roomID", selectedRoom)}
                  defaultValue={{
                    label: `${reservation.rooms.name} => (${
                      reservation.rooms.capacity
                    } guests | $${reservation.rooms.price.toFixed(2)})`,
                  }}
                  options={rooms?.map((item) => ({
                    label: `${item.name} => (${item.capacity} guests | $${item.price.toFixed(2)})`,
                    value: item.id,
                  }))}
                  placeholder={"-- Select a Room --"}
                  setValue={setSelectedRoom}
                />
                <input
                  type="hidden"
                  value={selectedRoom ?? reservation?.id}
                  {...register("roomID", { required: true })}
                />
              </>
            )}

            {errors.roomID?.type === "required" && <p className="text-sm text-red-700 italic">The room is required</p>}
          </div>
          {/* GUESTS COUNT */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Number of guests
            </label>
            <input
              min={1}
              defaultValue={reservation.guests_count}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              defaultValue={reservation.reserved_price}
              step={0.01}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              {...register("price", {
                min: 15,
                // max: 200,
                required: true,
              })}
            />
            {errors.price?.type === "min" && (
              <p className="text-sm text-red-700 italic">Price can only start from $15.00</p>
            )}
            {/* {errors.price?.type === "max" && <p className="text-sm text-red-700 italic">Price cannot exceed $200.00</p>} */}
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
                disable: selectedRoom
                  ? [...disabledDays]
                  : rooms
                      ?.find((item) => item.id == reservation.room_id)
                      .reservations.filter((item) => item.id != reservationID)
                      .map((item) => ({
                        from: new Date(item.start_date),
                        to: new Date(item.end_date),
                      })) ?? [],
                minDate: isBefore(new Date(reservation.start_date), new Date())
                  ? subDays(new Date(reservation.start_date), 1)
                  : new Date(),
                defaultDate: [reservation.start_date, reservation.end_date],
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* STATUS */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Status
            </label>
            <select
              {...register("status", { required: true })}
              defaultValue={reservation.status}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 uppercase"
            >
              <option value="unconfirmed">Unconfirmed</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.status?.type === "required" && (
              <p className="text-sm text-red-700 italic">Reservation status is required</p>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5 justify-end">
          <button
            className="px-8 py-2 bg-blue-700 min-w-32 text-stone-100 disabled:bg-blue-500 disabled:cursor-not-allowed"
            disabled={isPending}
            onClick={async () => await trigger("start_date")}
          >
            {isPending ? <LoadingSpinner /> : "Save"}
          </button>
        </div>
      </form>

      <Toaster position="top-center" />
    </div>
  );
}

export default EditReservation;
