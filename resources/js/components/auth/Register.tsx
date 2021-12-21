import React, { useState } from "react";
import $ from "jquery";
import axios from "axios";

export const Register = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [email, setEmail] = useState(process.env.MIX_EMAIL);
    const [name, setName] = useState("Leon");
    const [password1, setPassword1] = useState("password");
    const [password2, setPassword2] = useState("password");
    const onFileChange = (event) => {
        setSelectedFile({ selectedFile: event.target.files[0] });
    };
    const Register = (formData) =>
        axios({
            method: "post",
            url: "/api/test",
            data: formData,
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

    const onFileUpload = (name, email, password1, password2) => {
        const formData = new FormData();
        formData.append("myFile", selectedFile);
        formData.append("email", email);
        formData.append("password", password1);
        formData.append("password_confirmation", password2);
        formData.append("name", name);
        console.log(formData);
        Register(formData);
    };
    return (
        <div>
            <div>
                <h1>Name</h1>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                />
                <h1>Email</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />
                <h1>pass</h1>
                <input
                    type="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder="passowrd"
                />
                <h1>con pass</h1>
                <input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="passowr"
                />
            </div>
            <h1>GeeksforGeeks</h1>
            <h3>File Upload using React!</h3>
            <div>
                <input type="file" onChange={onFileChange} />
                <button
                    onClick={() =>
                        onFileUpload(name, email, password1, password2)
                    }
                >
                    Upload!
                </button>
            </div>
        </div>
    );
    // function register() {
    //     $.ajax({
    //         method: "POST",
    //         url: "/auth/register",
    //         data: {
    //             email: process.env.MIX_EMAIL,
    //             name: "leonlav77",
    //             password: "password",
    //             password_confirmation: "password",
    //         },
    //         dataType: "json",
    //         contentType: "application/x-www-form-urlencoded",
    //         success: (result) => {
    //             console.log(result);
    //             window.location.href = "/";
    //         },
    //         error: (error) => {
    //             console.log(error);
    //         },
    //     });
    // }
    // return (
    //     <div>
    //         <h1>Register Page</h1>
    //         <button
    //             onClick={() => {
    //                 register();
    //             }}
    //         >
    //             Register
    //         </button>
    //     </div>
    // );
};
