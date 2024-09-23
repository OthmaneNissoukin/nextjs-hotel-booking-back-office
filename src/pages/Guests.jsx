import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";
import GuestsTable from "../components/GuestsTable";
import { getAllGuests } from "../services/supabase/guests";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Checkbox from "../components/Checkbox";
import ColsControl from "../components/ColsControl";

// const tableHeadings = ["#", "name", "nationalID", "email", "phone", "nationality", "actions"];
const tableHeadings = ["#", "name", "nationalID", "email", "phone", "nationality", "actions"];
// const labels = tableHeadings.map((item) => ({ label: item, show: true }));

function Guests() {
  // const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const { data: guests, isLoading, error } = useQuery({ queryKey: ["guests"], queryFn: getAllGuests });

  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error, Please check your network and try again</h1>;

  // if (!guests) return <h1>No guest was found</h1>;

  return (
    <SectionContainer label={"Guests"} description={"List of all the registered guests"}>
      <div className="xs:flex xs:justify-end xs:items-center gap-5 mb-5">
        {/* <RoomsFilter setFilter={setFilter} /> */}

        <ColsControl headings={headings} setHeadings={setHeadings} />

        <Link
          to={"/guests/new"}
          className="w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add New
        </Link>
      </div>
      <GuestsTable guests={guests ?? []} tableHeadings={headings} />
    </SectionContainer>
  );
}

export default Guests;
