import { useEffect } from "react";
import Table from "../components/Table/Table";
import { getAllRooms } from "../services/supabase/rooms";

function Guests() {
  useEffect(() => {
    async function getRooms() {
      const req = await getAllRooms();
      console.log(req);
    }

    getRooms();
  }, []);

  return (
    <section>
      <div className="flex justify-end mb-5">
        <button
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Light
        </button>
      </div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Table>
                <Table.Head headings={["#", "name", "capacity", "price", "discount", "status", "actions"]} />
                <Table.Row>
                  <Table.Cell>
                    <span className="inline-block w-20 aspect-square">
                      <img src="http://placehold.it/80x80/376" alt="" />
                    </span>
                  </Table.Cell>

                  <Table.Cell>Deluxe Room</Table.Cell>
                  <Table.Cell>3</Table.Cell>
                  <Table.Cell>$40.00</Table.Cell>
                  <Table.Cell>$8.49</Table.Cell>
                  <Table.Cell>Available</Table.Cell>
                  <Table.Cell>
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Guests;
