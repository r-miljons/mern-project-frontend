import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/dashboard");
	};

	return (
		<header>
			<div className="container">
				<Link to="/">
					<h1>MealHub</h1>
				</Link>
				<nav>
					{user && (
						<div className="nav-actions">
							<span className="username">{user.username}</span>
							<button onClick={handleClick}>My Meals</button>
						</div>
					)}
					{!user && (
						<div className="nav-actions">
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}
