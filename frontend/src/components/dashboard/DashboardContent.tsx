import useDashboardCtx from "../../hooks/useDashboardCtx";
import VerticalBarsSection from "./sections/VerticalBarsSection";
import PostsByDaysSection from "./sections/PostsByDaysSection";
import StatCardsSection from "./sections/StatCardsSection";
import PieChartsSection from "./sections/PieChartsSection";
import EntitiesSection from "./sections/EntitiesSection";
import PostsTableSection from "./sections/PostsTableSection";

function DashboardContent() {
	const { statisticsStatus: status } = useDashboardCtx();

	let pageContent = null;

	switch (status) {
		case "loaded": {
			pageContent = (
				<>
					<StatCardsSection />
					<PostsByDaysSection />
					<PieChartsSection />
					<VerticalBarsSection />
					<EntitiesSection />
					<PostsTableSection />
				</>
			);
			break;
		}
		case "error": {
			pageContent = <p>წარმოიქმნა შეცდომა...</p>;
			break;
		}
		case "idle":
		case "pending": {
			pageContent = <p>იტრვირთება...</p>;
			break;
		}
	}

	return <div className="max-w-7xl mx-auto px-6 py-8">{pageContent}</div>;
}

export default DashboardContent;
