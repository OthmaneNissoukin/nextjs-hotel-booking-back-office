import { format, isToday, isYesterday } from "date-fns";
import React from "react";

function LogsCard({ logs }) {
  // const groupedActivities = Object.groupBy(logs, ({created_at}) => isToday(created_at) ? "Today" : isYesterday(created_at) ? "Yesterday" : format(created_at, "dd-MM-yyyy"))

  const mostRecentActivities = logs.map((activity) => ({
    ...activity,
    time: format(activity.created_at, "HH:mm:ss"),
    created_at: format(activity.created_at, "yyyy-MM-dd"),
  }));

  // console.log(logs);
  // console.log(mostRecentActivities);

  const groupedActivities = Object.groupBy(mostRecentActivities, ({ created_at }) => created_at);
  const datesLabels = Array.from(Object.keys(groupedActivities));
  datesLabels.sort((a, b) => new Date(b) - new Date(a));
  console.log(datesLabels);
  // console.log(groupedActivities);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Activity</h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          {datesLabels.map((date, index) => (
            <React.Fragment key={index}>
              <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
                {isToday(new Date(date))
                  ? "Today"
                  : isYesterday(new Date(date))
                  ? "Yesterday"
                  : date.split("-").reverse().join("-")}
              </header>

              <ul className="my-1">
                {/* Item */}
                {groupedActivities[date].map((item) => (
                  <li key={item.id} className="flex px-2 items-center">
                    {item.category === "guest" && (
                      <div className="w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3">
                        <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                          <path d="M18 18a6 6 0 100-12 6 6 0 000 12zm0 2c-4.4 0-12 2.2-12 6v2h24v-2c0-3.8-7.6-6-12-6z" />
                        </svg>
                      </div>
                    )}
                    {item.category === "booking" && (
                      <div className="w-9 h-9 rounded-full shrink-0 bg-yellow-500 my-2 mr-3">
                        <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                          <path d="M28 4H8C6.9 4 6 4.9 6 6v24c0 1.1 0.9 2 2 2h20c1.1 0 2-0.9 2-2V6c0-1.1-0.9-2-2-2zm0 24H8V6h20v22zM11 18h14v2H11v-2zm0-6h14v2H11v-2z" />
                        </svg>
                      </div>
                    )}
                    {item.category === "room" && (
                      <div className="w-9 h-9 rounded-full shrink-0 bg-violet-500 my-2 mr-3">
                        <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                          <path d="M18 2C9.2 2 2 9.2 2 18s7.2 16 16 16 16-7.2 16-16S26.8 2 18 2zm0 28c-6.6 0-12-5.4-12-12S11.4 6 18 6s12 5.4 12 12-5.4 12-12 12zm1-18h-2v6h5v-2h-3V12z" />
                        </svg>
                      </div>
                    )}
                    {item.category === "admin" && (
                      <div className="w-9 h-9 rounded-full shrink-0 bg-yellow-500 my-2 mr-3">
                        <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                          <path d="M20.5 3l-1.3 2.6c-0.4 0.8-1.2 1.4-2.1 1.4s-1.7-0.6-2.1-1.4L13.5 3H10l1.3 2.6c0.4 0.8 0.4 1.7 0 2.6L10 10v2.5l2.6 1.3c0.8 0.4 1.4 1.2 1.4 2.1s-0.6 1.7-1.4 2.1L10 18.5V21l2.6 1.3c0.8 0.4 1.4 1.2 1.4 2.1s-0.6 1.7-1.4 2.1L10 30v2.5h3.5l1.3-2.6c0.4-0.8 1.2-1.4 2.1-1.4s1.7 0.6 2.1 1.4L22.5 32H26v-2.5l-2.6-1.3c-0.8-0.4-1.4-1.2-1.4-2.1s0.6-1.7 1.4-2.1L26 21v-2.5l-2.6-1.3c-0.8-0.4-1.4-1.2-1.4-2.1s0.6-1.7 1.4-2.1L26 10V7.5l-3.5-1.3-1.3-2.6H20.5zM18 22c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
                        </svg>
                      </div>
                    )}
                    {!["room", "guest", "booking", "admin"].includes(item.category) && (
                      <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                        <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                          <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                        </svg>
                      </div>
                    )}

                    <p>
                      <span className="text-stone-300">{item.time} |</span> {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogsCard;
