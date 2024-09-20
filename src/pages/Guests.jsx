import { useState } from "react";
import RoomsFilter from "../components/RoomsFilter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";
import GuestsTable from "../components/GuestsTable";
import { getAllGuests } from "../services/supabase/guests";
import Modal from "../components/Modal";
import NewGuestModal from "../components/NewGuestModal";

function Guests() {
  // const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const { data: guests = [], isLoading, error } = useQuery({ queryKey: ["guests"], queryFn: getAllGuests });

  // console.log(guests);

  // let filteredRooms = [...rooms];

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

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error, Please check your network and try again</h1>;

  // if (!guests) return <h1>No guest was found</h1>;

  return (
    <SectionContainer label={"Guests"} description={"List of all the registered guests"}>
      <div className="xs:flex xs:justify-end xs:items-center mb-5">
        {/* <RoomsFilter setFilter={setFilter} /> */}

        {/* <button
          type="button"
          className="w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add New
        </button> */}

        <NewGuestModal />
      </div>
      <GuestsTable guests={guests ?? []} />
    </SectionContainer>
  );
}

export default Guests;
