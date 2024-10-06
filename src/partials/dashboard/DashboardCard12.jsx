import { format, isToday, isYesterday } from "date-fns";
import React from "react";

function DashboardCard12({ logs }) {
  // const groupedActivities = Object.groupBy(logs, ({created_at}) => isToday(created_at) ? "Today" : isYesterday(created_at) ? "Yesterday" : format(created_at, "dd-MM-yyyy"))

  let mostRecentActivities = [];
  let counter = 0;
  logs.forEach((activity) => {
    mostRecentActivities = [
      ...mostRecentActivities,
      {
        ...activity,
        created_at: isToday(activity.created_at)
          ? "Today"
          : isYesterday(activity.created_at)
          ? "Yesterday"
          : format(activity.created_at, "dd-MM-yyyy"),
      },
    ];

    counter++;

    if (counter >= 5) return;
  });

  console.log(mostRecentActivities);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Activity</h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          <ul className="my-1">
            {/* Item */}
            {logs.map((item) => (
              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-violet-500 my-2 mr-3">
                  <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                    <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                  </svg>
                </div>

                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard12;
