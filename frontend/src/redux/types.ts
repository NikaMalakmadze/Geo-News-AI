import type { IPost, IPostDetails, IPostCategory } from "../types/post";
import type { IAnalyze, IStatsResponse, ITablePost } from "../types/dashboard";
import type { IAnalyzeResult } from "../types/analyze";

export type TStatus = "idle" | "pending" | "loaded" | "error";
export type TAnalyzeSource = "post" | "custom" | "idle";

export interface IPostDetailState {
	post: IPostDetails | null;
	status: TStatus;
	prevAnalyzeStatus: TStatus;
	prevAnalyze: IAnalyze | null;
}

export interface IPostsState {
	postObjs: IPost[];
	categoryObjs: IPostCategory[];
	postsStatus: TStatus;
	categoriesStatus: TStatus;
	totalItems: number;
	totalCategories: number;
	currentPage: number;
	currentCategory: string;
	search: string;
	pageSize: number;
	updated: boolean;
}

export interface IAnalyzeState {
	result: IAnalyzeResult | null;
	status: TStatus | "polling";
	source: TAnalyzeSource;
	taskId: string | null;
}

export interface IDashboardState {
	statistics: IStatsResponse | null;
	statisticsStatus: TStatus;
	postObjs: ITablePost[];
	postsStatus: TStatus;
	postsSearch: string;
	currentPage: number;
	totalPosts: number;
	pageSize: number;
	updated: boolean;
}
