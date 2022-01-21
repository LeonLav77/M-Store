import React, { useState } from "react";
import { UserInfo } from "../components/auth/UserInfo";
import axios from "axios";
import "../../css/components/UserProfile.css";

export const UserProfile = () => {
    const [userPosts, setUserPosts] = useState(Array(9).fill(""));
    const disableTFA = () =>
        axios({
            method: "delete",
            url: "/auth/user/two-factor-authentication",
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    return (
        <div className="main_user_infos_container">
            <div className="user_infos_container">
                <img
                    src=""
                    alt=""
                    style={{
                        width: 150,
                        height: 150,
                        backgroundColor: "red",
                        margin: 50,
                    }}
                />
                <div
                    style={{
                        margin: 50,
                        display: "flex",
                        justifyContent: "space-between",
                        width: "50%",
                    }}
                >
                    <h1>seller barnd</h1>
                    <h1>Name</h1>
                    <h1>contact</h1>
                </div>
            </div>
            <h1>User Posts</h1>
            <UserInfo />
            <h1>disable TFA</h1>
            <button onClick={() => disableTFA()}>disable tfa</button>
            <div
                style={{
                    display: "flex",
                    width: "80%",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {userPosts.map((post, id) => (
                    <h1
                        style={{
                            margin: 10,
                            backgroundColor: "red",
                            width: "30%",
                            height: 150,
                        }}
                        key={id}
                    >
                        Data
                    </h1>
                ))}
            </div>
        </div>
    );
};
