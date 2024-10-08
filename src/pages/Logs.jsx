import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";
import { Link } from "react-router-dom";

import FilterButton from "../components/DropdownFilter";
import { getAllActivities } from "../services/supabase/logs";
import LogsTable from "../components/LogsTable";
import Pagination from "../components/Pagination";

const tableHeadings = ["#", "date", "category", "description", "actions"];

function Logs() {
  // const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  // PAGINATION IS 0 BASED INDEXED
  const [paginationStep, setPaginationStep] = useState(5);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [search, setSearch] = useState("");
  const {
    data: { count, logs } = {},
    isPending,
    error,
    isError,
    // isPreviousData,
  } = useQuery({
    queryKey: ["logs", page],
    // keepPreviousData: true,
    // pagination - 1 is for indexing, pagination is 0 based index
    queryFn: async () => getAllActivities(page * paginationStep, (page + 1) * paginationStep - 1),
  });
  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));

  // console.log(isPreviousData);

  function handleSearch(str) {
    setSearch(str);
    if (!str.trim() == "") {
      setFilteredActivities(messages);
    }

    const tempActivities = messages.filter((item) => item.description.toLowerCase().includes(str));

    setFilteredActivities(tempActivities);
  }

  if (isPending) return <h1>Loading...</h1>;

  if (isError) return <h1>{error.message}</h1>;

  if (!logs) return <h1>No activity was found</h1>;

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
      <LogsTable
        indexStartingFrom={paginationStep * page + 1}
        logs={search ? filteredActivities : logs}
        headings={headings}
      />

      <Pagination
        pageNumber={page}
        totalCount={count}
        currentDataCount={logs.length}
        paginationStep={paginationStep}
        setPage={setPage}
      />
    </SectionContainer>
  );
}

export default Logs;
