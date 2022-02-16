import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Testing } from "./pages/Testing";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { TFALogin } from "./components/auth/TFALogin";
import { ConfirmPurchase } from "./components/auth/ConfirmPurchase";
import { StripePage } from "./components/auth/StripePage";
import { RegisterPage } from "./pages/RegisterPage";
import { UserInfo } from "./components/auth/UserInfo";
import { TFAEnable } from "./components/auth/TFAEnable";
import { TFADisable } from "./components/auth/TFADisable";
import { PasswordConfirm } from "./components/auth/PasswordConfirm";
import { Wishlist } from "./components/Wishlist";
import { UserProfilePage } from "./pages/UserProfilePage";
import { Provider } from "react-redux";
import { CartPage } from "./pages/CartPage";
import { PasswordReset } from "./components/auth/PasswordReset";
import { TestingUi } from "./pages/TestingUi";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ConfirmPassword } from "./components/ConfirmPassword";
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
                            <ConfirmPurchase />
                            // )
                        }
                    />
                    {/* ill add this just not today */}
                    <Route path="mstore" element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route
                        path="products/:productId"
                        element={<ProductDetailsPage />}
                    />
                    <Route
                        path="confirmPassword"
                        element={<ConfirmPassword />}
                    />
                    <Route path="password_reset" element={<PasswordReset />} />
                    <Route path="user_profile" element={<UserProfilePage />} />
                    <Route path="cart" element={<CartPage />} />
                    {/* <Route path="checkout" element={<CheckoutPage />} /> */}
                    <Route
                        path="checkout/order/:orderId"
                        element={<CheckoutPage />}
                    />
                    <Route path="testing" element={<Testing></Testing>} />
                    <Route path="testingUi" element={<TestingUi></TestingUi>} />
                    <Route
                        path="register"
                        element={<RegisterPage></RegisterPage>}
                    />
                    <Route path="TFALogin" element={<TFALogin></TFALogin>} />
                    <Route path="userInfo" element={<UserInfo></UserInfo>} />
                    <Route path="TFAEnable" element={<TFAEnable></TFAEnable>} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route
                        path="TFADisable"
                        element={<TFADisable></TFADisable>}
                    />
                    <Route path="home" element={<HomePage></HomePage>} />
                    <Route
                        path="StripePage"
                        element={<StripePage></StripePage>}
                    />
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
