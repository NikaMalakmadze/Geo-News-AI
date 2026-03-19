import React from "react";

import type {
	IStatsResponse,
	ITablePost,
	TCategoryStatCount,
	TStatCount,
} from "../types/dashboard";
import type { IStatsCardProps } from "../components/dashboard/sections/StatsCard";
import type { TChartType } from "../components/dashboard/charts/ChartToggle";
import type { TStatus } from "../redux/types";

export interface IDashboardContextValue {
	statistics: IStatsResponse | null;
	statisticsStatus: TStatus;
	postObjs: ITablePost[];
	postsStatus: TStatus;
	totalPosts: number;
	pageSize: number;
	chartType: TChartType;
	statCards: IStatsCardProps[];
	analyzeCover: TCategoryStatCount[];
	setChartT: (type: TChartType) => void;
	getTotalCount: (statsCount: TStatCount[]) => number;
}

const DashboardContext = React.createContext<IDashboardContextValue | null>(
	null,
);

export default DashboardContext;
