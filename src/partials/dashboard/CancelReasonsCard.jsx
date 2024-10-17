import React from "react";
import BarChart from "../../charts/BarChart03";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderBlank } from "@fortawesome/free-regular-svg-icons";
import CardEmptyState from "../../components/CardEmptyState";

function CancelReasonsCard({ groupedCancelledReservations, total }) {
  const reasonsLabels = Object.keys(groupedCancelledReservations);

  let reasons = reasonsLabels.reduce((curr, next) => {
    curr[next] = 0;
    return curr;
  }, {});

  reasonsLabels.forEach((reason) => {
    reasons[reason] = groupedCancelledReservations[reason].length;
  });

  // console.log(reasonsLabels);

  const chartData = {
    labels: ["Reasons"],
    datasets: [
      {
        label: "The listing didn't match expectations or wasn't as advertised",
        data: [reasons["low expectation"] ?? 0],
        backgroundColor: tailwindConfig().theme.colors.violet[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[600],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Found a better option or missing key features",
        data: [reasons["better option"] ?? 0],
        backgroundColor: tailwindConfig().theme.colors.violet[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[800],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Dissatisfied with the quality of service or expectations",
        data: [reasons.unsatissfied ?? 0],
        backgroundColor: tailwindConfig().theme.colors.sky[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "The product doesn’t look as advertised",
        data: [reasons.cancelled ?? 0],
        backgroundColor: tailwindConfig().theme.colors.green[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[600],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Other",
        data: [reasons.other ?? 0],
        backgroundColor: tailwindConfig().theme.colors.gray[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[300],
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  console.log(chartData);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Reasons for Cancel</h2>
      </header>

      {!reasons.length ? (
        <CardEmptyState>No cancel was performed</CardEmptyState>
      ) : Object.values(reasons).reduce((curr, next) => curr + next, 0) > 0 ? (
        <>
          {" "}
          <div className="px-5 py-3">
            <div className="flex items-start">
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
                {String(total).padStart(3, "0")}
              </div>
            </div>
          </div>
          <div className="grow">
            <BarChart data={chartData} width={595} height={48} />
          </div>
        </>
      ) : (
        <p>No cancelled reservation was made</p>
      )}
    </div>
  );
}

export default CancelReasonsCard;
