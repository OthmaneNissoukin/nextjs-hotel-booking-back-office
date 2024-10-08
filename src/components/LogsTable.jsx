import { Link } from "react-router-dom";
import DeletionModal from "./DeletionModal";
import Table from "./Table/Table";
import { format, isToday, isYesterday } from "date-fns";
import { deleteActivity } from "../services/supabase/logs";

function LogsTable({ indexStartingFrom, logs, headings }) {
  return (
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
                      {isToday(item.created_at)
                        ? "Today"
                        : isYesterday(item.created_at)
                        ? "Yesterday"
                        : format(item.created_at, "dd-MM-yyyy")}
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
  );
}

export default LogsTable;
