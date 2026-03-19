import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { IAnalyzeResultResponse } from "../../types/analyze";

export const fetchAnalyzeRes = createAsyncThunk<
	IAnalyzeResultResponse,
	{ taskId: string },
	{ rejectValue: { type: string } }
>("analyze/fetchAnalyzeRes", async ({ taskId }, { rejectWithValue }) => {
	try {
		const { data } = await axios.get<IAnalyzeResultResponse>(
			import.meta.env.VITE_ANALYZE_RES_URL + taskId,
		);
		return data;
	} catch (err: any) {
		if (err.response?.status === 404)
			return rejectWithValue({ type: "not_found" });

		return rejectWithValue({ type: "failed" });
	}
});
