import { useNavigate } from "react-router-dom";
import qs from "query-string";
import React from "react";

import {
	setTableCurrentPage,
	setTablePageSize,
	setTableSearch,
} from "../redux/slices/dashboard";
import { fetchDashboardPosts } from "../redux/thunks/dashboardPosts";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useAccessKeyCtx from "./useAccessKeyCtx";

function usePostsTableQuery() {
	const { key } = useAccessKeyCtx();

	const { currentPage, pageSize, postsSearch, updated } = useAppSelector(
		state => state.dashboard,
	);
	const didMountRef = React.useRef<boolean>(false);
	const isSearch = React.useRef<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (window.location.search) {
			const queryParams = qs.parse(window.location.search.substring(1));

			const search = queryParams.postsSearch
				? String(queryParams.postsSearch)
				: "";
			const pageSize = Number(queryParams.pageSize) || 6;
			const currentPage = Number(queryParams.currentPage) || 1;

			dispatch(setTableSearch(search));
			dispatch(setTablePageSize(pageSize));
			dispatch(setTableCurrentPage(currentPage));

			isSearch.current = true;
		}
	}, [dispatch]);

	React.useEffect(() => {
		if (!isSearch.current) {
			dispatch(
				fetchDashboardPosts({
					key,
					page: currentPage,
					pageSize: pageSize,
					search: postsSearch,
				}),
			);
		}
		isSearch.current = false;
	}, [key, pageSize, currentPage, postsSearch, updated, dispatch]);

	React.useEffect(() => {
		if (didMountRef.current) {
			const newQuery = qs.stringify({
				pageSize,
				currentPage,
				postsSearch,
			});

			navigate(`?${newQuery}`, { replace: true });
		} else {
			didMountRef.current = true;
		}
	}, [pageSize, currentPage, postsSearch, navigate]);
}

export default usePostsTableQuery;
