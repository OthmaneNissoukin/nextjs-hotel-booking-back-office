import { format, isToday, isYesterday } from "date-fns";
import React from "react";

function InboxCard() {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Messages</h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          <>
            {/* <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
              
            </header> */}
            {/* <ul className="my-1">
              <li className="flex px-2 items-center">
                

                <p>
                  <span className="text-stone-300">{item.time} |</span> {item.description}
                </p>
              </li>
            </ul> */}
            Empty (Build Later)
          </>
        </div>
      </div>
    </div>
  );
}

export default InboxCard;
