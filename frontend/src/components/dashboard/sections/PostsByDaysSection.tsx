import { LuChartColumn } from "react-icons/lu";

import useDashboardCtx from "../../../hooks/useDashboardCtx";
import PostByDaysChart from "../charts/PostByDaysChart";
import ChartToggle from "../charts/ChartToggle";
import Card from "../../elements/Card";

function PostsByDaysSection() {
	const { statistics: data, chartType, setChartT } = useDashboardCtx();
	if (!data) return;

	return (
		<div className="py-2">
			<Card>
				<div className="flex justify-between items-center gap-4 max-sm:flex-col max-sm:items-start">
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2 text-lg">
							<LuChartColumn />
							<h3 className="font-firago font-semibold">
								პოსტები დროთა განმავლობაში
							</h3>
						</div>
						<p className="text-neutral-500 text-sm">
							ბოლო ორი კვირის სტატისტიკა
						</p>
					</div>
					<ChartToggle value={chartType} onChange={value => setChartT(value)} />
				</div>
				<PostByDaysChart chartType={chartType} postsByDays={data.postsByDays} />
			</Card>
		</div>
	);
}

export default PostsByDaysSection;
