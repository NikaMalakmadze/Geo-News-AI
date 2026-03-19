interface ISentimentDistribution {
	mixed: number;
	neutral: number;
	positive: number;
	negative: number;
}

export interface ISentiment {
	label: string;
	confidence: number;
	distribution: ISentimentDistribution;
}

export interface ISummary {
	summaryText: string;
	organizations: string[];
	countries: string[];
	persons: string[];
	cities: string[];
}

export interface IAnalyzeStatus {
	message: string;
	taskId?: string;
}

export interface IAnalyzeResult {
	category: string;
	keywords: string[];
	sentiment: ISentiment;
	summary: ISummary;
}

export interface IAnalyzeResultResponse {
	result: IAnalyzeResult;
	response: IAnalyzeStatus;
}
