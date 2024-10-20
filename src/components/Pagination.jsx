function Pagination({ pageNumber, paginationStep, totalCount, currentDataCount, setPage }) {
  return (
    <div className="flex items-center justify-between my-5">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing <span className="font-semibold text-gray-900 dark:text-white">{paginationStep * pageNumber + 1}</span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {paginationStep * pageNumber + currentDataCount}
        </span>{" "}
        of <span className="font-semibold text-gray-900 dark:text-white">{totalCount}</span> Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => setPage(pageNumber - 1)}
          disabled={pageNumber === 0}
          className={`flex items-center justify-center px-4 h-10 text-base font-medium 
            ${
              pageNumber === 0
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            } 
            border border-gray-300 dark:border-gray-600 rounded-l-md transition-all duration-150 ease-in-out`}
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        <button
          onClick={() => setPage(pageNumber + 1)}
          disabled={currentDataCount < paginationStep || (pageNumber + 1) * paginationStep >= totalCount}
          className={`flex items-center justify-center px-4 h-10 text-base font-medium 
            ${
              currentDataCount < paginationStep || (pageNumber + 1) * paginationStep >= totalCount
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            } 
            border border-gray-300 dark:border-gray-600 rounded-r-md transition-all duration-150 ease-in-out`}
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
