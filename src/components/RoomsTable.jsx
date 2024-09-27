import { deleteRoom } from "../services/supabase/rooms";
import DeletionModal from "./DeletionModal";
import Table from "./Table/Table";

function RoomsTable({ rooms, headings }) {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
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

                  {headings.find((col) => col.label === "name" && col.show) && (
                    <Table.Cell>{String(item.name).padStart(2, "0")}</Table.Cell>
                  )}

                  {headings.find((col) => col.label === "capacity" && col.show) && (
                    <Table.Cell>{String(item.capacity).padStart(2, "0")}</Table.Cell>
                  )}
                  {headings.find((col) => col.label === "price" && col.show) && (
                    <Table.Cell>${item.price.toFixed(2)}</Table.Cell>
                  )}
                  {headings.find((col) => col.label === "discount" && col.show) && (
                    <Table.Cell>${item.discount.toFixed(2)}</Table.Cell>
                  )}
                  {headings.find((col) => col.label === "status" && col.show) && (
                    <Table.Cell>
                      <Table.Cell>STATIC</Table.Cell>
                    </Table.Cell>
                  )}
                  {headings.find((col) => col.label === "actions" && col.show) && (
                    <Table.Cell>
                      <DeletionModal
                        queryKey={"rooms"}
                        targetName={item.name}
                        mutationFuntion={async () => await deleteRoom(item.id)}
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

export default RoomsTable;
