import { Link } from "react-router-dom";
import { deleteRoom } from "../services/supabase/rooms";
import DeletionModal from "./DeletionModal";
import Table from "./Table/Table";
import { deleteReservation } from "../services/supabase/reservations";
import { isAfter, isBefore } from "date-fns";

function ReservationsTable({ reservations, headings }) {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <Table>
              <Table.Head headings={headings} />

              {reservations?.map((item, index) => (
                <Table.Row>
                  {headings.find((col) => col.label === "#" && col.show) && (
                    <Table.Cell>{String(index + 1).padStart(3, "0")}</Table.Cell>
                  )}

                  {headings.find((col) => col.label === "room" && col.show) && (
                    <Table.Cell>{String(item.rooms?.name)}</Table.Cell>
                  )}

                  {headings.find((col) => col.label === "guest" && col.show) && (
                    <Table.Cell>{String(item.guests?.fullname)}</Table.Cell>
                  )}
                  {headings.find((col) => col.label === "price" && col.show) && (
                    <Table.Cell>${item.reserved_price.toFixed(2)}</Table.Cell>
                  )}
                  {headings.find((col) => col.label === "start date" && col.show) && (
                    <Table.Cell>{item.start_date}</Table.Cell>
                  )}
                  {headings.find((col) => col.label === "end date" && col.show) && (
                    <Table.Cell>{item.end_date}</Table.Cell>
                  )}
                  {headings.find((col) => col.label === "status" && col.show) && <Table.Cell>{item.status}</Table.Cell>}
                  {headings.find((col) => col.label === "actions" && col.show) && (
                    <Table.Cell>
                      {!(item.status === "confirmed" && isAfter(new Date(), new Date(item.end_date))) && (
                        <Link
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-green-800 focus:outline-none focus:text-green-800 disabled:opacity-50 disabled:pointer-events-none dark:text-green-500 dark:hover:text-green-400 dark:focus:text-green-400"
                          to={`/reservations/edit/${item.id}`}
                        >
                          Edit
                        </Link>
                      )}

                      {/* PREVENT DELETING FOR BOTH (ACUTAL & CONFIRMED) AND ALSO (FUTUR COMING) RESERVATIONS  */}
                      {(!(
                        item.status === "confirmed" &&
                        isAfter(new Date(item.start_date), new Date()) &&
                        isBefore(new Date(item.end_date), new Date())
                      ) ||
                        (item.status === "confirmed" && item.isAfter(new Date(item.start_date), new Date()))) && (
                        <DeletionModal
                          queryKey={"reservations"}
                          targetName={"The reservation"}
                          mutationFuntion={async () => await deleteReservation(item.id, !!item.deleted_at)}
                        />
                      )}
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

export default ReservationsTable;
