import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
	const { user } = useAuthContext();
	const navigate = useNavigate();
    const { logout } = useLogout();

	const handleClick = () => {
        logout();
		navigate("/");
	};

	return (
		<footer>
			<div className="container">
				<nav>
					{user && (
						<div>
							<button onClick={handleClick}>Log out</button>
						</div>
					)}
				</nav>
			</div>
		</footer>
	);
}
