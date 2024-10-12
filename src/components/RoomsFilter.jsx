function RoomsFilter({ setFilter }) {
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
    <div className="flex justify-end">
      <select
        onChange={handleSelect}
        className="w-full sm:w-auto px-4 py-3 dark:bg-slate-700 bg-slate-200 text-stone-900 dark:text-stone-200 outline-none border-none rounded-sm min-w-64"
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
