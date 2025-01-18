// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { FormUI } from "./components/FormUI";
import { UpdateForm } from "./components/UpdateForm";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
	return (
		<div className="relative h-screen w-screen bg-slate-950">
			<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
			<div className="relative z-10">
				<Toaster
					position="top-center"
					reverseOrder={false}
				/>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/create-user"
						element={<FormUI />}
					/>
					<Route
						path="/update-user/:id"
						element={<UpdateForm />}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
