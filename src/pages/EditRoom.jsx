import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoomById, updateRoom } from "../services/supabase/rooms";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function EditRoom() {
  const { id } = useParams();
  const {
    data: room,
    error,
    isLoading,
  } = useQuery({ queryKey: ["roomsEdit"], staleTime: 60 * 60, queryFn: async () => await getRoomById(id) });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const query = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["rooms"],
    mutationFn: async (data) => await updateRoom(parseInt(id), data, data.thumbnail[0], Array.from(data.images)),
    onSuccess: () => {
      query.invalidateQueries(["rooms"]);
      query.invalidateQueries(["roomsEdit"]);
      toast.success("Room has been updated successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmitForm(data) {
    data.prevThumbnail = room.thumbnail;
    // return;
    // console.log(errors);
    mutate(data);
  }

  if (isLoading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
    return <h1>Error occured</h1>;
  }
  if (!room) return <h1>No room was found</h1>;

  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-7">Edit Room</h1>
      <form action="" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              defaultValue={room.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("name", { maxLength: 64, minLength: "6", required: true })}
            />
            {errors.name?.type === "minLength" && (
              <p className="text-sm text-red-700 italic">Name must contain at least 6 characters</p>
            )}
            {errors.name?.type === "maxLength" && (
              <p className="text-sm text-red-700 italic">Name cannot exceed 64 characters</p>
            )}
            {errors.name?.type === "required" && <p className="text-sm text-red-700 italic">Name is required</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Thumbnail
            </label>
            <input
              {...register("thumbnail", { required: false })}
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-600 file:text-white hover:file:bg-slate-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-neutral-500 dark:file:bg-slate-500 dark:hover:file:bg-slate-400 cursor-pointer file:cursor-pointer border dark:border-slate-800 dark:bg-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500
      "
            />
          </div>
        </div>

        <div className="md:flex gap-5 mt-5">
          <div className="flex flex-col gap-2 grow">
            <label htmlFor="" className="font-semibold">
              Capacity
            </label>
            <input
              type="number"
              defaultValue={room.capacity}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("capacity", { max: 12, min: 1, required: true })}
            />
            {errors.capacity?.type === "min" && (
              <p className="text-sm text-red-700 italic">Capacity must be greater than 0</p>
            )}
            {errors.capacity?.type === "max" && (
              <p className="text-sm text-red-700 italic">Capacity must be less than 12</p>
            )}
            {errors.capacity?.type === "required" && (
              <p className="text-sm text-red-700 italic">Capacity is required</p>
            )}
          </div>
          <div className="flex flex-col gap-2 grow">
            <label htmlFor="" className="font-semibold">
              Sleeps
            </label>
            <input
              type="number"
              defaultValue={room.sleeps}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("sleeps", { max: 6, min: 1, required: true })}
            />
            {errors.sleeps?.type === "min" && (
              <p className="text-sm text-red-700 italic">Sleeps must be greater than 0</p>
            )}
            {errors.sleeps?.type === "max" && <p className="text-sm text-red-700 italic">Sleeps cannot exceed 6</p>}
            {errors.sleeps?.type === "required" && (
              <p className="text-sm text-red-700 italic">Sleeps number is required</p>
            )}
          </div>
        </div>
        <div className="md:flex gap-5 mt-5">
          <div className="flex flex-col gap-2 grow">
            <label htmlFor="" className="font-semibold">
              Price
            </label>
            <input
              type="number"
              defaultValue={room.price}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("price", { min: 25, required: true })}
            />
            {errors.price?.type === "min" && (
              <p className="text-sm text-red-700 italic">Price must be greater than 25</p>
            )}
            {errors.price?.type === "required" && <p className="text-sm text-red-700 italic">Price is required</p>}
          </div>
          <div className="flex flex-col gap-2 grow">
            <label htmlFor="" className="font-semibold">
              Discount
            </label>
            {/* TODO: DISCOUNT MAX VALUE MUST BE LESS THAN THE PRICE ITSELF. ADD THE LOGIC LATER */}
            <input
              type="number"
              defaultValue={room.discount}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("discount", { max: 100, min: 0, required: true, value: 0 })}
            />
            {errors.discount?.type === "min" && (
              <p className="text-sm text-red-700 italic">Discount must be greater than or equal 0</p>
            )}
            {errors.discount?.type === "max" && (
              <p className="text-sm text-red-700 italic">Discount cannot exceed %% TEMP %%</p>
            )}
            {errors.discount?.type === "required" && (
              <p className="text-sm text-red-700 italic">Discount is required</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="" className="font-semibold">
            Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register("images", { required: false })}
            className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-600 file:text-white hover:file:bg-slate-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-neutral-500 dark:file:bg-slate-500 dark:hover:file:bg-slate-400 cursor-pointer file:cursor-pointer border dark:border-slate-800 dark:bg-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500
      "
          />
        </div>

        <div className="flex flex-col gap-2 grow mt-5">
          {/* ADD TINYMCE FOR THIS FIELD */}
          <label htmlFor="" className="font-semibold">
            Description
          </label>
          {/* TODO: DISCOUNT MAX VALUE MUST BE LESS THAN THE PRICE ITSELF. ADD THE LOGIC LATER */}
          <textarea
            defaultValue={room.description}
            rows={8}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-y"
            {...register("description", { maxLength: 3000, minLength: 120, required: true })}
          ></textarea>
          {errors.description?.type === "minLength" && (
            <p className="text-sm text-red-700 italic">Description must contain at least 120 charcters</p>
          )}
          {errors.description?.type === "maxLength" && (
            <p className="text-sm text-red-700 italic">Description cannot exceed 3000 charcters</p>
          )}
          {errors.description?.type === "required" && (
            <p className="text-sm text-red-700 italic">Description is required</p>
          )}
        </div>

        <div className="mt-5 flex gap-5 justify-end">
          <button
            className="px-8 py-2 min-w-32 bg-blue-700 text-stone-100 disabled:bg-blue-400 disabled:cursor-not-allowed"
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

export default EditRoom;
