import { useState } from "react";
import RoomsFilter from "../components/RoomsFilter";
import RoomsTable from "../components/RoomsTable";
import { getAllRooms } from "../services/supabase/rooms";
import { useQuery } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";
import NewRoom from "./NewRoom";
import { Link } from "react-router-dom";

function Rooms() {
  // const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const { data: rooms, isLoading, isError, error } = useQuery({ queryKey: ["rooms"], queryFn: getAllRooms });

  if (isLoading || error) return <h1>Loading...</h1>;

  if (isError) return <h1>Error, Please check your network and try again</h1>;

  if (!rooms) return <h1>No room was found</h1>;

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

  return (
    <SectionContainer label={"Rooms"} description={"List of all the available rooms"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5">
        <RoomsFilter setFilter={setFilter} />

        <Link
          to={"/rooms/new"}
          className="inline-block no-underline w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add New
        </Link>
      </div>
      <RoomsTable rooms={rooms} />
    </SectionContainer>
  );
}

export default Rooms;
