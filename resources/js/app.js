// const helloWorld = require("./components/hello-world").helloWorld();
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import your route components too
import { Header } from "./components/Header";
import { Nesto } from "./components/Nesto";
import { Miguel } from "./components/Miguel";
import { Drugi } from "./components/Drugi";
import { Products } from "./components/Products";
import { Product } from "./components/Product";
import { Home } from "./components/Home";

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<Product />} />
            <Route path="nesto" element={<Nesto></Nesto>} />
            <Route path="/miguel" element={<Miguel />}>
                <Route path="drugi" element={<Drugi />} />
            </Route>
            <Route
                path=""
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
