import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Rooms from "./pages/Rooms";
import Layout from "./ui/Layout";

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
        </Route>
        {/* <Route exact path="/" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
