import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { IAnalyzeStatus } from "../../types/analyze";

export const fetchAnalyzeText = createAsyncThunk<
	IAnalyzeStatus,
	{ text: string }
>("analyze/fetchAnalyzeText", async ({ text }) => {
	const { data } = await axios.post<IAnalyzeStatus>(
		import.meta.env.VITE_ANALYZE_URL + "text",
		{ input_text: text },
	);
	return data;
});
