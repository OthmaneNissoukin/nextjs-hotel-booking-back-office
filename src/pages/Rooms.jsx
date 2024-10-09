import { useState } from "react";
import { Link } from "react-router-dom";
import RoomsFilter from "../components/RoomsFilter";
import RoomsTable from "../components/RoomsTable";
import SectionContainer from "../ui/SectionContainer";

import FilterButton from "../components/DropdownFilter";
const tableHeadings = ["#", "name", "capacity", "price", "discount", "status", "actions"];

function Rooms() {
  const [filter, setFilter] = useState("");
  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));

  // if (!rooms) return <h1>No room was found</h1>;

  // let filteredRooms = rooms ? [...rooms] : [];

  // switch (filter) {
  //   case "asc-capacity":
  //     filteredRooms = filteredRooms?.sort((a, b) => a.capacity - b.capacity);
  //     break;
  //   case "desc-capacity":
  //     filteredRooms = filteredRooms?.sort((a, b) => b.capacity - a.capacity);
  //     break;
  //   case "asc-price":
  //     filteredRooms = filteredRooms?.sort((a, b) => a.price - b.price);
  //     break;
  //   case "desc-price":
  //     filteredRooms = filteredRooms?.sort((a, b) => b.price - a.price);
  //     break;
  //   default:
  //     filteredRooms = rooms;
  // }

  return (
    <SectionContainer label={"Rooms"} description={"List of all the available rooms"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5">
        <RoomsFilter setFilter={setFilter} />

        <div className="flex gap-5">
          {/* <ColsControl headings={headings} setHeadings={setHeadings} /> */}
          <FilterButton headings={headings} setHeadings={setHeadings} align="right" />
          <Link
            to={"/rooms/new"}
            className="inline-block no-underline w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Add New
          </Link>
        </div>
      </div>
      <RoomsTable headings={headings} />
    </SectionContainer>
  );
}

export default Rooms;
