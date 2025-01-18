// src/components/UpdateForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/feature/UserFeatureSlice";
import toast from "react-hot-toast";

export const UpdateForm = () => {
	const { id } = useParams(); // This will be the email ID from the URL
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Get users from Redux store
	const users = useSelector((state) => state.userData.users);

	const [formData, setFormData] = useState({
		FirstName: "",
		LastName: "",
		EmailId: "",
		PhoneNumber: "",
		Address: "",
	});

	// Load user data when component mounts
	useEffect(() => {
		if (id && users[id.toLowerCase()]) {
			setFormData(users[id.toLowerCase()]);
		} else {
			toast.error("User not found");
			navigate("/");
		}
	}, [id, users, navigate]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateForm = () => {
		if (!formData.FirstName.trim()) {
			toast.error("First Name cannot be empty");
			return false;
		}
		if (!formData.LastName.trim()) {
			toast.error("Last Name cannot be empty");
			return false;
		}
		if (!formData.EmailId.trim()) {
			toast.error("Email ID cannot be empty");
			return false;
		}
		if (!formData.PhoneNumber.trim()) {
			toast.error("Phone number cannot be empty");
			return false;
		}
		if (!formData.Address.trim()) {
			toast.error("Address cannot be empty");
			return false;
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			dispatch(updateUser(formData));
			navigate("/");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
			<h2 className="text-2xl font-bold mb-6 text-center">Update User</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">First Name</label>
					<input
						type="text"
						name="FirstName"
						value={formData.FirstName}
						onChange={handleInputChange}
						className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						placeholder="Enter first name"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Last Name</label>
					<input
						type="text"
						name="LastName"
						value={formData.LastName}
						onChange={handleInputChange}
						className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						placeholder="Enter last name"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Email ID</label>
					<input
						type="email"
						name="EmailId"
						value={formData.EmailId}
						onChange={handleInputChange}
						className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						placeholder="Enter email"
						readOnly // Email should not be editable as it's our unique identifier
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Phone Number</label>
					<input
						type="tel"
						name="PhoneNumber"
						value={formData.PhoneNumber}
						onChange={handleInputChange}
						className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						placeholder="Enter phone number"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Address</label>
					<textarea
						name="Address"
						value={formData.Address}
						onChange={handleInputChange}
						className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						placeholder="Enter address"
						rows="3"
					/>
				</div>
				<div className="flex gap-4">
					<button
						type="submit"
						className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
						Update User
					</button>
					<button
						type="button"
						onClick={() => navigate("/")}
						className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};
