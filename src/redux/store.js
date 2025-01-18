// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./feature/UserFeatureSlice";

export const store = configureStore({
	reducer: {
		userData: userReducer,
	},
});
