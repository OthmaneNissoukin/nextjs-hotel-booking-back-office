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

  const [search, setSearch] = useState("");

  return (
    <SectionContainer label={"Recent Activities"} description={"List of all the passed activities"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5">
        <div>
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full xs:w-72 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <LogsTable headings={headings} search={search} />
    </SectionContainer>
  );
}

export default Logs;
