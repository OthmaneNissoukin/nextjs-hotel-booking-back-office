import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "./Modal";
import { deleteGuest } from "../services/supabase/guests";

function GuestDelete({ guestName, guestID }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await deleteGuest(guestID),
    onSuccess: () => queryClient.invalidateQueries(["guests"]),
  });
  return (
    <Modal>
      <Modal.ToggleOpen>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
        >
          Delete
        </button>
      </Modal.ToggleOpen>
      <Modal.Overlay>
        <Modal.Wrapper>
          <div className="w-[90%] max-w-[620px] p-5 mt-5 bg-slate-900 rounded-sm mx-auto">
            <h2 className="text-2xl">Delete {guestName}</h2>
            <p className="mb-10 text-sm">This action cannot be undone. Are you sure to delete this guest?</p>
            <div className="flex justify-end items-center gap-3">
              <Modal.ToggleClose>
                <button
                  className="px-6 py-3 bg-slate-800 text-slate-50 disabled:bg-slate-600 disabled:cursor-not-allowed"
                  disabled={isPending}
                >
                  Cancel
                </button>
              </Modal.ToggleClose>
              <button
                onClick={mutate}
                className="px-6 py-3 bg-red-800 text-red-50 disabled:bg-red-600 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </Modal.Wrapper>
      </Modal.Overlay>
    </Modal>
  );
}

export default GuestDelete;
