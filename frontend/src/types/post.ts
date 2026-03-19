export interface IPostDate {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
}

interface IPostSource {
	category_url: string;
	site_url: string;
	site_name: string;
	post_url: string;
}

export interface IPost {
	slug: string;
	title: string;
	content: string;
	category: string;
	date_parts: IPostDate;
	published_at: string;
	source: IPostSource;
	tags: string[];
}

export interface IPostDetails extends IPost {
	analyze: {
		updatedAt: string;
	} | null;
}

export interface IPostResponse {
	results: IPost[];
	totalItems: number;
	pageSize: number;
}

export interface IPostCategory {
	label: string;
	value: string;
}

export interface IPostCategoriesResponse {
	categories: IPostCategory[];
	categoriesCount: number;
}
