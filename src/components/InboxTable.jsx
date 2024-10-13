import { Link } from "react-router-dom";
import DeletionModal from "./DeletionModal";
import Table from "./Table/Table";
import { format, isToday, isYesterday } from "date-fns";
import { deleteMessageByID, getAllMessages } from "../services/supabase/inbox";
import Pagination from "./Pagination";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "./TableSkeleton";
import { PAGINATION_STEP } from "../utils/Utils";

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

  if (isError) return <h1>{error.message}</h1>;

  if (!messages) return <h1>No message was found</h1>;

  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
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

                    {headings.find((col) => col.label === "fullname" && col.show) && (
                      <Table.Cell>{String(item.fullname)}</Table.Cell>
                    )}

                    {headings.find((col) => col.label === "email" && col.show) && (
                      <Table.Cell>{String(item.email)}</Table.Cell>
                    )}
                    {headings.find((col) => col.label === "phone" && col.show) && <Table.Cell>{item.phone}</Table.Cell>}
                    {headings.find((col) => col.label === "message" && col.show) && (
                      <Table.Cell>
                        {item.message.length > 25 ? `${item.message.slice(0, 25)}...` : item.message}
                      </Table.Cell>
                    )}

                    {headings.find((col) => col.label === "actions" && col.show) && (
                      <Table.Cell>
                        <DeletionModal
                          queryKey={"inbox"}
                          targetName={"The message"}
                          mutationFuntion={async () => await deleteMessageByID(item.id)}
                        />
                      </Table.Cell>
                    )}
                  </Table.Row>
                ))}
              </Table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        pageNumber={page}
        setPage={setPage}
        currentDataCount={messages.length}
        totalCount={count}
        paginationStep={PAGINATION_STEP}
      />
    </>
  );
}

export default InboxTable;
