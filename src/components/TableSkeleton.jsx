export default function TableSkeleton({ rows = 5, headings = [] }) {
  const cols = headings.length;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead>
          <tr className="dark:bg-slate-800 bg-slate-200">
            {headings.map((item, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-stone-300"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(rows)
            .fill()
            .map((_, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700">
                {Array(cols)
                  .fill()
                  .map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-10 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse"></div>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
