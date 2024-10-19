import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markMessageAsRead } from "../services/supabase/inbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { createPortal } from "react-dom";

export default function MarkAsReadBtn({ id }) {
  const queryCilent = useQueryClient();
  const { mutate: mutateMessage, isPending } = useMutation({
    mutationFn: async () => await markMessageAsRead(id),
    onSuccess: () => {
      queryCilent.invalidateQueries(["inbox"]);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to mark message as read!");
    },
  });

  return (
    <>
      <button
        onClick={mutateMessage}
        class="min-w-40 inline-flex w-full items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-green-800 focus:outline-none focus:text-green-800 disabled:opacity-50 disabled:pointer-events-none dark:text-green-500 dark:hover:text-green-400 dark:focus:text-green-400"
      >
        {isPending ? (
          <span className="text-lg">
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          </span>
        ) : (
          <>
            <span>
              <FontAwesomeIcon icon={faCheckDouble} />
            </span>{" "}
            <span>Mark as Read</span>
          </>
        )}
      </button>
      {createPortal(<Toaster position="top-center" />, document.body)}
    </>
  );
}
