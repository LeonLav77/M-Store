import { useState } from "react";

export type InputValues = {
    username?: string;
    email: string;
    password: string;
    confirmPassword?: string;
};
export const useForm = (inputValues: InputValues) => {
    const [values, setValues] = useState(inputValues);
    return [
        values,
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, [e.target.name]: e.target.value }),
    ];
};
