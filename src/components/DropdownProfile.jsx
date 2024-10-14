import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";

import UserAvatar from "../images/user-avatar-32.png";
import toast, { Toaster } from "react-hot-toast";
import supabase from "../services/supabase/db";

function DropdownProfile({ align }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    async function getAuthUser() {
      const authUser = await supabase.auth.getUser();

      setAuthenticatedUser(authUser);

      console.log("authUser");
      console.log(authUser);
    }

    getAuthUser();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  async function handleLogout() {
    setDropdownOpen(false);
    toast.promise(supabase.auth.signOut(), {
      success: "Sign out successfully!",
      loading: "signing out...",
      error: "Failed to sign out!",
    });
  }

  return (
    <>
      <div className="relative inline-flex">
        <button
          ref={trigger}
          className="inline-flex justify-center items-center group"
          aria-haspopup="true"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
        >
          <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
          <div className="flex items-center truncate">
            <span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
              {authenticatedUser?.data.user.is_anonymous ? "Anonymous" : "Admin"}
            </span>

            <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        </button>

        <Transition
          className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
            align === "right" ? "right-0" : "left-0"
          }`}
          show={dropdownOpen}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
              <div className="font-medium text-gray-800 dark:text-gray-100">
                {authenticatedUser?.data.user.is_anonymous ? "Anonymous" : "Admin"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 italic">Administrator</div>
            </div>
            <ul>
              {!authenticatedUser?.data.user.is_anonymous && (
                <li>
                  <Link
                    className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                    to="/settings"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Settings
                  </Link>
                </li>
              )}
              <li>
                <button
                  className="border-none outline-none font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                  to="/signin"
                  onClick={() => handleLogout()}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
      <Toaster position="top-center" />
    </>
  );
}

export default DropdownProfile;
