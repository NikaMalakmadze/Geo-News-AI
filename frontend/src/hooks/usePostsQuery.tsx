import { useNavigate } from "react-router-dom";
import qs from "query-string";
import React from "react";

import {
	clearPosts,
	setCategory,
	setCurrentPage,
	setSearch,
} from "../redux/slices/posts";
import { fetchPostsCategories } from "../redux/thunks/postsCategoriesThunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchPosts } from "../redux/thunks/postsThunk";

function usePostsQuery(): void {
	const { categoriesStatus, currentCategory, currentPage, search, updated } =
		useAppSelector(state => state.posts);
	const didMountRef = React.useRef<boolean>(false);
	const isSearch = React.useRef<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (categoriesStatus === "idle") {
			dispatch(fetchPostsCategories());
		}
	}, [categoriesStatus, dispatch]);

	React.useEffect(() => {
		if (window.location.search) {
			const queryParams = qs.parse(window.location.search.substring(1));

			const search = queryParams.search ? String(queryParams.search) : "";
			const category = queryParams.category ? String(queryParams.category) : "";
			const page = Number(queryParams.page) || 1;

			dispatch(setSearch(search));
			dispatch(setCategory(category));
			dispatch(setCurrentPage(page));

			isSearch.current = true;
		}
	}, [dispatch]);

	React.useEffect(() => {
		if (!isSearch.current) {
			dispatch(
				fetchPosts({
					category: currentCategory,
					page: currentPage,
					search: search,
				}),
			);
		}
		isSearch.current = false;
	}, [search, currentCategory, currentPage, updated, dispatch]);

	React.useEffect(() => {
		if (didMountRef.current) {
			const newQuery = qs.stringify({
				search: search,
				category: currentCategory,
				page: currentPage,
			});

			navigate(`?${newQuery}`, { replace: true });
		} else {
			didMountRef.current = true;
		}
	}, [search, currentCategory, currentPage, navigate]);

	React.useEffect(() => {
		return () => {
			dispatch(clearPosts());
		};
	}, [dispatch]);
}

export default usePostsQuery;
