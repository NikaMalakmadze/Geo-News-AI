import React from "react";

import DashboardContext, {
	type IDashboardContextValue,
} from "../contexts/DashboardContext";
import type { TChartType } from "../components/dashboard/charts/ChartToggle";
import { fetchDashboardStats } from "../redux/thunks/dashboardStats";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getStatCards } from "../utils/cardStatsHelpers";
import type { TStatCount } from "../types/dashboard";
import { getAnalyzeCover } from "../utils/helpers";
import useAccessKeyCtx from "../hooks/useAccessKeyCtx";

function DashboardProvider({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) {
	const { key } = useAccessKeyCtx();

	const dispatch = useAppDispatch();
	const {
		statistics,
		statisticsStatus,
		postObjs,
		postsStatus,
		pageSize,
		totalPosts,
	} = useAppSelector(state => state.dashboard);
	const [chartType, setChartType] = React.useState<TChartType>("bar");

	React.useEffect(() => {
		if (statisticsStatus === "idle") {
			dispatch(fetchDashboardStats({ key }));
		}
	}, [key, statisticsStatus, dispatch]);

	const statCards = React.useMemo(
		() => (statistics ? getStatCards(statistics) : []),
		[statistics],
	);
	const analyzeCover = React.useMemo(
		() =>
			statistics
				? getAnalyzeCover(statistics.totalPosts, statistics.analyzesCount)
				: [],
		[statistics],
	);

	const setChartT = React.useCallback(
		(type: TChartType) => setChartType(type),
		[],
	);
	const getTotalCount = React.useCallback(
		(statsCount: TStatCount[]) =>
			statsCount.reduce((sum, stat) => (sum += stat.count), 0),
		[],
	);

	const value: IDashboardContextValue = {
		statistics,
		statisticsStatus,
		postsStatus,
		postObjs,
		pageSize,
		totalPosts,
		chartType,
		statCards,
		analyzeCover,
		setChartT,
		getTotalCount,
	};

	return (
		<DashboardContext.Provider value={value}>
			{children}
		</DashboardContext.Provider>
	);
}

export default DashboardProvider;
