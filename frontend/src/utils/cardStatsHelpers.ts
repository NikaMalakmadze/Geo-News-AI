import type {
	IStatsCardProps,
	TCardVisual,
} from "../components/dashboard/sections/StatsCard";
import type { IStatsResponse, TSentimentStatCount } from "../types/dashboard";
import { constructCardVisuals } from "../data/daschboard";

function getSentimentsCounts(sentiments: TSentimentStatCount[]): {
	totalSentiment: number;
	positiveCount: number;
	negativeCount: number;
	neutralCount: number;
	mixedCount: number;
} {
	const filterSentiments = (
		value: "negative" | "positive" | "mixed" | "neutral",
	): number =>
		sentiments
			.filter(stat => stat.value === value)
			.reduce((sum, stat) => (sum += stat.count), 0);

	const totalSentiment: number = sentiments.reduce(
		(sum, stat) => (sum += stat.count),
		0,
	);

	return {
		totalSentiment,
		positiveCount: filterSentiments("positive"),
		negativeCount: filterSentiments("negative"),
		neutralCount: filterSentiments("neutral"),
		mixedCount: filterSentiments("mixed"),
	};
}

function constructCardData(
	totalPosts: number,
	todayPostsCount: number,
	weekPostsCount: number,
	analyzedPostsCount: number,
	totalSentiment: number,
	positiveCount: number,
	negativeCount: number,
	neutralCount: number,
	mixedCount: number,
): string[] {
	const percent = (count: number, total: number) =>
		Math.round((count / total) * 100 * 100) / 100 || 0;

	return [
		String(totalPosts),
		String(todayPostsCount),
		String(weekPostsCount),
		`${percent(analyzedPostsCount, totalPosts).toFixed(2)}%`,
		`${percent(positiveCount, totalSentiment).toFixed(2)}%`,
		`${percent(negativeCount, totalSentiment).toFixed(2)}%`,
		`${percent(neutralCount, totalSentiment).toFixed(2)}%`,
		`${percent(mixedCount, totalSentiment).toFixed(2)}%`,
	];
}

export function getStatCards(data: IStatsResponse): IStatsCardProps[] {
	const {
		totalSentiment,
		positiveCount,
		negativeCount,
		neutralCount,
		mixedCount,
	} = getSentimentsCounts(data.sentimentCount);

	const cardsDatas: string[] = constructCardData(
		data.totalPosts,
		data.todayPostsCount,
		data.weekPostsCount,
		data.analyzesCount,
		totalSentiment,
		positiveCount,
		negativeCount,
		neutralCount,
		mixedCount,
	);

	const cardVisuals: TCardVisual[] = constructCardVisuals(
		`${data.analyzesCount} პოსტი`,
		`${positiveCount} პოსტი`,
		`${negativeCount} პოსტი`,
		`${neutralCount} პოსტი`,
		`${mixedCount} პოსტი`,
	);

	const statCards: IStatsCardProps[] = cardVisuals.map((visual, i) => ({
		cardVisual: visual,
		cardData: cardsDatas[i],
	}));

	return statCards;
}
