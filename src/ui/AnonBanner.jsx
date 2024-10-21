import { useState, useEffect } from "react";

function AnonBanner() {
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem("is_dismissed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("is_dismissed", isDismissed);
  }, [isDismissed]);

  const handleClose = () => {
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div className="px-2 md:px-5 py-4 bg-yellow-200 dark:bg-yellow-300 dark:bg-opacity-85 text-center relative">
      <p className="text-stone-900 dark:text-stone-900">
        <span>👋</span> All data manipulation (Create, Update, and Delete) are disabled for{" "}
        <span className="font-bold">Anonymous</span> role
      </p>
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 md:top-1/2 md:translate-y-[-50%] md:right-5 px-2 py-1 text-stone-900 dark:text-stone-900 bg-transparent hover:bg-yellow-500 rounded-full duration-300 transition-all"
        aria-label="Close banner"
      >
        &#10006;
      </button>
    </div>
  );
}

export default AnonBanner;
