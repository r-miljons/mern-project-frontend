import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
	const { signup, loading, error } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();

        if (password !== repeatPassword) {
            setPasswordsMatch(false);
            return;
        } else if (password === repeatPassword) {
            setPasswordsMatch(true);
        }

		await signup(username, password);
	};

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3>Sign up</h3>
			<label>Username</label>
			<input
				type="text"
				onChange={(e) => setUsername(e.target.value)}
				value={username}
				autoComplete="new-username"
			/>
			<label>Password</label>
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				autoComplete="new-password"
			/>
			<label>Repeat password</label>
			<input
				type="password"
				onChange={(e) => setRepeatPassword(e.target.value)}
				value={repeatPassword}
				autoComplete="new-password-repeat"
			/>
			<button type="submit" disabled={loading}>
				Sign up
			</button>
            {!passwordsMatch && <div className="error">Passwords do not match</div>}
			{error && <div className="error">{error}</div>}
		</form>
	);
}
