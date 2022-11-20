import React, { useState } from "react";
import { API_URL } from "../App";
import { useMealsContext } from "../hooks/useMealsContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function MealForm(props) {
	const { dispatch } = useMealsContext();
	const [title, setTitle] = useState("");
	const [calories, setCalories] = useState("");
	const [picture, setPicture] = useState("");
	const [error, setError] = useState(null);
	const [invalidFields, setinvalidFields] = useState([]);
	const { currentPage, setTotalPages } = props;

	const { user } = useAuthContext();

	const resetForm = () => {
		setTitle("");
		setCalories("");
		setPicture("");
		setError(null);
		setinvalidFields([]);
	};

	const getUserMeals = async () => {
		const response = await fetch(
			API_URL + "/user/meals/" + user.id + "?page=" + currentPage
		);
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "SET_USER_MEALS", payload: json.meals });
			setTotalPages(json.total_pages);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// we only want to post the meal if the user is logged in
		// otherwise this action is unauthorized
		// the api would not allow this anyways, but to prevent the unnecessary request we do this check here too
		if (!user) {
			setError("Unauthorized request, user is not logged in");
			return;
		}

		// prepare the data to be sent to the endpoint
		const meal = { title, calories, picture };

		// post request
		const response = await fetch(API_URL + "/meals", {
			method: "POST",
			body: JSON.stringify(meal),
			headers: {
				"Content-Type": "application/json",
				// since this is an action that requires authorization,
				// we send the auth token in the request headers, where the backend will verify it
				Authorization: `Bearer ${user.token}`,
			},
		});
		const json = await response.json();

		// if response ok, reset form, dispatch to store
		if (response.ok) {
			resetForm();
			dispatch({ type: "CREATE_USER_MEALS", payload: json });
			await getUserMeals();

			// handle errors
		} else if (!response.ok) {
			setError(json.error);
			setinvalidFields(json.invalidFields);
		}
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a new meal</h3>

			<label>Title*</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				className={invalidFields.includes("Title") ? "error" : ""}
			/>

			<label>Calories (kcal)*</label>
			<input
				type="number"
				onChange={(e) => setCalories(e.target.value)}
				value={calories}
				className={invalidFields.includes("Calories") ? "error" : ""}
			/>

			<label>Picture (url)</label>
			<input
				type="text"
				onChange={(e) => setPicture(e.target.value)}
				value={picture}
				className={invalidFields.includes("Picture") ? "error" : ""}
			/>
			<button type="submit">Add Meal</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
}
