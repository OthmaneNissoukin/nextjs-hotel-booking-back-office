import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import { chartAreaGradient } from "../../charts/ChartjsConfig";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import { eachDayOfInterval, format, isAfter, isBefore, isEqual, parse, subDays } from "date-fns";

function RoomsOccupationCard({ groupedReservations, dateRange, selected_date }) {
  let dateRangeObj = dateRange.reduce((acc, key) => {
    acc[key] = null;
    return acc;
  }, {});

  // THIS IS AN OBJECT WITH KEYS AS [RESERVATION DATE] AND VALUES AS [AN ARRAY OF ALL RESERVATIONS MADE WITHIN THAT DAY]
  const reservationsByDates = Object.values(groupedReservations);

  const filteredReservations = [];
  // EXTRACTING RESERVATIONS OBJECTS FROM RESERVATION PERIODS ARRAY
  reservationsByDates.forEach((element) => {
    element.forEach((item) => filteredReservations.push(item));
  });

  // THIS OBJECT SHOULD CONTAIN THE UNIQUE RESERVATIONS THAT INTERSECT WITH THE CURRENT SELECTED DATE RANGE TO LATER CALCULATE THE GUESTS TOTAL NUMBER
  const uniqueDateRangeReservation = {};

  filteredReservations.forEach((reservation) => {
    // CREATING AN ARRAY FOR THE LASTEST 30 DAYS DAY BY DAY
    const booking_period = eachDayOfInterval(
      selected_date
        ? selected_date
        : {
            start: subDays(new Date(), 30),
            end: new Date(),
          }
    ).map((date) => format(date, "yyyy-MM-dd"));

    // ITERATING OVER EACH DAY AND CHECKING IF THAT DAY HAS ANY RUNNING CONFIRMED RESERVATION
    booking_period.forEach((date) => {
      if (
        (isAfter(new Date(date), new Date(reservation.start_date)) &&
          isBefore(new Date(date), new Date(reservation.end_date))) ||
        isEqual(new Date(date), new Date(reservation.start_date)) ||
        isEqual(new Date(date), new Date(reservation.end_date))
      ) {
        const [y, m, d] = date.split("-");
        dateRangeObj[`${m}-${d}-${y}`] = dateRangeObj[`${m}-${d}-${y}`]
          ? dateRangeObj[`${m}-${d}-${y}`] + reservation.guests_count
          : reservation.guests_count;

        // SETTING GUESTS COUNT AS VALUE TO THE UNIQUE RESERVATIONS
        if (!uniqueDateRangeReservation[reservation.id])
          uniqueDateRangeReservation[reservation.id] = reservation.guests_count;
      }
    });
  });

  const guestsCountWithinDateRange = Object.values(uniqueDateRangeReservation).reduce((curr, next) => curr + next, 0);

  const stats = Object.values(dateRangeObj).map((item) => (item ? item : 0));

  const chartData = {
    labels: dateRange,
    datasets: [
      // Indigo line
      {
        data: stats,
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)` },
            { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)` },
          ]);
        },
        borderColor: tailwindConfig().theme.colors.violet[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Occupancy Rate</h2>
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3" to="#0">
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Total (unique guests)
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {guestsCountWithinDateRange} Guests
          </div>
          <div className="text-sm font-medium text-red-700 px-1.5 bg-red-500/20 rounded-full">-14%</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} shouldFormat={false} key={dateRange} />
      </div>
    </div>
  );
}

export default RoomsOccupationCard;
