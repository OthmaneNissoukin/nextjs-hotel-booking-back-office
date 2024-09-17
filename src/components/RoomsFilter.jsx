function RoomsFilter({ setFilter }) {
  return (
    <div className="flex justify-end">
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="w-full sm:w-auto px-4 py-3 dark:bg-slate-700 bg-slate-200 text-stone-900 dark:text-stone-200 outline-none border-none rounded-sm min-w-64"
      >
        <option value="">Default Filter</option>
        <option value="asc-capacity">Min to Max capacity</option>
        <option value="desc-capacity">Max to Min Capacity</option>
        <option value="asc-price">Min to Max price</option>
        <option value="desc-price">Max to Min price</option>
      </select>
    </div>
  );
}

export default RoomsFilter;
