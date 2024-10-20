function RoomsFilter({ setFilter, classNames }) {
  function handleSelect(e) {
    if (!e.target.value) {
      setFilter(null);
      return;
    }

    const [col, ascending] = e.target.value.split("-");
    const filter = { col: col, ascending: ascending === "asc" };
    setFilter(filter);
  }

  return (
    <div className={`flex  ${classNames}`}>
      <select
        onChange={handleSelect}
        className="w-full md:w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <option value="">Default Filter</option>
        <option value="capacity-asc">Min to Max capacity</option>
        <option value="capacity-desc">Max to Min Capacity</option>
        <option value="price-asc">Min to Max price</option>
        <option value="price-desc">Max to Min price</option>
      </select>
    </div>
  );
}

export default RoomsFilter;
