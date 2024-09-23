import { useForm } from "react-hook-form";
import Table from "./Table/Table";

function GuestsTable({ guests }) {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <Table>
              <Table.Head headings={["#", "name", "nationalID", "email", "phone", "nationality", "actions"]} />

              {guests.map((item, index) => (
                <Table.Row>
                  <Table.Cell>{index + 1}</Table.Cell>

                  <Table.Cell>{item.fullname}</Table.Cell>
                  <Table.Cell>{item.nationalID ? item.nationalID : "- - - -"}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.phone ? item.phone : "- - - -"}</Table.Cell>
                  <Table.Cell>
                    {item.nationality ? (
                      <div className="flex items-center gap-3">
                        <span className="w-7 inline-block aspect-video">
                          <img src={item.countryFlag} className="w-full" />
                        </span>{" "}
                        <span>{item.nationality}</span>
                      </div>
                    ) : (
                      "- - - -"
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestsTable;
