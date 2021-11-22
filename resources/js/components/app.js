import { render } from "react-dom";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import your route components too
import { Header } from "./Header";

render(
    <h1>Helo JE nist ak</h1>,
    // <BrowserRouter>
    //     <Routes>
    //         <Route path="/" element={<Header></Header>} />
    //         {/* <Route path="/" element={<App />}>
    //     <Route index element={<Home />} />
    //     <Route path="teams" element={<Teams />}>
    //       <Route path=":teamId" element={<Team />} />
    //       <Route path="new" element={<NewTeamForm />} />
    //       <Route index element={<LeagueStandings />} />
    //     </Route>
    //   </Route> */}
    //     </Routes>
    // </BrowserRouter>,
    document.getElementById("root")
);
