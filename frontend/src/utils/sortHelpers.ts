import { keys } from "@mantine/core";

import type { ITablePost } from "../types/dashboard";

export function filterData(
	data: ITablePost[],
	search: string,
	sortBy: keyof ITablePost | null,
): ITablePost[] {
	const query = search.toLowerCase().trim();
	return data.filter(item =>
		keys(data[0]).some(key => {
			const propertyValue = item[key];

			if (typeof propertyValue === "string") {
				return propertyValue.toLowerCase().includes(query);
			}

			if (sortBy === "analyze") {
				return item[sortBy].sentiment.toLowerCase().includes(query);
			}

			return false;
		}),
	);
}

export function sortData(
	data: ITablePost[],
	sortBy: keyof ITablePost | null,
	search: string,
	reversed: boolean,
): ITablePost[] {
	if (!sortBy) return filterData(data, search, null);

	return filterData(
		[...data].sort((a, b) => {
			const aPropertyValue = a[sortBy];
			const bPropertyValue = b[sortBy];

			if (
				typeof aPropertyValue === "string" &&
				typeof bPropertyValue === "string"
			) {
				return reversed
					? aPropertyValue.localeCompare(bPropertyValue)
					: bPropertyValue.localeCompare(aPropertyValue);
			}

			if (sortBy === "analyze") {
				const aPropertyValue = a[sortBy];
				const bPropertyValue = b[sortBy];

				if (!aPropertyValue || !bPropertyValue) return 0;

				return reversed
					? aPropertyValue.sentiment.localeCompare(bPropertyValue.sentiment)
					: bPropertyValue.sentiment.localeCompare(aPropertyValue.sentiment);
			}

			return 0;
		}),
		search,
		sortBy,
	);
}
