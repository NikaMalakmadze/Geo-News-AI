import { sentimentGeo } from "../data/daschboard";
import type { TSentiment } from "./dashboard";

export const isTSentiment = (value: string): value is TSentiment => {
	return value in sentimentGeo;
};

export function isNotNull<T>(value: T | null): value is T {
	return value !== null;
}

export function isInterface<T>(value: any): value is T {
	if (typeof value !== "object") return false;

	let isType: boolean = true;

	Object.keys(value).forEach(k => {
		if (value[k] === undefined) isType = false;
	});

	return isType;
}
