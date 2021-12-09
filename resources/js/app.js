import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Testing } from "./pages/Testing";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { Home } from "./pages/Home";
import { PasswordReset } from "./pages/PasswordReset";

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<Product />} />
            <Route path="password_reset" element={<PasswordReset />} />
            <Route path="testing" element={<Testing></Testing>} />
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
