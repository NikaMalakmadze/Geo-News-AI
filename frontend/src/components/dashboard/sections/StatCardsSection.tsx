import useDashboardCtx from "../../../hooks/useDashboardCtx";
import StatsCard from "./StatsCard";

function StatCardsSection() {
	const { statCards } = useDashboardCtx();

	return (
		<div className="w-full pb-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{statCards.map((statCard, i) => (
				<StatsCard key={`stat_card_${i}`} {...statCard} />
			))}
		</div>
	);
}

export default StatCardsSection;
