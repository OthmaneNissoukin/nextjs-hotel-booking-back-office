import { useState } from "react";

function AnonBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  return (
    <div className="px-2 md:px-5 py-4 bg-yellow-200 dark:bg-yellow-400 dark:bg-opacity-30 text-center relative">
      <p className=" text-stone-900 ">
        <span>👋</span> All data manipulation (Create, Update and Delete) are disabled for{" "}
        <span className="font-bold">Anonymous</span> role
      </p>
      <button className="absolute top-1/2 translate-y-[-50%] right-20 px-3 py-1.5 hover:bg-yellow-500 rounded-full duration-300 transition-all">
        &#10006;
      </button>
    </div>
  );
}

export default AnonBanner;
