import { useState } from "react";
import { Link } from "react-router-dom";
import RoomsFilter from "../components/RoomsFilter";
import RoomsTable from "../components/RoomsTable";
import SectionContainer from "../ui/SectionContainer";

import FilterButton from "../components/DropdownFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddNewLink from "../components/AddNewLink";
const tableHeadings = ["#", "room", "capacity", "discount", "status", "actions"];

function Rooms() {
  const [filter, setFilter] = useState(null);
  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));

  return (
    <SectionContainer label={"Rooms"} description={"List of all the available rooms"}>
      <div className="xs:flex xs:justify-between xs:items-center mb-5 gap-5">
        <RoomsFilter setFilter={setFilter} classNames="w-full xs:max-w-44 mb-5 xs:mb-0" />

        <div className="flex gap-5">
          {/* <ColsControl headings={headings} setHeadings={setHeadings} /> */}
          <FilterButton headings={headings} setHeadings={setHeadings} align="right" />
          <AddNewLink link={"/rooms/new"} />
        </div>
      </div>
      <RoomsTable headings={headings} filter={filter} />
    </SectionContainer>
  );
}

export default Rooms;
