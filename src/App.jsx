import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Rooms from "./pages/Rooms";
import Layout from "./ui/Layout";
import Guests from "./pages/Guests";
import NewRoom from "./pages/NewRoom";
import NewGuest from "./pages/NewGuest";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Rooms />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/rooms/new" element={<NewRoom />} />
          <Route exact path="/guests" element={<Guests />} />
          <Route exact path="/guests/new" element={<NewGuest />} />
        </Route>
        {/* <Route exact path="/" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
