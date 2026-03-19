import type { IPost } from "./post";

export type TSentiment = "negative" | "positive" | "mixed" | "neutral";
export type TCategory =
	| "შოუბიზნესი"
	| "კონფლიქტები"
	| "საზოგადოება"
	| "ეკონომიკა"
	| "მეცნიერება"
	| "სამხედრო"
	| "მსოფლიო"
	| "სამართალი"
	| "სპორტი"
	| "გაანალიზებული"
	| "გაუანალიზებული";

export interface TStatCount {
	value: string;
	count: number;
}

export interface TSentimentStatCount extends TStatCount {
	value: TSentiment;
}

export interface TCategoryStatCount extends TStatCount {
	value: TCategory;
}

export type PostsByDays = {
	day: string;
	count: number;
};

export interface IAnalyze {
	summary: string;
	sentiment: string;
	predictedCategory: string;
	keywords: string[];
	organizations: string[];
	persons: string[];
	countries: string[];
	cities: string[];
}

export interface IAnalyzeFormLists {
	keywords: string;
	organizations: string;
	persons: string;
	countries: string;
	cities: string;
}

export interface IEntitiesCount {
	persons: TStatCount[];
	organizations: TStatCount[];
	cities: TStatCount[];
	countries: TStatCount[];
}

export interface IStatsResponse {
	totalPosts: number;
	analyzesCount: number;
	weekPostsCount: number;
	todayPostsCount: number;
	postsByDays: PostsByDays[];
	keywordCount: TStatCount[];
	tagsCounts: TStatCount[];
	categoryCount: TCategoryStatCount[];
	predictedCategoryCount: TCategoryStatCount[];
	sentimentCount: TSentimentStatCount[];
	entitiesCount: IEntitiesCount;
}

export interface ITablePost extends IPost {
	id: number;
	created_at: string;
	analyze: IAnalyze;
}

export interface ITablePostsResponse {
	totalItems: number;
	pageSize: number;
	results: ITablePost[];
}

export interface ISelectSentimentOption {
	value: TSentiment;
	label: string;
}

export interface ISelectCategorytOption {
	value: TCategory;
	label: string;
}
