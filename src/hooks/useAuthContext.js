import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export const useAuthContext = () => {
    const context = useContext(AuthContext);

    // throw an error if the hook is used outside the provided context
    if (!context) {
        throw Error("useAuthContext must be used inside AuthContextProvider");
    }

    return context;
};