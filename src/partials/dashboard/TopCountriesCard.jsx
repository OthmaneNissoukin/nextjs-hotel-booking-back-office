import React from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function TopCountriesCard({ guests }) {
  const guestsWithNationalities = guests.filter((item) => item.nationality);

  const groupedGuests = Object.groupBy(guestsWithNationalities, ({ nationality }) => nationality);

  let countries = Object.keys(groupedGuests).reduce((curr, next) => {
    curr[next] = 0;
    return curr;
  }, {});

  guests.forEach((guest) => {
    const nationality = guest.nationality;
    if (nationality && countries[nationality] !== undefined) {
      countries[nationality]++;
    }
  });

  console.log(countries);
  countries = Object.entries(countries).sort(([, a], [, b]) => b - a);
  countries.length = countries.length > 4 ? 5 : countries.length;
  countries = countries.filter(Boolean);

  const chartData = {
    labels: countries.map((item) => item ?? "Other"),
    datasets: [
      {
        label: "Top Countries",
        data: countries.map((item) => item?.at(1) ?? 0),
        backgroundColor: [
          tailwindConfig().theme.colors.violet[500],
          tailwindConfig().theme.colors.sky[500],
          tailwindConfig().theme.colors.violet[800],
          tailwindConfig().theme.colors.indigo[900],
          tailwindConfig().theme.colors.green[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.violet[600],
          tailwindConfig().theme.colors.sky[600],
          tailwindConfig().theme.colors.violet[900],
          tailwindConfig().theme.colors.indigo[900],
          tailwindConfig().theme.colors.indigo[500],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Top Countries</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default TopCountriesCard;
