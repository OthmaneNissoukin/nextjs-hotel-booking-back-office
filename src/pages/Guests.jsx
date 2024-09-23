import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionContainer from "../ui/SectionContainer";
import GuestsTable from "../components/GuestsTable";
import { getAllGuests } from "../services/supabase/guests";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Checkbox from "../components/Checkbox";

// const tableHeadings = ["#", "name", "nationalID", "email", "phone", "nationality", "actions"];
const tableHeadings = ["#", "name", "nationalID", "email", "phone", "nationality", "actions"];
// const labels = tableHeadings.map((item) => ({ label: item, show: true }));

function Guests() {
  // const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const { data: guests, isLoading, error } = useQuery({ queryKey: ["guests"], queryFn: getAllGuests });

  const [headings, setHeadings] = useState(() => tableHeadings.map((item) => ({ label: item, show: true })));

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error, Please check your network and try again</h1>;

  // if (!guests) return <h1>No guest was found</h1>;

  function handleSwitch(label) {
    setHeadings(headings.map((item) => (item.label === label ? { ...item, show: !item.show } : item)));
  }

  return (
    <SectionContainer label={"Guests"} description={"List of all the registered guests"}>
      <div className="xs:flex xs:justify-end xs:items-center gap-5 mb-5">
        {/* <RoomsFilter setFilter={setFilter} /> */}

        <Modal>
          <Modal.ToggleOpen>
            <button className="w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Columns Control
            </button>
          </Modal.ToggleOpen>
          <Modal.Overlay>
            <Modal.Wrapper>
              <div className="mt-5">
                <form
                  action=""
                  className="mx-auto w-72 md-w-[420px] lg:w-[624px] bg-slate-300 dark:bg-slate-900 rounded-md min-h-96 p-5 "
                >
                  <h1 className="text-2xl text-stone-900 dark:text-slate-100">Control columns</h1>
                  <p className="text-stone-900 dark:text-slate-300 text-sm">Toggle table columns to show/hide them</p>
                  <div className="grid sm:grid-cols-2 gap-5 mt-8">
                    {headings.map((item, index) => (
                      <Checkbox isActive={item.show} label={item.label} handleSwitch={handleSwitch} key={index} />
                    ))}
                  </div>
                </form>
              </div>
            </Modal.Wrapper>
          </Modal.Overlay>
        </Modal>

        <Link
          to={"/guests/new"}
          className="w-full xs:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add New
        </Link>
      </div>
      <GuestsTable guests={guests ?? []} tableHeadings={headings} />
    </SectionContainer>
  );
}

export default Guests;
