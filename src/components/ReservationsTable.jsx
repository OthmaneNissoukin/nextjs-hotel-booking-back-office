import { Link } from "react-router-dom";
import { deleteRoom } from "../services/supabase/rooms";
import DeletionModal from "./DeletionModal";
import Table from "./Table/Table";
import { deleteReservation, getAllReservation } from "../services/supabase/reservations";
import { differenceInDays, format, isAfter, isBefore } from "date-fns";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { currentReservationStatus, PAGINATION_STEP } from "../utils/Utils";
import Pagination from "./Pagination";
import TableSkeleton from "./TableSkeleton";
import DropdownEditMenu from "./DropdownEditMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Badge from "./Badge";

function ReservationsTable({ headings, search }) {
  const [page, setPage] = useState(0);
  const {
    data: { reservations, count } = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reservations", page, search],
    queryFn: async () => getAllReservation(page * PAGINATION_STEP, (page + 1) * PAGINATION_STEP, search),
  });

  let indexStartingFrom = page * PAGINATION_STEP + 1;

  if (isLoading) return <TableSkeleton headings={headings.map((item) => item.label)} />;

  if (isError) return <h1>{error.message}</h1>;

  if (!reservations && !isError) return <h1>No reservation was found</h1>;
  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Modal>
                <Table>
                  <Table.Head headings={headings} />

                  {reservations?.map((item, index) => (
                    <Table.Row>
                      {headings.find((col) => col.label === "#" && col.show) && (
                        <Table.Cell>{String(indexStartingFrom++).padStart(3, "0")}</Table.Cell>
                      )}

                      {headings.find((col) => col.label === "guest" && col.show) && (
                        <Table.Cell>
                          {item.guests?.fullname ? item.guests?.fullname : item?.guest_fullname}
                          {!item.guest_id && (
                            <>
                              <br />
                              <span className="text-xs text-red-800 italic">profile deleted</span>
                            </>
                          )}
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "room" && col.show) && (
                        <Table.Cell>
                          <span>{item.rooms?.name}</span>
                          <br />
                          <span className="italic font-extralight text-slate-500">
                            Booked for ${item.reserved_price.toFixed(2)}
                          </span>
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "booking range" && col.show) && (
                        <Table.Cell>
                          {format(item.start_date, "LLL dd yyyy")} &ndash; {format(item.end_date, "LLL dd yyyy")}
                          <br />
                          <span className="italic font-extralight text-slate-500">
                            {differenceInDays(item.end_date, item.start_date)} Nights
                          </span>{" "}
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "status" && col.show) && (
                        <Table.Cell>
                          <Badge status={currentReservationStatus(item)?.type}>
                            {currentReservationStatus(item)?.status}
                          </Badge>
                        </Table.Cell>
                      )}
                      {headings.find((col) => col.label === "actions" && col.show) && (
                        <Table.Cell>
                          <DropdownEditMenu align="right" className="relative inline-flex">
                            {!(item.status === "confirmed" && isAfter(new Date(), new Date(item.end_date))) &&
                              item.guest_id && (
                                <li>
                                  <Link
                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-green-800 focus:outline-none focus:text-green-800 disabled:opacity-50 disabled:pointer-events-none dark:text-green-500 dark:hover:text-green-400 dark:focus:text-green-400"
                                    to={`/reservations/edit/${item.id}`}
                                  >
                                    <span>
                                      <FontAwesomeIcon icon={faPen} />
                                    </span>
                                    <span>Edit</span>
                                  </Link>
                                </li>
                              )}

                            {/* PREVENT DELETING FOR BOTH (ACUTAL & CONFIRMED) AND ALSO (FUTUR COMING) RESERVATIONS  */}
                            {(!(
                              item.status === "confirmed" &&
                              isAfter(new Date(item.start_date), new Date()) &&
                              isBefore(new Date(item.end_date), new Date())
                            ) ||
                              (item.status === "confirmed" && item.isAfter(new Date(item.start_date), new Date()))) && (
                              <li>
                                <DeletionModal
                                  queryKey={"reservations"}
                                  targetName={"The reservation"}
                                  mutationFuntion={async () => await deleteReservation(item.id, !!item.deleted_at)}
                                  modalKey={index}
                                />
                              </li>
                            )}
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
        currentDataCount={reservations?.length ?? 0}
        totalCount={count}
        paginationStep={PAGINATION_STEP}
      />
    </>
  );
}

export default ReservationsTable;
