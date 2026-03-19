import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { IStatsResponse } from "../../types/dashboard";

export const fetchDashboardStats = createAsyncThunk<
	IStatsResponse,
	{ key: string },
	{ rejectValue: null }
>("dashboard/fetchDashboardStats", async ({ key }, thunkAPI) => {
	try {
		const { data } = await axios.get<IStatsResponse>(
			import.meta.env.VITE_STATS_URL,
			{ headers: { "X-Admin-Key": key } },
		);
		return data;
	} catch {
		return thunkAPI.rejectWithValue(null);
	}
});
