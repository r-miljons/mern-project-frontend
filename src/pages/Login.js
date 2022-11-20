import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const { login, loading, error } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

        login(username, password);
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h3>Log in</h3>
			<label>Username</label>
			<input
				type="text"
				onChange={(e) => setUsername(e.target.value)}
				value={username}
                autoComplete="current-username"
			/>
			<label>Password</label>
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				autoComplete="current-password"
			/>
			<button type="submit" disabled={loading}>Log in</button>
            {error && <div className="error">{error}</div>}
		</form>
	);
}
