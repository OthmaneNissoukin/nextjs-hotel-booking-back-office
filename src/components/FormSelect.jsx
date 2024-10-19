import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { getAllGuests } from "../services/supabase/guests";
import { useThemeProvider } from "../utils/ThemeContext";
import { useState } from "react";
function FormSelect({
  options,
  placeholder,
  setValue,
  onChange,
  disabled = false,
  defaultValue = null,
  isLoading = false,
}) {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  function handleChange(option) {
    setValue(option.value);
    onChange?.();
  }

  function onMouseLeave() {
    console.log("Hello");
  }

  return (
    <Select
      isDisabled={disabled}
      isLoading={isLoading}
      defaultValue={defaultValue}
      onChange={handleChange}
      name="guests"
      placeholder={placeholder}
      styles={{
        singleValue: (base) => ({
          ...base,
          color: currentTheme === "dark" ? "#fff" : base.color,
        }),
        option: (base, { isSelected }) => ({
          ...base,
          color: currentTheme === "dark" ? "#fff" : "#334155",
          backgroundColor: isSelected ? (currentTheme === "dark" ? "#1856ad" : "#669ce7") : "transparent",
          ":hover": {
            color: currentTheme === "dark" ? "#334155" : "#2a313a",
            backgroundColor: "#bfc4cd",
          },
        }),
      }}
      classNames={{
        dropdownIndicator: () => "bg-gray-50 dark:bg-gray-800 h-full",
        loadingIndicator: () => "bg-gray-50 dark:bg-gray-800 h-full",
        clearIndicator: () => "bg-gray-50 dark:bg-gray-800 h-full",

        menuList: () =>
          "bg-gray-50 dark:bg-gray-800 dark:text-white text-gray-900 text-sm border border-gray-300 dark:border-gray-700",
        valueContainer: () => "bg-gray-50 dark:bg-gray-800 h-full text-red-700",
        container: () => "h-full border border-gray-300 dark:border-gray-700",
        control: () => "h-full border border-gray-300 rounded-md dark:border-gray-700",
        option: () => "hover:text-slate-700",
        // singleValue: () => "text-red-700",
      }}
      isSearchable={true}
      options={options}
      // options={[1, 2, 3, 4, 5].map((item) => ({ label: `A-${parseInt(item * Math.random() * 100)}`, value: item }))}
    />
  );
}

export default FormSelect;
