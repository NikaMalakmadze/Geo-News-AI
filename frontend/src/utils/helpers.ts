import type { TCategoryStatCount } from "../types/dashboard";
import type { IPostDate } from "../types/post";

export function currentWeekRange(): [Date, Date] {
	const now = new Date();

	const weekday = (now.getDay() + 6) % 7;

	const start = new Date(now);
	start.setDate(now.getDate() - weekday);
	start.setHours(0, 0, 0, 0);

	const end = new Date(start);
	end.setDate(start.getDate() + 6);

	return [start, end];
}

export function getAnalyzeCover(
	totalPosts: number,
	analyzedPosts: number,
): TCategoryStatCount[] {
	return [
		{ value: "გაანალიზებული", count: analyzedPosts },
		{ value: "გაუანალიზებული", count: totalPosts - analyzedPosts },
	];
}

export function getStrDateTime(dateParts: IPostDate): string {
	return new Date(
		dateParts.year,
		dateParts.month - 1,
		dateParts.day,
		dateParts.hour,
		dateParts.minute,
	).toLocaleDateString("en-US", { dateStyle: "medium" });
}

export function arrToString(arr: string[]) {
	return arr.join(", ");
}
