import { useState } from "react";
import { API_URL } from "../App";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (username, password) => {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL + "/user/signup", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        const json = await response.json();
        if (!response.ok) {
            setLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            setLoading(false);
            setError(null);

            // save the user token to localStorage
            localStorage.setItem("user", JSON.stringify(json));

            // update the auth context
            dispatch({ type: "LOGIN", payload: json });
        };
    };

    return { signup, loading, error };
};