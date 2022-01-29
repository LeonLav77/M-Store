import React, { useState, useEffect } from "react";
import "../../../css/components/Register.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Error as ErrorMessage } from "../Error";

export const Register = () => {
    const [error, setError] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [email, setEmail] = useState(process.env.MIX_EMAIL);
    const [name, setName] = useState("Leon");
    const [password1, setPassword1] = useState("password");
    const [password2, setPassword2] = useState("password");
    const [showFalseInfoMsg, setShowFalseInfoMsg] = useState(false);
    const navigate = useNavigate();
    const { register, setUser, user } = useAuth();
    const onFileChange = (event) => {
        setSelectedFile({ selectedFile: event.target.files[0] });
    };

    useEffect(() => {
        console.log(user);

        if (user) navigate("/home");
    }, []);
    return (
        <div className="main_register_container">
            {error ? (
                <ErrorMessage showError={error} />
            ) : (
                <div className="register_form_container">
                    <h1>Create Account</h1>
                    <div className="regiseter_form">
                        <h1>Name</h1>
                        <div className="wrap_input">
                            <input
                                className="form_input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="name"
                            />
                        </div>
                        <h1>Email</h1>
                        <div className="wrap_input">
                            <input
                                className="form_input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email"
                            />
                        </div>
                        <h1>pass</h1>
                        <div className="wrap_input">
                            <input
                                className="form_input"
                                type="password"
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                placeholder="passowrd"
                            />
                        </div>
                        <h1>con pass</h1>
                        <div className="wrap_input">
                            <input
                                className="form_input"
                                type="password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                placeholder="passowr"
                            />
                        </div>
                        <input type="file" onChange={onFileChange} />
                        {showFalseInfoMsg && (
                            <>
                                <h6
                                    style={{
                                        marginTop: 20,
                                        textAlign: "center",
                                        width: "90%",
                                    }}
                                >
                                    Email already exists or Password is
                                    incorrect!
                                </h6>
                                <h6
                                    style={{
                                        textAlign: "center",
                                        width: "90%",
                                    }}
                                >
                                    Try again...
                                </h6>
                            </>
                        )}
                    </div>
                    <button
                        className="register_submit_button"
                        onClick={() => {
                            const nil = async () => {
                                const reponse = await register();
                                console.log(reponse);
                                if (reponse.statusText == "Created") {
                                    setUser(true);
                                    //verify email
                                    // navigate("/home");
                                } else {
                                    setShowFalseInfoMsg(true);
                                }
                            };
                            nil();
                            // onFileUpload(name, email, password1, password2);
                            // register2();
                            //if succ redirect na "MAIL HAS BEENM SENT"-> more bilo ca samo ni loginina
                            //kad verifya u mailu ga vratis na products
                        }}
                    >
                        Register
                    </button>
                </div>
            )}
        </div>
    );
};
