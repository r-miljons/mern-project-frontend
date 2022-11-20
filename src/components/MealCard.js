import React, { useState } from "react";
import { API_URL } from "../App";
import { useMealsContext } from "../hooks/useMealsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";

// date fns - formats the date like: 2 days ago etc...
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import EditMealForm from "./EditMealForm";

export default function MealCard({ meal, currentPage, setTotalPages }) {
	const [editingMeal, setEditingMeal] = useState(false);
	const [loading, setLoading] = useState(false);
	const { dispatch } = useMealsContext();
	const { user } = useAuthContext();
	const location = useLocation();

	const handleDelete = async () => {
		if (!user) return;

		setLoading(true);

		const response = await fetch(API_URL + "/meals/" + meal._id, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_USER_MEAL", payload: json });
			getUserMeals();
			setLoading(false);
			return;
		}
		setLoading(false);
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

	return (
		<>
			<div className="meal-details">
				<h4>{meal.title}</h4>
				<div className="img-wrapper">
					<img
						src={meal.picture}
						alt={meal.title}
						onError={(e) => {
							const backupImage =
								"https://kodi.tv/images/categories/picture-addons.webp";
							if (e.target.src !== backupImage) {
								e.target.src = backupImage;
							}
						}}
					/>
				</div>
				<p>
					<strong>Calories (kcal): </strong>
					{meal.calories}
				</p>
				<p>
					{/* formatDistance to now takes two arguments */}
					{/* 1. a Date object */}
					{/* 2. options object, without suffix it would say: "2 days", with it: "2 days ago" */}
					{formatDistanceToNow(new Date(meal.createdAt), { addSuffix: true })}
					{meal.createdAt !== meal.updatedAt && <em>   *edited</em>}
				</p>
				<p>
					by: <strong><em>{meal.user.username}</em></strong>
				</p>

				{/* only show actions if on the dashboard page */}
				{location.pathname === "/dashboard" && (
					<div className="actions">
						<span
							onClick={() => !loading && handleDelete()}
							className="material-symbols-outlined"
						>
							delete
						</span>
						<span
							className="material-symbols-outlined"
							onClick={() => !loading && setEditingMeal(true)}
						>
							edit
						</span>
					</div>
				)}
			</div>
			{editingMeal && (
				<EditMealForm setEditingMeal={setEditingMeal} meal={meal} />
			)}
		</>
	);
}
