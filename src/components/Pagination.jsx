function Pagination({ pageNumber, paginationStep, totalCount, currentDataCount, setPage }) {
  return (
    <div class="flex items-center justify-between my-5">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        Showing <span class="font-semibold text-gray-900 dark:text-white">{paginationStep * pageNumber + 1}</span> to{" "}
        <span class="font-semibold text-gray-900 dark:text-white">
          {paginationStep * pageNumber + currentDataCount}
        </span>{" "}
        of <span class="font-semibold text-gray-900 dark:text-white">{totalCount}</span> Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => setPage(pageNumber - 1)}
          disabled={pageNumber === 0}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white disabled:hover:text-white bg-gray-800 disabled:hover:bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 disabled:dark:hover:bg-gray-800 dark:hover:text-white disabled:dark:hover:text-gray-400 disabled:cursor-not-allowed "
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        <button
          onClick={() => {
            setPage(pageNumber + 1);
          }}
          disabled={currentDataCount < paginationStep || (pageNumber + 1) * paginationStep === totalCount}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white disabled:hover:text-white bg-gray-800 disabled:hover:bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 disabled:dark:hover:bg-gray-800 dark:hover:text-white disabled:dark:hover:text-gray-400 disabled:cursor-not-allowed "
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
