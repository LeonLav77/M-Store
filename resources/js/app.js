// /**
//  * First we will load all of this project's JavaScript dependencies which
//  * includes React and other helpers. It's a great starting point while
//  * building robust, powerful web applications using React + Laravel.
//  */

require("./bootstrap");

// /**
//  * Next, we will create a fresh React component instance and attach it to
//  * the page. Then, you may begin adding components to this application
//  * or customize the JavaScript scaffolding to fit your unique needs.
//  */

// require('./components/app');

import { render } from "react-dom";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import your route components too
import { Header } from "./components/Header";
import { Nesto } from "./components/Nesto";
import { Miguel } from "./components/Miguel";
import { Drugi } from "./components/Drugi";

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Header></Header>} />
            <Route path="nesto" element={<Nesto></Nesto>} />
            <Route path="/miguel" element={<Miguel />}>
                <Route path="drugi" element={<Drugi />} />
            </Route>
            {/* <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>
      </Route> */}
        </Routes>
    </BrowserRouter>,
    document.getElementById("app")
);
