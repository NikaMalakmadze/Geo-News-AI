import { LuHash, LuTag } from "react-icons/lu";

import useDashboardCtx from "../../../hooks/useDashboardCtx";
import VerticalBarChart from "../charts/VerticalBarChart";
import Collapsible from "../../elements/Collapsible";
import Frame from "../../elements/Frame";
import Card from "../../elements/Card";

function VerticalBarsSection() {
	const { statistics: data } = useDashboardCtx();
	if (!data) return;

	return (
		<Frame title="თემები">
			<Card className="h-fit bg-neutral-50">
				<Collapsible
					icon={LuTag}
					title="პოსტების ტეგები"
					description="სტატიის ტეგების გავრცელება"
				>
					<VerticalBarChart data={data.tagsCounts} labelTitle="ტეგი" />
				</Collapsible>
			</Card>
			<Card className="h-fit bg-neutral-50">
				<Collapsible
					icon={LuHash}
					title="პოსტების საკვანძო სიტყვები"
					description="სტატიის საკვანძო სიტყვების გავრცელება"
				>
					<VerticalBarChart
						data={data.keywordCount}
						labelTitle="საკვანძო სიტყვა"
					/>
				</Collapsible>
			</Card>
		</Frame>
	);
}

export default VerticalBarsSection;
