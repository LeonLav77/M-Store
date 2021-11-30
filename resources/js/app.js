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
import { Products } from "./components/Products";
import { Product } from "./components/Product";

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Header></Header>} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<Product />} />
            <Route path="nesto" element={<Nesto></Nesto>} />
            <Route path="/miguel" element={<Miguel />}>
                <Route path="drugi" element={<Drugi />} />
            </Route>
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>Page not found...</p>
                    </main>
                }
            />
        </Routes>
    </BrowserRouter>,
    document.getElementById("app")
);
