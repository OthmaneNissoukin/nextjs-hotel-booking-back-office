import { useState } from "react";
import { Link } from "react-router-dom";
import FilterButton from "../components/DropdownFilter";
import GuestsTable from "../components/GuestsTable";
import SectionContainer from "../ui/SectionContainer";
import AddNewLink from "../components/AddNewLink";

const tableHeadings = ["#", "Guest", "Contacts", "Nationality", "Profile", "Actions"];

function Guests() {
  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));
  const [search, setSearch] = useState("");

  return (
    <SectionContainer label={"Guests"} description={"List of all the registered guests"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5">
        <div>
          <input
            type="text"
            placeholder="Email, NationalID or Name"
            className="w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 min-w-72 mb-5 xs:mb-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-5">
          <FilterButton headings={headings} setHeadings={setHeadings} align="right" />
          <AddNewLink link={"/guests/new"} />
        </div>
      </div>
      <GuestsTable tableHeadings={headings} search={search} />
    </SectionContainer>
  );
}

export default Guests;
