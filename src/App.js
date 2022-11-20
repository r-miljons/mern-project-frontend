import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import { useAuthContext } from "./hooks/useAuthContext";

export const API_URL = "https://node-api-production.up.railway.app/api";

function App() {
	const { user } = useAuthContext();

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route
							path="/dashboard"
							element={ user ? <Dashboard /> : <Navigate to="/login" /> }
						></Route>
						<Route path="/login" element={ !user ? <Login /> : <Navigate to="/"/> }></Route>
						<Route path="/signup" element={ !user ? <Signup /> : <Navigate to="/"/> }></Route>
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
