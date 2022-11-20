import { useContext } from "react";
import { MealsContext } from "../context/MealsContext";


export const useMealsContext = () => {
    const context = useContext(MealsContext);

    // throw an error if the hook is used outside the provided context
    if (!context) {
        throw Error("useMealsContext must be used inside MealsContextProvider");
    }

    return context;
};