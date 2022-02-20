import axios from "axios";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { InputValues, useForm } from "./useForm";

//login cu nap s context-on a, register cu samo tamo s useState-ovima

const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
    const [values, changeValues] = useForm({ email: "", password: "" });
    // const [password, setPassword] = useState("password");
    // const [email, setEmail] = useState(process.env.MIX_EMAIL);

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user") || "")
    );

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    //pass email, password
    const login = async () => {
        try {
            let response = await axios({
                method: "post",
                url: "auth/login",
                data: {
                    email: "leonlav77@gmail.com",
                    password: "password",
                },
                headers: {
                    contentType: "application/x-www-form-urlencoded",
                },
            });
            return response;
        } catch (err) {
            return err;
        }
    };

    //pass sve
    const register = async () => {
        try {
            let response = await axios({
                method: "post",
                url: "auth/register",
                data: {
                    email: process.env.MIX_EMAIL,
                    name: "leonlav77",
                    password: "password",
                    password_confirmation: "password",
                },
                headers: {
                    contentType: "application/x-www-form-urlencoded",
                },
            });
            return response;
        } catch (err) {
            return err;
        }
    };

    function logout() {
        axios({
            method: "post",
            url: "/auth/logout",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const userInfos = useMemo(
        () => ({
            // password,
            // setPassword,
            // email,
            // setEmail,
            login,
            user,
            setUser,
            register,
            // userInfo,
            logout,
            // isLoggedIn,
            values,
            changeValues,
        }),
        [user, setUser, values, changeValues]
        // [password, setPassword, email, setEmail]
    );
    return (
        <AuthUserContext.Provider value={userInfos}>
            {children}
        </AuthUserContext.Provider>
    );
};

export interface AuthContextInterface {
    login?: () => any;
    user?: boolean;
    setUser?: (bool: boolean) => any;
    logout?: () => any;
    register?: () => any;
    values?: InputValues;
    changeValues?: (e: React.ChangeEvent<HTMLInputElement>) => InputValues;
}

export default function useAuth() {
    return useContext<AuthContextInterface>(AuthUserContext);
}
