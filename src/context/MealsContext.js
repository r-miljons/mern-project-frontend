import { createContext, useReducer } from "react";

export const MealsContext = createContext();

export const mealsReducer = (state, action) => {
    switch (action.type) {
        case "SET_MEALS": 
            return {
                ...state,
                meals: action.payload
            };
        case "SET_USER_MEALS": 
            return {
                ...state,
                user_meals: action.payload
            };
        case "CREATE_USER_MEALS":
            return {
                ...state,
                user_meals: [action.payload, ...state.user_meals]
            };
        case "DELETE_USER_MEAL":
            return {
                ...state,
                user_meals: state.user_meals.filter(meal => meal._id !== action.payload._id)
            };
        case "UPDATE_USER_MEAL":
            return {
                ...state,
                user_meals: state.user_meals.map(meal => {
                    if (meal._id === action.payload._id) {
                        return meal = {...action.payload};
                    } else {
                        return meal;
                    }
                })
            };
        default:
            return state;
    }
};

export const MealsContextProvider = ({ children }) => {
    // we pass two values to the useReducer hook
    // 1. a reducer function name
    // 2. initial value for the state
    const [ state, dispatch ] = useReducer(mealsReducer, {
        meals: null,
        user_meals: null,
    });

    return (
                                    //by spreading the state, we can access meals using state.meals
        <MealsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </MealsContext.Provider>
    );
};