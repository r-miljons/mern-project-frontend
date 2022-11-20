import { useAuthContext } from "./useAuthContext";
import { useMealsContext } from "./useMealsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    // destructure as something else using ":" ()
    const { dispatch: mealsDispatch } = useMealsContext();
    // in order to log out, we don't need to send a request to the server
    // simply updating the auth context and removing the token from localStorage will log us out
    // because when sending new requests to the server we will no longer have the token to send back
    // therefore we are logged out

    const logout = () => {
        // remove from storage
        localStorage.removeItem("user");

        // dispatch logout action
        dispatch({ type: "LOGOUT" });
        // also remove user meals from store, so that the next person to log in doesn't see them
        mealsDispatch({ type: "SET_USER_MEALS", payload: null });
    };
    
    return {logout};
};