export default function Table({ children }) {
  return <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">{children}</table>;
}

function Head({ headings = [] }) {
  return (
    <thead>
      <tr className="dark:bg-slate-800 bg-slate-200 ">
        {headings.map(
          (col, index) =>
            col.show && (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-stone-300"
              >
                {col.label}
              </th>
            )
        )}
      </tr>
    </thead>
  );
}

function Row({ children }) {
  return (
    <tbody>
      <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-800">
        {children}
      </tr>
    </tbody>
  );
}

function Cell({ classNames = "", children }) {
  return (
    <td className={`${classNames} px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200`}>
      {children}
    </td>
  );
}

Table.Head = Head;
Table.Row = Row;
Table.Cell = Cell;
