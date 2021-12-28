import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Testing } from "./pages/Testing";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { TFALogin } from "./components/auth/TFALogin";
import { RegisterPage } from "./pages/RegisterPage";
import { UserInfo } from "./components/auth/UserInfo";
import { TFAEnable } from "./components/auth/TFAEnable";
import { TFADisable } from "./components/auth/TFADisable";
import { PasswordConfirm } from "./components/auth/PasswordConfirm";
import { UserProfilePage } from "./pages/UserProfilePage";
import { Provider } from "react-redux";
import { PasswordReset } from "./components/auth/PasswordReset";
import { TestingUi } from "./pages/TestingUi";
import { store } from "./store/store";
import { AuthUserProvider } from "./hooks/useAuth";

render(
    <BrowserRouter>
        <Provider store={store}>
            <AuthUserProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            // !store.getState().userInfo.user ? (
                            //     <Navigate to="/login" />
                            // ) : (
                            <HomePage />
                            // )
                        }
                    />
                    {/* ill add this just not today */}
                    {/* element={!store.isLoggedIn ? <Navigate to="/login" /> : <App />} */}
                    <Route path="mstore" element={<HomePage />} />
                    <Route
                        path="login"
                        element={
                            store.getState().userInfo.user ? (
                                <Navigate to="/" />
                            ) : (
                                <LoginPage />
                            )
                        }
                    />
                    <Route path="products" element={<ProductsPage />} />
                    <Route
                        path="products/:productId"
                        element={<ProductDetailsPage />}
                    />
                    <Route path="password_reset" element={<PasswordReset />} />
                    <Route path="user_profile" element={<UserProfilePage />} />
                    <Route path="testing" element={<Testing></Testing>} />
                    <Route path="testingUi" element={<TestingUi></TestingUi>} />
                    <Route
                        path="register"
                        element={<RegisterPage></RegisterPage>}
                    />

                    {/* <Route path="login" element={<Login></Login>} />
                <Route path="TFALogin" element={<TFALogin></TFALogin>} />
                <Route path="userInfo" element={<UserInfo></UserInfo>} />
                <Route path="TFAEnable" element={<TFAEnable></TFAEnable>} />
                <Route path="TFADisable" element={<TFADisable></TFADisable>} />
                <Route
                    path="confirmPassword"
                    element={<PasswordConfirm></PasswordConfirm>}
                /> */}
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>Page not found...</p>
                            </main>
                        }
                    />
                </Routes>
            </AuthUserProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById("app")
);
