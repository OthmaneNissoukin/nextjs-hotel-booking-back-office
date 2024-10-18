import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Outlet } from "react-router-dom";
import supabase from "../services/supabase/db";
import AnonBanner from "./AnonBanner";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isAnon, setIsAnon] = useState(false);

  useEffect(() => {
    async function getAuthSession() {
      const curr_user = await supabase.auth.getUser();
      console.log(curr_user);
      if (!curr_user?.data?.user) return;
      setIsAnon(curr_user?.data?.user.is_anonymous);
    }

    getAuthSession();
  });

  return (
    <>
      {isAnon && <AnonBanner />}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
