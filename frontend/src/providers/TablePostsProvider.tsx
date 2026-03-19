import { useDisclosure } from "@mantine/hooks";
import { debounce } from "ts-debounce";
import React from "react";

import TablePostsContext, {
	type ITablePostsContextValue,
} from "../contexts/TablePostsContext";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import type { IAnalyze, ITablePost } from "../types/dashboard";
import { changeAnalyze } from "../redux/thunks/changeAnalyze";
import { setTableSearch } from "../redux/slices/dashboard";
import { sortData } from "../utils/sortHelpers";
import useAccessKeyCtx from "../hooks/useAccessKeyCtx";

function TablePostsProvider({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) {
	const { key } = useAccessKeyCtx();

	const { postObjs, currentPage, pageSize, totalPosts, postsStatus } =
		useAppSelector(state => state.dashboard);
	const dispatch = useAppDispatch();

	const [editModalOpened, { open, close }] = useDisclosure(false);

	const [currentAnalyze, setCurrentAnalyze] = React.useState<IAnalyze | null>(
		null,
	);
	const [currentSlug, setCurrentSlug] = React.useState<string>();
	const [activePost, setActivePost] = React.useState<string | null>(null);
	const [sortBy, setSortBy] = React.useState<keyof ITablePost | null>(null);
	const [search, setSearch] = React.useState<string>("");
	const [reverseSortDirection, setReverseSortDirection] =
		React.useState<boolean>(false);

	const onEditModalSubmit = React.useCallback(
		(analyze: IAnalyze) => {
			if (!currentSlug) return;

			dispatch(changeAnalyze({ key, analyze, slug: currentSlug }));
			setCurrentAnalyze(null);
			setCurrentSlug("");
			close();
		},
		[key, currentSlug, dispatch, close],
	);

	const openEditModal = React.useCallback(
		({ analyze, slug }: { analyze: IAnalyze; slug: string }) => {
			setCurrentAnalyze(analyze);
			setCurrentSlug(slug);
			open();
		},
		[open],
	);

	const closeEditModal = React.useCallback(() => {
		setCurrentAnalyze(null);
		close();
	}, [close]);

	const setSorting = React.useCallback(
		(field: keyof ITablePost) => {
			const reversed = field === sortBy ? !reverseSortDirection : false;

			setSortBy(field);
			setReverseSortDirection(reversed);
		},
		[sortBy, reverseSortDirection],
	);

	const data = React.useMemo(() => {
		if (!sortBy) return postObjs;

		return sortData(postObjs, sortBy, search, reverseSortDirection);
	}, [postObjs, sortBy, search, reverseSortDirection]);

	const debounceSearch = React.useMemo(
		() =>
			debounce((value: string) => {
				dispatch(setTableSearch(value));
				localStorage.setItem("tableSearchValue", value);
			}, 1000),
		[dispatch],
	);

	React.useEffect(() => {
		const value = localStorage.getItem("tableSearchValue") || "";
		setSearch(value);
		dispatch(setTableSearch(value));
	}, [dispatch]);

	React.useEffect(() => {
		return () => debounceSearch.cancel();
	}, [debounceSearch]);

	const value: ITablePostsContextValue = {
		data,
		activePost,
		search,
		sortBy,
		debounceSearch,
		reverseSortDirection,
		currentPage,
		pageSize,
		totalPosts,
		postsStatus,
		currentAnalyze,
		editModalOpened,
		onEditModalSubmit,
		openEditModal,
		closeEditModal,
		setActivePost: (slug: string | null) => setActivePost(slug),
		setSearch: (value: string) => setSearch(value),
		setSorting,
	};

	return (
		<TablePostsContext.Provider value={value}>
			{children}
		</TablePostsContext.Provider>
	);
}

export default TablePostsProvider;
