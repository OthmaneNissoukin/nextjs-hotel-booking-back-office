import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";
import { Link } from "react-router-dom";

import FilterButton from "../components/DropdownFilter";
import { getAllActivities } from "../services/supabase/logs";
import LogsTable from "../components/LogsTable";
import Pagination from "../components/Pagination";
import { PAGINATION_STEP } from "../utils/Utils";

const tableHeadings = ["#", "date", "category", "description", "actions"];

function Logs() {
  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));

  const [filteredActivities, setFilteredActivities] = useState([]);
  const [search, setSearch] = useState("");

  // console.log(isPreviousData);

  // function handleSearch(str) {
  //   setSearch(str);
  //   if (!str.trim() == "") {
  //     setFilteredActivities(messages);
  //   }

  //   const tempActivities = messages.filter((item) => item.description.toLowerCase().includes(str));

  //   setFilteredActivities(tempActivities);
  // }

  return (
    <SectionContainer label={"Recent Activities"} description={"List of all the available activities"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5">
        <div>
          <input
            type="text"
            placeholder="Type to search..."
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
      <LogsTable headings={headings} />
    </SectionContainer>
  );
}

export default Logs;
