import { useState } from "react";
import RoomsFilter from "../components/RoomsFilter";
import RoomsTable from "../components/RoomsTable";
import { getAllRooms } from "../services/supabase/rooms";
import { useQuery } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";
import NewRoom from "./NewRoom";
import { Link } from "react-router-dom";
import ColsControl from "../components/ColsControl";
import { getAllReservation } from "../services/supabase/reservations";
import ReservationsTable from "../components/ReservationsTable";
import FilterButton from "../components/DropdownFilter";
import Pagination from "../components/Pagination";
import { PAGINATION_STEP } from "../utils/Utils";

const tableHeadings = ["#", "room", "guest", "price", "booking range", "status", "actions"];

// const tempReservations = [
//   {
//     id: 1,
//     name: "Deluxe 2",

//     start_date: "24-09-2024",
//     end_date: "30-09-2024",
//     status: "Finished",
//     reserved_price: 120,
//     room: {
//       name: "Deluxe Room 2",
//     },
//     guest: {
//       fullname: "Othmane Nissoukin",
//     },
//   },
// ];

function Reservations() {
  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));

  const [search, setSearch] = useState("");

  return (
    <SectionContainer label={"Reservations"} description={"List of all the available reservations"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5">
        <div>
          <input
            type="text"
            placeholder="Search by guest name"
            className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
      <ReservationsTable search={search} headings={headings} />
    </SectionContainer>
  );
}

export default Reservations;
