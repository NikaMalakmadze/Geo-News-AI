import { configureStore } from "@reduxjs/toolkit";

import postDetailSlice from "./slices/postDetail";
import dashboardSlice from "./slices/dashboard";
import analyzeSlice from "./slices/analyze";
import postsSlice from "./slices/posts";

export const store = configureStore({
	reducer: {
		posts: postsSlice,
		postDetail: postDetailSlice,
		analyze: analyzeSlice,
		dashboard: dashboardSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDisptch = typeof store.dispatch;
