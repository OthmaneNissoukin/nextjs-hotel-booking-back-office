import { useState } from "react";
import RoomsFilter from "../components/RoomsFilter";
import RoomsTable from "../components/RoomsTable";
import Table from "../components/Table/Table";
import { getAllRooms } from "../services/supabase/rooms";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";

function Rooms() {
  // const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const { data: rooms = [], isLoading } = useQuery({ queryKey: ["rooms"], queryFn: getAllRooms });

  let filteredRooms = [...rooms];

  switch (filter) {
    case "asc-capacity":
      filteredRooms = filteredRooms?.sort((a, b) => a.capacity - b.capacity);
      break;
    case "desc-capacity":
      filteredRooms = filteredRooms?.sort((a, b) => b.capacity - a.capacity);
      break;
    case "asc-price":
      filteredRooms = filteredRooms?.sort((a, b) => a.price - b.price);
      break;
    case "desc-price":
      filteredRooms = filteredRooms?.sort((a, b) => b.price - a.price);
      break;
    default:
      filteredRooms = rooms;
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <SectionContainer label={"Rooms"} description={"List of all the available rooms"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5">
        <RoomsFilter setFilter={setFilter} />

        <button
          type="button"
          className="w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add New
        </button>
      </div>
      <RoomsTable rooms={filteredRooms} />
    </SectionContainer>
  );
}

export default Rooms;
