import Table from "./Table/Table";
import { formatCountry, PAGINATION_STEP } from "../utils/Utils";
import { Link } from "react-router-dom";
import DeletionModal from "./DeletionModal";
import { deleteGuest, getAllGuests } from "../services/supabase/guests";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "./TableSkeleton";
import { useState } from "react";
import DropdownEditMenu from "./DropdownEditMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
function GuestsTable({ tableHeadings = [], search }) {
  const [page, setPage] = useState(0);
  const {
    data: { guests, count } = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["guests", page, search],
    queryFn: async () => await getAllGuests(page * PAGINATION_STEP, (page + 1) * PAGINATION_STEP, search),
  });

  let indexStartingFrom = page * PAGINATION_STEP + 1;

  if (isLoading) return <TableSkeleton headings={tableHeadings.map((item) => item.label)} />;

  if (isError) return <h1>{error.message}</h1>;

  if (!guests) return <h1>No guest was found. Please check your network</h1>;

  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Modal>
                <Table>
                  <Table.Head headings={tableHeadings} />

                  {guests.map((item, index) => (
                    <Table.Row>
                      {tableHeadings.find((col) => col.label === "#" && col.show === true) && (
                        <Table.Cell>{String(indexStartingFrom++).padStart(3, "0")}</Table.Cell>
                      )}

                      {tableHeadings.find((col) => col.label === "Fullname" && col.show === true) && (
                        <Table.Cell>{item.fullname}</Table.Cell>
                      )}

                      {tableHeadings.find((col) => col.label === "NationalID" && col.show === true) && (
                        <Table.Cell>{item.nationalID ? item.nationalID : "- - - -"}</Table.Cell>
                      )}

                      {tableHeadings.find((col) => col.label === "Email" && col.show === true) && (
                        <Table.Cell>{item.email}</Table.Cell>
                      )}

                      {tableHeadings.find((col) => col.label === "Phone" && col.show === true) && (
                        <Table.Cell>{item.phone ? item.phone : "- - - -"}</Table.Cell>
                      )}

                      {tableHeadings.find((col) => col.label === "Nationality" && col.show === true) && (
                        <Table.Cell>
                          {item.nationality ? (
                            <div className="flex items-center gap-3">
                              <span className="w-7 inline-block aspect-video">
                                <img src={item.countryFlag} className="w-full" />
                              </span>{" "}
                              <span>{formatCountry(item.nationality)}</span>
                            </div>
                          ) : (
                            "- - - -"
                          )}
                        </Table.Cell>
                      )}

                      {tableHeadings.find((col) => col.label === "Actions" && col.show === true) && (
                        <Table.Cell>
                          <DropdownEditMenu align="right" className="relative inline-flex">
                            <li>
                              <Link
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-green-800 focus:outline-none focus:text-green-800 disabled:opacity-50 disabled:pointer-events-none dark:text-green-500 dark:hover:text-green-400 dark:focus:text-green-400"
                                to={`/guests/edit/${item.id}`}
                              >
                                <span>
                                  <FontAwesomeIcon icon={faPen} />
                                </span>
                                <span>Edit</span>
                              </Link>
                            </li>
                            <li>
                              <DeletionModal
                                queryKey={"guests"}
                                targetName={item.fullname}
                                mutationFuntion={async () => deleteGuest(item.id)}
                              />
                            </li>
                          </DropdownEditMenu>
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))}
                </Table>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        pageNumber={page}
        setPage={setPage}
        currentDataCount={guests.length}
        totalCount={count}
        paginationStep={PAGINATION_STEP}
      />
    </>
  );
}

export default GuestsTable;
