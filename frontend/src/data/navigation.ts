import { LuChartColumn, LuNewspaper, LuSparkle } from "react-icons/lu";
import type { IconType } from "react-icons";

import { RoutePaths } from "../routes/routeTypes";

export type TNavItem = {
	url: string;
	title: string;
	icon: IconType;
};

export const navItems: TNavItem[] = [
	{ url: RoutePaths.NEWS, title: "ამბები", icon: LuNewspaper },
	{ url: RoutePaths.ANALYZE, title: "AI ანალიზი", icon: LuSparkle },
	{ url: RoutePaths.DASHBOARD, title: "სტატისტიკა", icon: LuChartColumn },
];
