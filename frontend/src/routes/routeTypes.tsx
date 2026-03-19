export const RoutePaths = {
	NEWS: "/",
	ANALYZE: "/analyze",
	DASHBOARD: "/dashboard",
	NEWS_DETAILS: "/news/:slug",
	NOT_FOUND: "/not-found",
} as const;

export type RoutePath = (typeof RoutePaths)[keyof typeof RoutePaths];
