import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Testing } from "./pages/Testing";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { Home } from "./pages/Home";
import { Login } from "./components/auth/Login";
import { TFALogin } from "./components/auth/TFALogin";
import { Register } from "./components/auth/Register";
import { UserInfo } from "./components/auth/UserInfo";
import { TFAEnable } from "./components/auth/TFAEnable";
import { TFADisable } from "./components/auth/TFADisable";
import { PasswordConfirm } from "./components/auth/PasswordConfirm";
import { Provider } from "react-redux";
import { PasswordReset } from "./components/auth/PasswordReset";
import { TestingUi } from "./pages/TestingUi";
import { store } from "./store/store";

render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:productId" element={<Product />} />
                <Route path="password_reset" element={<PasswordReset />} />
                <Route path="testing" element={<Testing></Testing>} />
                <Route path="testingUi" element={<TestingUi></TestingUi>} />
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
        </Provider>
    </BrowserRouter>,
    document.getElementById("app")
);
