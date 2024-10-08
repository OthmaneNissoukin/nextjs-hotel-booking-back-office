import { Link } from "react-router-dom";
import DeletionModal from "./DeletionModal";
import Table from "./Table/Table";
import { format, isToday, isYesterday } from "date-fns";
import { deleteMessageByID } from "../services/supabase/inbox";

function InboxTable({ messages, headings }) {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <Table>
              <Table.Head headings={headings} />

              {messages?.map((item, index) => (
                <Table.Row>
                  {headings.find((col) => col.label === "#" && col.show) && (
                    <Table.Cell>{String(index + 1).padStart(3, "0")}</Table.Cell>
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
  );
}

export default InboxTable;
