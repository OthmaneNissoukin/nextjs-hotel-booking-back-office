import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";
import GuestsTable from "../components/GuestsTable";
import { getAllGuests } from "../services/supabase/guests";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Checkbox from "../components/Checkbox";
import ColsControl from "../components/ColsControl";
import FilterButton from "../components/DropdownFilter";

// const tableHeadings = ["#", "name", "nationalID", "email", "phone", "nationality", "actions"];
const tableHeadings = ["#", "Fullname", "NationalID", "Email", "Phone", "Nationality", "Actions"];
// const labels = tableHeadings.map((item) => ({ label: item, show: true }));

const dummyGuests = [
  {
    id: 1,
    created_at: "2024-09-05 12:57:58",
    nationalID: "EE982743",
    fullname: "Othmane NISSOUKIN",
    email: "othmanenissoukin@gmail.com",
    phone: "+2126 87 74 17 78",
    nationality: "Moroccan",
  },
  {
    id: 2,
    created_at: "2024-09-05 12:57:58",
    nationalID: "KU9340S5",
    fullname: "KIKISH KOKOSH",
    email: "krikish@gmail.com",
    phone: "+2127 20 11 52 28",
    nationality: "Moroccan",
  },
  {
    id: 3,
    created_at: "2024-09-05 12:57:58",
    nationalID: "BG5560H8",
    fullname: "Koskos Kabaylos",
    email: "kabaylos@gmail.com",
    phone: "+2126 34 71 89 09",
    nationality: "Moroccan",
  },
];

function Guests() {
  // const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const { data: guests, isLoading, error } = useQuery({ queryKey: ["guests"], queryFn: getAllGuests });

  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));

  const [tempGuests, setTempGuests] = useState(null);

  function handleSearch(str) {
    setSearch(str);
    if (!str.trim() == "") {
      setTempGuests(guests);
    }

    const filteredGuests = guests.filter(
      (item) =>
        item.nationalID.toLowerCase().includes(str) ||
        item.fullname.toLowerCase().includes(str) ||
        item.email.toLowerCase().includes(str)
    );

    setTempGuests(filteredGuests);
  }

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error, Please check your network and try again</h1>;

  if (!guests) return <h1>No guest was found. Please check your network</h1>;

  return (
    <SectionContainer label={"Guests"} description={"List of all the registered guests"}>
      <div className="xs:flex xs:justify-between xs:items-center gap-5 mb-5">
        {/* <RoomsFilter setFilter={setFilter} /> */}
        <div>
          <input
            type="text"
            placeholder="Email, NationalID or Name"
            className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={search}
            onChange={(e) => handleSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="flex gap-5">
          {/* <ColsControl headings={headings} setHeadings={setHeadings} /> */}
          <FilterButton headings={headings} setHeadings={setHeadings} align="right" />

          <Link
            to={"/guests/new"}
            className="w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Add New
          </Link>
        </div>
      </div>
      <GuestsTable guests={tempGuests ?? guests} tableHeadings={headings} />
    </SectionContainer>
  );
}

export default Guests;
