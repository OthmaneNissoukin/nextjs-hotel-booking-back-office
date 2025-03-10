import React, { useState } from "react";

import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import LastThirtyDaysReservations from "../partials/dashboard/LastThirtyDaysReservations";

import { useQuery } from "@tanstack/react-query";
import { getAllReservation } from "../services/supabase/reservations";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { getAllGuests } from "../services/supabase/guests";
import { getRecentActivities } from "../services/supabase/logs";
import InboxCard from "../partials/dashboard/InboxCard";
import LogsCard from "../partials/dashboard/LogsCard";
import TopCountriesCard from "../partials/dashboard/TopCountriesCard";
import CancelReasonsCard from "../partials/dashboard/CancelReasonsCard";
import RecentReservations from "../partials/dashboard/RecentReservations";
import RoomsOccupationCard from "../partials/dashboard/RoomsOccupationCard";
import { getAllMessages } from "../services/supabase/inbox";
import Loader from "../components/Loader";
import DashboardSkeleton from "../components/DashboardSkeleton";

function Dashboard() {
  const [date, setDate] = useState(null);
  const {
    data: { reservations } = {},
    isLoading,
    isError,
    error,
    status,
  } = useQuery({ queryKey: ["reservations"], queryFn: async () => await getAllReservation() });

  const {
    data: logs,
    isLoading: isLoadingLogs,
    isError: isErrorLogs,
    error: errorLogs,
  } = useQuery({ queryKey: ["logs"], queryFn: async () => await getRecentActivities(5) });

  const {
    data: { messages } = {},
    isLoading: isLoadingMessages,
    isError: isErrorMessages,
    error: errorMessages,
  } = useQuery({ queryKey: ["messages"], queryFn: async () => await getAllMessages(null, null, 5) });

  const {
    data: { guests } = {},
    isLoading: isLoadingGuests,
    isError: isErrorGuests,
    error: errorGuests,
  } = useQuery({ queryKey: ["guests"], queryFn: async () => await getAllGuests() });

  if (isLoading || isLoadingGuests || isLoadingLogs || isLoadingMessages) return <DashboardSkeleton />;
  if (isError || isErrorGuests || isErrorLogs || isErrorMessages)
    return (
      <h1>
        {error?.message} - {errorGuests?.message} - {errorMessages?.message} - {errorLogs?.message}
      </h1>
    );
  if (!reservations || !guests || !logs) return <h1>No data was fetched. Please check your network</h1>;

  // console.log(reservations);

  const confirmedReservations = reservations.filter((item) => item.status === "confirmed");

  confirmedReservations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  console.log(confirmedReservations);

  // console.log("CONFIRMED RESERVATION");
  // console.log(confirmedReservations);

  let dateRange = eachDayOfInterval(
    date
      ? date
      : {
          start: subDays(new Date(), 30),
          end: new Date(),
        }
  );

  dateRange = dateRange.map((date) => format(date, "MM-dd-yyyy"));
  // console.log("DATE RANGE");
  // console.log(dateRange);

  const groupedReservations = Object.groupBy(confirmedReservations, ({ created_at }) =>
    format(created_at, "MM-dd-yyyy")
  );

  const cancelledReservations = reservations.filter((item) => item.status === "cancelled");
  const groupedReservationsByCancelReason = Object.groupBy(cancelledReservations, ({ cancel_reason }) => cancel_reason);

  // FOR RESERVATIONS ACTIVITY
  const recentReservations = reservations
    .filter((item) => (item.deleted_at || item.admin_deleted_at ? false : true))
    .toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const groupedRecentReservations = Object.groupBy(recentReservations, ({ created_at }) =>
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
              <Datepicker align="right" setDate={setDate} />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            <LastThirtyDaysReservations groupedReservations={groupedReservations} dateRange={dateRange} />
            <RoomsOccupationCard groupedReservations={groupedReservations} dateRange={dateRange} selected_date={date} />
            <RecentReservations groupedReservations={groupedRecentReservations} dateRange={dateRange} />
            <CancelReasonsCard
              groupedCancelledReservations={groupedReservationsByCancelReason}
              total={cancelledReservations.length}
            />
            <TopCountriesCard guests={guests} />
            <LogsCard logs={logs} />
            <InboxCard messages={messages} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
