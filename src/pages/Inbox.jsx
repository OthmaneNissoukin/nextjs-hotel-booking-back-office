import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";
import { Link } from "react-router-dom";
import ColsControl from "../components/ColsControl";
import { getAllMessages, markAllAsRead } from "../services/supabase/inbox";
import InboxTable from "../components/InboxTable";
import FilterButton from "../components/DropdownFilter";
import Pagination from "../components/Pagination";
import { PAGINATION_STEP } from "../utils/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faSpinner } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

const tableHeadings = ["#", "date", "infos", "phone", "message", "status", "actions"];

function Inbox() {
  const { isPending, mutate: mutateMessages } = useMutation({
    mutationKey: ["inbox"],
    mutationFn: async () => await markAllAsRead(),
    onError: (err) => {
      toast.error("Failed to read messages!");
    },
    onSuccess: () => {
      toast.success("All messages has been marked as read!");
    },
  });
  const [headings, setHeadings] = useState(() =>
    tableHeadings.map((item) => (item !== "phone" ? { label: item, show: true } : item))
  );
  const [search, setSearch] = useState("");

  return (
    <SectionContainer label={"Messages"} description={"List of all the incoming messages"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5">
        <div>
          <input
            type="text"
            placeholder="Search by name, email, message"
            className="w-full xs:w-72 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={mutateMessages}
          disabled={isPending}
          className="text-center w-full md:min-w-44 no-underline xs:w-auto 
    text-green-200 bg-green-900 border border-green-700 
    hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-700 
    font-medium rounded-lg text-sm px-5 py-2.5 
    dark:bg-green-100 dark:text-green-900 dark:border-green-400 
    dark:hover:bg-green-400 dark:hover:border-green-400 dark:focus:ring-green-400 
    flex items-center justify-center gap-3 transition-all duration-150 ease-in-out
    disabled:bg-green-300 disabled:text-gray-400 disabled:cursor-not-allowed 
    dark:disabled:bg-green-200 dark:disabled:text-gray-500"
        >
          {isPending ? (
            <FontAwesomeIcon className="text-xl" icon={faSpinner} spinPulse />
          ) : (
            <>
              <span>
                <FontAwesomeIcon icon={faCheckDouble} />
              </span>{" "}
              <span>Mark all as read</span>
            </>
          )}
        </button>
      </div>
      <InboxTable headings={headings} search={search} />
      <Toaster position="top-center" />
    </SectionContainer>
  );
}

export default Inbox;
