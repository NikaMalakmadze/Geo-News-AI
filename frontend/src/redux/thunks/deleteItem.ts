import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteItem = createAsyncThunk<
	string,
	{ key: string; slug: string; type: "post" | "analyze" },
	{ rejectValue: null }
>("dashboard/deleteItem", async ({ key, slug, type }, thunkAPI) => {
	try {
		const url: string =
			type === "post"
				? `${import.meta.env.VITE_POST_DELETE_URL}${slug}/`
				: `${import.meta.env.VITE_ANALYZE_DELETE_URL}${slug}/`;

		await axios.delete(url, { headers: { "X-Admin-Key": key } });
		return slug;
	} catch {
		return thunkAPI.rejectWithValue(null);
	}
});
