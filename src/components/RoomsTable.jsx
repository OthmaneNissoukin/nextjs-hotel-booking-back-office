import { Link } from "react-router-dom";
import { deleteRoom, getAllRooms } from "../services/supabase/rooms";
import DeletionModal from "./DeletionModal";
import Table from "./Table/Table";
import { useState } from "react";
import { isRoomAvailableNow, PAGINATION_STEP } from "../utils/Utils";
import Pagination from "./Pagination";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "./TableSkeleton";
import DropdownEditMenu from "./DropdownEditMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Badge from "./Badge";

function RoomsTable({ headings, filter }) {
  const [page, setPage] = useState(0);
  const {
    data: { rooms, count } = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rooms", page, filter],
    queryFn: async () => await getAllRooms(page * PAGINATION_STEP, (page + 1) * PAGINATION_STEP - 1, filter),
    staleTime: 60 * 60,
  });

  if (isLoading) return <TableSkeleton headings={headings.map((item) => item.label)} />;

  if (isError) return <h1>Error, Please check your network and try again</h1>;
  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Modal>
                <Table>
                  <Table.Head headings={headings} />

                  {rooms?.map((item, index) => (
                    <Table.Row>
                      {headings.find((col) => col.label === "#" && col.show) && (
                        <Table.Cell>
                          <span className="inline-block w-32 aspect-video">
                            <img
                              className="w-full aspect-video"
                              src={`${import.meta.env.VITE_SUPABASE_IMGS_URL}/${item.thumbnail}`}
                            />
                          </span>
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "room" && col.show) && (
                        <Table.Cell>
                          <span>{String(item.name).padStart(2, "0")}</span> <br />
                          <span className="italic font-extralight text-slate-500">
                            ${item.price.toFixed(2)} per night
                          </span>
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "capacity" && col.show) && (
                        <Table.Cell>{String(item.capacity).padStart(2, "0")}</Table.Cell>
                      )}

                      {headings.find((col) => col.label === "discount" && col.show) && (
                        <Table.Cell>${item.discount.toFixed(2)}</Table.Cell>
                      )}
                      {headings.find((col) => col.label === "status" && col.show) && (
                        <Table.Cell>
                          <Table.Cell>
                            {isRoomAvailableNow(item.reservations) ? (
                              <Badge status={"success"}>Available</Badge>
                            ) : (
                              <Badge status={"warning"}>Reserved</Badge>
                            )}
                          </Table.Cell>
                        </Table.Cell>
                      )}
                      {headings.find((col) => col.label === "actions" && col.show) && (
                        <Table.Cell>
                          <DropdownEditMenu align="right" className="relative inline-flex">
                            <li>
                              <Link
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-green-800 focus:outline-none focus:text-green-800 disabled:opacity-50 disabled:pointer-events-none dark:text-green-500 dark:hover:text-green-400 dark:focus:text-green-400"
                                to={`/rooms/edit/${item.id}`}
                              >
                                <span>
                                  <FontAwesomeIcon icon={faPen} />
                                </span>
                                <span>Edit</span>
                              </Link>
                            </li>
                            <li>
                              <DeletionModal
                                queryKey={"rooms"}
                                targetName={item.name}
                                mutationFuntion={async () => await deleteRoom(item.id)}
                                modalKey={index}
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
        currentDataCount={rooms.length}
        totalCount={count}
        paginationStep={PAGINATION_STEP}
      />
    </>
  );
}

export default RoomsTable;
