import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { getAllGuests } from "../services/supabase/guests";
import { useThemeProvider } from "../utils/ThemeContext";
function GuestsSelect() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();
  const {
    data: guests,
    error: guestsError,
    isFetching,
  } = useQuery({ queryKey: ["guests"], queryFn: async () => getAllGuests() });

  return (
    <Select
      name="guests"
      placeholder="-- Select a Guest --"
      styles={{
        singleValue: (base) => ({ ...base, color: currentTheme === "dark" ? "#fff" : base.color }),
        input: (base) => ({ ...base, outline: "none", border: "none" }),
      }}
      classNames={{
        dropdownIndicator: () => "bg-gray-50 dark:bg-gray-700 h-full",
        loadingIndicator: () => "bg-gray-50 dark:bg-gray-700 h-full",
        clearIndicator: () => "bg-gray-50 dark:bg-gray-700 h-full",

        menuList: () =>
          "bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-900 text-sm border border-gray-300 dark:border-gray-600",
        valueContainer: () => "bg-gray-50 dark:bg-gray-700 h-full text-red-700",
        container: () => "h-full border border-gray-300 dark:border-gray-600",
        control: () => "h-full border border-gray-300 rounded-sm dark:border-gray-600",
        option: () => "hover:text-slate-700",
        singleValue: () => "text-red-700",
      }}
      isLoading={isFetching}
      isSearchable={true}
      isDisabled={isFetching}
      // options={guests?.map((item) => ({ label: `${item.fullname} - ${item.nationalID}`, value: item.id }))}
      options={[1, 2, 3, 4, 5].map((item) => ({ label: `A-${parseInt(item * Math.random() * 100)}`, value: item }))}
    />
  );
}

export default GuestsSelect;
