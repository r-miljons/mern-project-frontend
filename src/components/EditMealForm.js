import React, { useState } from "react";
import { API_URL } from "../App";
import { useMealsContext } from "../hooks/useMealsContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function EditMealForm({ meal, setEditingMeal }) {
	const { dispatch } = useMealsContext();
	const [title, setTitle] = useState(meal.title);
	const [calories, setCalories] = useState(meal.calories);
	const [picture, setPicture] = useState(meal.picture);
	const [error, setError] = useState(null);
	const [invalidFields, setinvalidFields] = useState([]);

	const { user } = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// we only want to post the meal if the user is logged in
		// otherwise this action is unauthorized
		if (!user) {
			setError("Unauthorized request, user is not logged in");
			return;
		}

		// prepare the data to be sent to the endpoint
		const updatedMeal = { title, calories, picture };

		// patch request
		const response = await fetch(API_URL + "/meals/" + meal._id, {
			method: "PATCH",
			body: JSON.stringify(updatedMeal),
			headers: {
				"Content-Type": "application/json",
				// since this is an action that requires authorization,
				// we send the auth token in the request headers, where the backend will verify it
				Authorization: `Bearer ${user.token}`,
			},
		});
		const json = await response.json();

		// if response ok, dispatch changes to store
		if (response.ok) {
			dispatch({
				type: "UPDATE_USER_MEAL",
				payload: { ...meal, ...updatedMeal },
			});

			// ..and close the edit module
			setEditingMeal(false);

			// handle errors
		} else if (!response.ok) {
			setError(json.error);
			setinvalidFields(json.invalidFields);
		}
	};

	return (
		<div className="dark-overlay">
			<form className="edit-meal" onSubmit={handleSubmit}>
				<h3>Edit</h3>

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
				<div className="button-wrapper">
					<button type="submit">Save Changes</button>
					<button onClick={() => setEditingMeal(false)} className="cancel">
						Cancel
					</button>
				</div>
				{error && <div className="error">{error}</div>}
			</form>
		</div>
	);
}
