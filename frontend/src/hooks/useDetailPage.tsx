import { useNavigate, useParams } from "react-router-dom";
import React from "react";

import { clearAnalyze, setAnalyzeSource } from "../redux/slices/analyze";
import { fetchPostDetail } from "../redux/thunks/postDetailThunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearPostDetail } from "../redux/slices/postDetail";
import { RoutePaths } from "../routes/routeTypes";
import type { IPostDetails } from "../types/post";
import type { TStatus } from "../redux/types";

function useDetailPage(): { post: IPostDetails | null; status: TStatus } {
	const { post, status } = useAppSelector(state => state.postDetail);
	const { slug } = useParams<{ slug: string }>();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!slug) return;

		dispatch(fetchPostDetail({ slug }));

		return () => {
			dispatch(clearPostDetail());
			dispatch(clearAnalyze());
		};
	}, [slug, dispatch]);

	React.useEffect(() => {
		if (status === "error" && !post)
			navigate(RoutePaths.NOT_FOUND, { replace: true });
		if (status === "loaded") dispatch(setAnalyzeSource("post"));
	}, [status, post, navigate, dispatch]);

	return { post, status };
}

export default useDetailPage;
