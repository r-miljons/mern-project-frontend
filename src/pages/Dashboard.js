import React, { useEffect, useState } from "react";
import { API_URL } from "../App";
import MealCard from "../components/MealCard";
import MealForm from "../components/MealForm";
import Pagination from "../components/Pagination";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMealsContext } from "../hooks/useMealsContext";

export default function Dashboard() {
	const { user_meals, dispatch } = useMealsContext();
	const { user } = useAuthContext();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				API_URL + "/user/meals/" + user.id + "?page=" + currentPage
			);
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_USER_MEALS", payload: json.meals });
				setTotalPages(json.total_pages);
			}
		};

		fetchMeals();
	}, [dispatch, user.id, currentPage]);

	return (
		<>
			<h2>Manage your meals</h2>
			<div className="dashboard">
				<div className="meals">
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPages={totalPages}
					/>
					{user_meals &&
						user_meals.map((meal) => (
							<MealCard
								key={meal._id}
								meal={meal}
								currentPage={currentPage}
								setTotalPages={setTotalPages}
							/>
						))}
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPages={totalPages}
					/>
				</div>
				<MealForm currentPage={currentPage} setTotalPages={setTotalPages} />
			</div>
		</>
	);
}
