import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, isToday, isYesterday } from "date-fns";
import React from "react";
import CardEmptyState from "../../components/CardEmptyState";

function InboxCard({ messages }) {
  const mostRecentMessages = messages.map((message) => ({
    ...message,
    time: format(message.created_at, "HH:mm:ss"),
    created_at: format(message.created_at, "yyyy-MM-dd"),
  }));

  // console.log(logs);
  // console.log(mostRecentMessages);

  const groupedMessages = Object.groupBy(mostRecentMessages, ({ created_at }) => created_at);
  const datesLabels = Array.from(Object.keys(groupedMessages));
  datesLabels.sort((a, b) => new Date(b) - new Date(a));
  console.log(datesLabels);
  // console.log(groupedMessages);
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl md:max-h-[26rem] overflow-y-auto">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Messages</h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          {!messages.length ? (
            <CardEmptyState>No message was received</CardEmptyState>
          ) : (
            datesLabels.map((date, index) => (
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
                  {groupedMessages[date].map((item) => (
                    <li key={item.id} className="flex px-2 items-center">
                      {/* {!["room", "guest", "booking", "admin"].includes(item.category) && (
                      <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                        <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                          <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                        </svg>
                      </div>
                    )} */}

                      <p>
                        <span className="text-stone-300">
                          {item.time} | {item.fullname}
                        </span>{" "}
                        {item.message.length > 25 ? `${item.message?.slice(0, 50)}...` : item.message}
                      </p>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default InboxCard;
