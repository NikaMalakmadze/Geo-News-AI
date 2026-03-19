import React from "react";

import type { IAnalyze, ITablePost } from "../types/dashboard";
import type { TStatus } from "../redux/types";

export interface ITablePostsContextValue {
	data: ITablePost[];
	sortBy: keyof ITablePost | null;
	activePost: string | null;
	reverseSortDirection: boolean;
	currentPage: number;
	totalPosts: number;
	pageSize: number;
	search: string;
	postsStatus: TStatus;
	currentAnalyze: IAnalyze | null;
	editModalOpened: boolean;
	onEditModalSubmit: (analyze: IAnalyze) => void;
	closeEditModal: () => void;
	setSorting: (field: keyof ITablePost) => void;
	setActivePost: (slug: string | null) => void;
	debounceSearch: (value: string) => void;
	setSearch: (value: string) => void;
	openEditModal: ({
		analyze,
		slug,
	}: {
		analyze: IAnalyze;
		slug: string;
	}) => void;
}

const TablePostsContext = React.createContext<ITablePostsContextValue | null>(
	null,
);

export default TablePostsContext;
