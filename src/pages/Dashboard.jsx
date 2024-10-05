import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import LastThirtyDaysReservations from "../partials/dashboard/LastThirtyDaysReservations";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";
import Banner from "../partials/Banner";
import { useQuery } from "@tanstack/react-query";
import { getAllReservation } from "../services/supabase/reservations";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { getAllGuests } from "../services/supabase/guests";
// import { getAllReservation } from "../services/supabase/reservations";
// import { getStats } from "../services/supabase/stats";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    data: reservations,
    isLoading,
    isError,
    error,
    status,
  } = useQuery({ queryKey: ["reservations"], queryFn: async () => await getAllReservation() });

  const {
    data: guests,
    isLoading: isLoadingGuests,
    isError: isErrorGuests,
    error: errorGuests,
  } = useQuery({ queryKey: ["guests"], queryFn: async () => await getAllGuests() });

  if (isLoading || isLoadingGuests) return <h1>Wait...</h1>;
  if (isError || isErrorGuests)
    return (
      <h1>
        {error?.message} - {errorGuests}
      </h1>
    );
  if (!reservations || !guests) return <h1>No data was fetched. Please check your network</h1>;

  // console.log(reservations);

  const confirmedReservations = reservations
    .filter((item) => item.status === "confirmed")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // console.log("CONFIRMED RESERVATION");
  // console.log(confirmedReservations);

  let dateRange = eachDayOfInterval({
    start: subDays(new Date(), 30),
    end: new Date(),
  });

  dateRange = dateRange.map((date) => format(date, "MM-dd-yyyy"));
  // console.log("DATE RANGE");
  // console.log(dateRange);

  const groupedReservations = Object.groupBy(confirmedReservations, ({ created_at }) =>
    format(created_at, "MM-dd-yyyy")
  );

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main className="grow">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Dashboard actions */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
            </div>

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Filter button */}
              <FilterButton align="right" />
              {/* Datepicker built with flatpickr */}
              <Datepicker align="right" />
              {/* Add view button */}
              <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="max-xs:sr-only">Add View</span>
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            {/* Line chart (Acme Plus) */}
            <LastThirtyDaysReservations groupedReservations={groupedReservations} dateRange={dateRange} />
            {/* Line chart (Acme Advanced) */}
            <DashboardCard02 groupedReservations={groupedReservations} dateRange={dateRange} />
            {/* Line chart (Acme Professional) */}
            <DashboardCard03 groupedReservations={groupedReservations} dateRange={dateRange} />
            {/* Bar chart (Direct vs Indirect) */}
            {/* <DashboardCard04 /> */}
            {/* Line chart (Real Time Value) */}
            {/* <DashboardCard11 /> */}
            {/* Card (Reasons for Refunds) */}
            <DashboardCard11 />
            {/* Doughnut chart (Top Countries) */}
            <DashboardCard06 guests={guests} />
            {/* Card (Customers) */}
            {/* <DashboardCard10 /> */}
            {/* Table (Top Channels) */}
            {/* <DashboardCard07 /> */}
            {/* Line chart (Sales Over Time) */}
            {/* <DashboardCard08 /> */}
            {/* Stacked bar chart (Sales VS Refunds) */}
            {/* <DashboardCard09 /> */}

            {/* Card (Recent Activity) */}
            <DashboardCard12 />
            <DashboardCard12 />
            {/* Card (Income/Expenses) */}
            {/* <DashboardCard13 /> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
