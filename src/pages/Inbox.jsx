import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";
import { Link } from "react-router-dom";
import ColsControl from "../components/ColsControl";
import { getAllMessages } from "../services/supabase/inbox";
import InboxTable from "../components/InboxTable";
import FilterButton from "../components/DropdownFilter";

const tableHeadings = ["#", "date", "fullname", "email", "phone", "message", "actions"];

function Inbox() {
  // const queryClient = useQueryClient();
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [search, setSearch] = useState("");
  const {
    data: messages,
    isPending,
    error,
    isError,
  } = useQuery({ queryKey: ["inbox"], queryFn: async () => getAllMessages() });
  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));

  function handleSearch(str) {
    setSearch(str);
    if (!str.trim() == "") {
      setFilteredMessages(messages);
    }

    const tempMessages = messages.filter(
      (item) =>
        item.email.toLowerCase().includes(str) ||
        item.fullname.toLowerCase().includes(str) ||
        item.phone.toLowerCase().includes(str) ||
        item.message.toLowerCase().includes(str)
    );

    setFilteredMessages(tempMessages);
  }

  if (isPending) return <h1>Loading...</h1>;

  if (isError) return <h1>{error.message}</h1>;

  if (!messages) return <h1>No message was found</h1>;

  return (
    <SectionContainer label={"Messages"} description={"List of all the available messages"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5">
        <div>
          <input
            type="text"
            placeholder="Search by name, email, message"
            className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={search}
            onChange={(e) => handleSearch(e.target.value.toLowerCase())}
          />
        </div>

        <div className="flex gap-5">
          {/* <ColsControl headings={headings} setHeadings={setHeadings} /> */}
          <FilterButton headings={headings} setHeadings={setHeadings} align="right" />
          <Link
            to={"/reservations/new"}
            className="inline-block no-underline w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Add New
          </Link>
        </div>
      </div>
      <InboxTable messages={search ? filteredMessages : messages} headings={headings} />
    </SectionContainer>
  );
}

export default Inbox;
