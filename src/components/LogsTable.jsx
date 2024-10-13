import { Link } from "react-router-dom";
import DeletionModal from "./DeletionModal";
import Table from "./Table/Table";
import { format, isToday, isYesterday } from "date-fns";
import { deleteActivity, getAllActivities } from "../services/supabase/logs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PAGINATION_STEP } from "../utils/Utils";
import TableSkeleton from "./TableSkeleton";
import Pagination from "./Pagination";

function LogsTable({ headings, search }) {
  const [page, setPage] = useState(0);
  // PAGINATION IS 0 BASED INDEXED
  const {
    data: { count, logs } = {},
    isLoading,
    error,
    isError,
    // isPreviousData,
  } = useQuery({
    queryKey: ["logs", page, search],
    // keepPreviousData: true,
    // pagination - 1 is for indexing, pagination is 0 based index
    queryFn: async () => getAllActivities(page * PAGINATION_STEP, (page + 1) * PAGINATION_STEP - 1, search),
  });

  let indexStartingFrom = page * PAGINATION_STEP + 1;

  if (isLoading) return <TableSkeleton headings={headings.map((item) => item.label)} />;

  if (isError) return <h1>{error.message}</h1>;

  if (!logs) return <h1>No activity was found</h1>;

  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Table>
                <Table.Head headings={headings} />

                {logs?.map((item, index) => (
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
                        <span>{format(item.created_at, "HH:mm:ss")}</span>
                      </Table.Cell>
                    )}

                    {headings.find((col) => col.label === "category" && col.show) && (
                      <Table.Cell>{String(item.category)}</Table.Cell>
                    )}

                    {headings.find((col) => col.label === "description" && col.show) && (
                      <Table.Cell>
                        {item.description.length > 65 ? `${item.description.slice(0, 65)}...` : item.description}
                      </Table.Cell>
                    )}

                    {headings.find((col) => col.label === "actions" && col.show) && (
                      <Table.Cell>
                        <DeletionModal
                          queryKey={"logs"}
                          targetName={"The activity"}
                          mutationFuntion={async () => await deleteActivity(item.id)}
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
        totalCount={count}
        currentDataCount={logs.length}
        paginationStep={PAGINATION_STEP}
        setPage={setPage}
      />
    </>
  );
}

export default LogsTable;
