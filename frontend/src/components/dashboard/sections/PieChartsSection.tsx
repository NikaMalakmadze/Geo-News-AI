import { LuBrain, LuChartPie, LuDrama, LuShapes } from "react-icons/lu";

import { categoryColors, sentimentColors } from "../../../data/daschboard";
import type { TCategory, TSentiment } from "../../../types/dashboard";
import useDashboardCtx from "../../../hooks/useDashboardCtx";
import CountsPieChart from "../charts/CountsPieChart";
import Collapsible from "../../elements/Collapsible";
import Card from "../../elements/Card";

function PieChartsSection() {
	const { statistics: data, analyzeCover, getTotalCount } = useDashboardCtx();
	if (!data) return;

	return (
		<Card className="mt-4 mb-2">
			<Collapsible
				title="წრიული დიაგრამები"
				description="სენტიმენტისა და კატეგორიების გავრცელების ვიზუალიზაცია"
				icon={LuChartPie}
			>
				<div className="py-2 grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card>
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2 text-lg">
								<LuDrama />
								<h3 className="font-firago font-semibold">პოსტების განწყობა</h3>
							</div>
							<p className="text-neutral-500 text-sm">
								სტატიის განწყობების{" "}
								<span className="font-bold">
									({getTotalCount(data.sentimentCount)})
								</span>{" "}
								გავრცელება
							</p>
						</div>
						<CountsPieChart<TSentiment>
							data={data.sentimentCount}
							fillFunction={entry => sentimentColors[entry.value]}
						/>
					</Card>
					<Card>
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2 text-lg">
								<LuShapes />
								<h3 className="font-firago font-semibold">
									პოსტების კატეგორიები
								</h3>
							</div>
							<p className="text-neutral-500 text-sm">
								სტატიის კატეგორიების{" "}
								<span className="font-bold">({data.totalPosts})</span>{" "}
								გავრცელება
							</p>
						</div>
						<CountsPieChart<TCategory>
							data={data.categoryCount}
							fillFunction={entry => categoryColors[entry.value]}
						/>
					</Card>
				</div>
				<div className="py-2">
					<Card>
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2 text-lg">
								<LuBrain />
								<h3 className="font-firago font-semibold">
									გაანალიზებული პოსტების კატეგორიები
								</h3>
							</div>
							<p className="text-neutral-500 text-sm">
								გაანალიზებული სტატიის კატეგორიების გავრცელება
							</p>
						</div>
						<CountsPieChart<TCategory>
							data={data.predictedCategoryCount}
							secondPieData={analyzeCover}
							fillFunction={entry => categoryColors[entry.value]}
						/>
					</Card>
				</div>
			</Collapsible>
		</Card>
	);
}

export default PieChartsSection;
