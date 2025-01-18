// src/components/FormUI.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/feature/UserFeatureSlice";

export const FormUI = () => {
	const [formData, setFormData] = useState({
		FirstName: "",
		LastName: "",
		EmailId: "",
		PhoneNumber: "",
		Address: "",
	});

	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");

		if (
			!formData.FirstName ||
			!formData.LastName ||
			!formData.EmailId ||
			!formData.PhoneNumber ||
			!formData.Address
		) {
			setError("Please fill out all fields.");
			return;
		}

		dispatch(addUser(formData));
		navigate("/");
	};

	return (
		<div className="flex items-center justify-center h-[calc(100vh-64px)]">
			<div className="w-full max-w-md p-8 rounded-xl backdrop-blur-sm bg-slate-900/30 border border-slate-800/50">
				<h2 className="text-3xl font-bold mb-8 text-center text-slate-200">Create User</h2>
				{error && (
					<p className="text-red-400 text-center mb-6 bg-red-900/30 py-2 rounded">{error}</p>
				)}
				<form
					onSubmit={handleSubmit}
					className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">
							First Name
						</label>
						<input
							type="text"
							name="FirstName"
							value={formData.FirstName}
							onChange={handleInputChange}
							className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-200 placeholder-slate-500"
							placeholder="Enter first name"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
						<input
							type="text"
							name="LastName"
							value={formData.LastName}
							onChange={handleInputChange}
							className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-200 placeholder-slate-500"
							placeholder="Enter last name"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">Email ID</label>
						<input
							type="email"
							name="EmailId"
							value={formData.EmailId}
							onChange={handleInputChange}
							className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-200 placeholder-slate-500"
							placeholder="Enter email"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">
							Phone Number
						</label>
						<input
							type="tel"
							name="PhoneNumber"
							value={formData.PhoneNumber}
							onChange={handleInputChange}
							className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-200 placeholder-slate-500"
							placeholder="Enter phone number"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">Address</label>
						<textarea
							name="Address"
							value={formData.Address}
							onChange={handleInputChange}
							className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-200 placeholder-slate-500 min-h-24"
							placeholder="Enter address"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full py-3 px-4 bg-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-600 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:outline-none transition-colors duration-200">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
