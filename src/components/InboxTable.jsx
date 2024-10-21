import DeletionModal from "./DeletionModal";
import Table from "./Table/Table";
import { format, isToday, isYesterday } from "date-fns";
import { deleteMessageByID, getAllMessages } from "../services/supabase/inbox";
import Pagination from "./Pagination";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "./TableSkeleton";
import { PAGINATION_STEP } from "../utils/Utils";
import Modal from "./Modal";
import MarkAsReadBtn from "./MarkAsReadBtn";
import DropdownEditMenu from "./DropdownEditMenu";
import ReadMore from "./ReadMore";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InboxTable({ headings, search }) {
  const [page, setPage] = useState(0);

  const {
    data: { messages, count } = {},
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["inbox", page, search],
    queryFn: async () => getAllMessages(page * PAGINATION_STEP, (page + 1) * PAGINATION_STEP, undefined, search),
  });

  let indexStartingFrom = page * PAGINATION_STEP + 1;

  if (isLoading) return <TableSkeleton headings={headings.map((item) => item.label)} />;

  if (isError) return <h1>Failed to fetch messages</h1>;

  if (!messages) return <h1>No message was found</h1>;

  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="">
              <Modal>
                <Table>
                  <Table.Head headings={headings} />

                  {messages?.map((item, index) => (
                    <Table.Row>
                      {headings.find((col) => col.label === "#" && col.show) && (
                        <Table.Cell>{String(indexStartingFrom++).padStart(3, "0")}</Table.Cell>
                      )}

                      {headings.find((col) => col.label === "date" && col.show) && (
                        <Table.Cell>
                          <span>
                            {isToday(item.created_at)
                              ? "Today"
                              : isYesterday(item.created_at)
                              ? "Yesterday"
                              : format(item.created_at, "dd LLL")}
                          </span>{" "}
                          <span>{format(item.created_at, "HH:mm")}</span>
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "infos" && col.show) && (
                        <Table.Cell>
                          <span>{String(item.fullname)}</span> <br />
                          <span className="italic font-extralight text-slate-500">{String(item.email)}</span>{" "}
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "phone" && col.show) && (
                        <Table.Cell>{item.phone}</Table.Cell>
                      )}
                      {headings.find((col) => col.label === "message" && col.show) && (
                        <Table.Cell>
                          {item.message.length > 25 ? `${item.message.slice(0, 25)}...` : item.message}
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "status" && col.show) && (
                        <Table.Cell>
                          {item.is_read ? (
                            <span className="text-gray-900 bg-green-100 border border-green-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-green-800 dark:text-green-100 dark:border-green-600">
                              Read
                            </span>
                          ) : (
                            <span className="text-gray-900 bg-yellow-100 border border-yellow-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-yellow-800 dark:text-yellow-100 dark:border-yellow-600">
                              Unread
                            </span>
                          )}
                        </Table.Cell>
                      )}

                      {headings.find((col) => col.label === "actions" && col.show) && (
                        <Table.Cell>
                          <DropdownEditMenu align="right" className="relative inline-flex">
                            <li>
                              <ReadMore message={item}>
                                <button className="min-w-40 inline-flex w-full items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">
                                  <span>
                                    <FontAwesomeIcon icon={faEye} />
                                  </span>{" "}
                                  <span>Details</span>
                                </button>
                              </ReadMore>
                            </li>
                            {!item?.is_read && (
                              <li>
                                <MarkAsReadBtn id={item.id} />
                              </li>
                            )}
                            <li>
                              <DeletionModal
                                queryKey={"inbox"}
                                targetName={"The message"}
                                mutationFuntion={async () => await deleteMessageByID(item.id)}
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
        currentDataCount={messages?.length ?? 0}
        totalCount={count}
        paginationStep={PAGINATION_STEP}
      />
    </>
  );
}

export default InboxTable;
