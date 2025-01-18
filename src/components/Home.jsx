// src/components/Home.jsx
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/feature/UserFeatureSlice";
import { Link } from "react-router-dom";

export const Home = () => {
	// Fix the selector to access users through userData
	const users = useSelector((state) => state.userData.users);
	const dispatch = useDispatch();

	const handleDelete = (email) => {
		dispatch(deleteUser(email));
	};

	return (
		<div className="max-w-7xl mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-white">Users List</h2>
				<Link
					to="/create-user"
					className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
					Create User
				</Link>
			</div>
			<div className="overflow-x-auto bg-white rounded-lg shadow-md">
				<table className="w-full table-auto">
					<thead className="bg-gray-800 text-white">
						<tr>
							<th className="px-4 py-2 text-left">First Name</th>
							<th className="px-4 py-2 text-left">Last Name</th>
							<th className="px-4 py-2 text-left">Email</th>
							<th className="px-4 py-2 text-left">Phone</th>
							<th className="px-4 py-2 text-left">Address</th>
							<th className="px-4 py-2 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{!users || Object.keys(users).length === 0 ? (
							<tr>
								<td
									colSpan="6"
									className="text-center py-4 text-gray-500">
									No users found.
								</td>
							</tr>
						) : (
							Object.entries(users).map(([email, user]) => (
								<tr
									key={email}
									className="border-t">
									<td className="px-4 py-2">{user.FirstName}</td>
									<td className="px-4 py-2">{user.LastName}</td>
									<td className="px-4 py-2">{user.EmailId}</td>
									<td className="px-4 py-2">{user.PhoneNumber}</td>
									<td className="px-4 py-2">{user.Address}</td>
									<td className="px-4 py-2 text-center">
										<Link
											to={`/update-user/${email}`}
											className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 mr-2">
											Edit
										</Link>
										<button
											onClick={() => handleDelete(email)}
											className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600">
											Delete
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
