import React from "react";
import { Register } from "../components/auth/Register";

export const RegisterPage = () => {
    return <Register />;
    // const [selectedFile, setSelectedFile] = useState(null);
    // const onFileChange = (event) => {
    //     setSelectedFile({ selectedFile: event.target.files[0] });
    // };
    // const Register = (formData) =>
    //     axios({
    //         method: "post",
    //         url: "/auth/register",
    //         data: formData,
    //     })
    //         .then((res) => console.log(res))
    //         .catch((err) => console.log(err));

    // const onFileUpload = () => {
    //     const formData = new FormData();
    //     formData.append("myFile", selectedFile, selectedFile.name);
    //     formData.append("email", process.env.MIX_EMAIL);
    //     formData.append("password", "password");
    //     formData.append("password_confirmation", "password");
    //     formData.append("name", "Leon");
    //     console.log(formData);
    //     Register(formData);
    // };
    // const fileData = () => {
    //     if (selectedFile) {
    //         return (
    //             <div>
    //                 <h2>File Details:</h2>

    //                 <p>File Name: {selectedFile.name}</p>

    //                 <p>File Type: {selectedFile.type}</p>

    //                 <p>
    //                     Last Modified:{" "}
    //                     {selectedFile.lastModifiedDate.toDateString()}
    //                 </p>
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div>
    //                 <br />
    //                 <h4>Choose before Pressing the Upload button</h4>
    //             </div>
    //         );
    //     }
    // };

    // return (
    //     <div>
    //         <div>
    //             <h1>Name</h1>
    //             <input type="text" value="TIgar" />
    //             <h1>Email</h1>
    //             <input type="email" value={process.env.MIX_EMAIL} />
    //             <h1>pass</h1>
    //             <input type="password" value="password" />
    //             <h1>con pass</h1>
    //             <input type="password" value="password" />
    //             <button type="submit">Submit</button>
    //         </div>
    //         <h1>GeeksforGeeks</h1>
    //         <h3>File Upload using React!</h3>
    //         <div>
    //             <input type="file" onChange={onFileChange} />
    //             <button onClick={onFileUpload}>Upload!</button>
    //         </div>
    //         {fileData()}
    //     </div>
    // );
};
