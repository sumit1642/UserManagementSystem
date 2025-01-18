// src/redux/feature/UserFeatureSlice.js
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
	// `Store users as an object with unique emailId as keys - very important , learnt new thing`
	users: localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : {},
};

export const userFeatureSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (state, action) => {
			const newUser = action.payload;
			toast.dismiss();

			// Validation: Ensure all required fields are provided
			if (!newUser.FirstName.trim()) {
				toast.error("First Name cannot be empty.");
				return;
			}

			if (!newUser.LastName.trim()) {
				toast.error("Last Name cannot be empty.");
				return;
			}

			if (!newUser.EmailId.trim()) {
				toast.error("Email ID cannot be empty.");
				return;
			}

			if (!newUser.PhoneNumber.trim()) {
				toast.error("Phone number cannot be empty.");
				return;
			}

			if (!newUser.Address.trim()) {
				toast.error("Address cannot be empty.");
				return;
			}

			// Check for duplicates by Email ID or Phone Number
			const existingUser = Object.values(state.users).find(
				(user) =>
					user.EmailId.toLowerCase() === newUser.EmailId.toLowerCase() ||
					user.PhoneNumber === newUser.PhoneNumber,
			);

			if (existingUser) {
				toast.error("Data already exists. Please use new details.");
			} else {
				// Add the user if all validations pass
				const userKey = newUser.EmailId.toLowerCase(); // Use Email ID as the unique identifier
				state.users[userKey] = newUser;
				localStorage.setItem("users", JSON.stringify(state.users));
				toast.success("User added successfully!");
			}
		},

		updateUser: (state, action) => {
			const updatedUser = action.payload;
			const userKey = updatedUser.EmailId.toLowerCase();

			// Check if the user exists
			if (state.users[userKey]) {
				// Update the user
				state.users[userKey] = { ...state.users[userKey], ...updatedUser };
				localStorage.setItem("users", JSON.stringify(state.users));
				toast.success("User updated successfully");
			} else {
				toast.error("User not found");
			}
		},

		resetUserData: (state, action) => {
			const userEmail = action.payload.toLowerCase();

			// Check if the user exists and reset the address
			if (state.users[userEmail]) {
				state.users[userEmail].Address = "";
				localStorage.setItem("users", JSON.stringify(state.users));
				toast.success("User address reset successfully");
			} else {
				toast.error("User not found");
			}
		},

		deleteUser: (state, action) => {
			const userEmail = action.payload.toLowerCase(); // Convert email to lowercase

			// Check if the user exists
			if (state.users[userEmail]) {
				// Delete the user from the state
				/**
				 * This `delete` keyword is used to delte data from an object
				 */
				delete state.users[userEmail];

				// Save the updated users list to localStorage
				localStorage.setItem("users", JSON.stringify(state.users));

				// Show a success message
				toast.success("User deleted successfully");
			} else {
				// Show an error if the user doesn't exist
				toast.error("User not found");
			}
		},
	},
});

export const { addUser, updateUser, resetUserData, deleteUser } = userFeatureSlice.actions;
export default userFeatureSlice.reducer;
