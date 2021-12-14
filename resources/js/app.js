import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Testing } from "./pages/Testing";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { TFALogin } from "./pages/auth/TFALogin";
import { Register } from "./pages/auth/Register";
import { UserInfo } from "./pages/auth/UserInfo";
import { TFAEnable } from "./pages/auth/TFAEnable";
import { TFADisable } from "./pages/auth/TFADisable";
import { PasswordConfirm } from "./pages/auth/PasswordConfirm";
import { PasswordReset } from "./pages/auth/PasswordReset";

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<Product />} />
            <Route path="password_reset" element={<PasswordReset />} />
            <Route path="testing" element={<Testing></Testing>} />
            <Route path="login" element={<Login></Login>} />
            <Route path="TFALogin" element={<TFALogin></TFALogin>} />
            <Route path="register" element={<Register></Register>} />
            <Route path="userInfo" element={<UserInfo></UserInfo>} />
            <Route path="TFAEnable" element={<TFAEnable></TFAEnable>} />
            <Route path="TFADisable" element={<TFADisable></TFADisable>} />
            <Route
                path="confirmPassword"
                element={<PasswordConfirm></PasswordConfirm>}
            />
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
