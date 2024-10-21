import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Rooms from "./pages/Rooms";
import Layout from "./ui/Layout";
import Guests from "./pages/Guests";
import NewRoom from "./pages/NewRoom";
import NewGuest from "./pages/NewGuest";
import Dashboard from "./pages/Dashboard";
import EditGuest from "./pages/EditGuest";
import EditRoom from "./pages/EditRoom";
import NewReservation from "./pages/NewReservation";
import Reservations from "./pages/Reservations";
import EditReservation from "./pages/EditReservation";
import supabase from "./services/supabase/db";
import { Auth } from "@supabase/auth-ui-react";
import Login from "./pages/Login";
import Inbox from "./pages/Inbox";
import Logs from "./pages/Logs";
import EditPassword from "./pages/EditPassword";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  // SUPABASE AUTHENTICATION
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Login />;
  }

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/edit/:id" element={<EditRoom />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/guests/new" element={<NewGuest />} />
          <Route path="/guests/edit/:id" element={<EditGuest />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/reservations/new" element={<NewReservation />} />
          <Route path="/reservations/edit/:id" element={<EditReservation />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/activities" element={<Logs />} />
          <Route path="/account/edit-password" element={<EditPassword />} />
          <Route path="/account/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
