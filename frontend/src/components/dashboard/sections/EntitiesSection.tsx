import { LuGlobe, LuIdCard, LuMapPin, LuUsers } from "react-icons/lu";

import useDashboardCtx from "../../../hooks/useDashboardCtx";
import VerticalBarChart from "../charts/VerticalBarChart";
import Collapsible from "../../elements/Collapsible";
import Frame from "../../elements/Frame";
import Card from "../../elements/Card";

function EntitiesSection() {
	const { statistics: data } = useDashboardCtx();
	if (!data) return;

	return (
		<Frame title="სუბიექტები">
			<Card className="h-fit bg-neutral-50">
				<Collapsible
					icon={LuIdCard}
					title="სტატიებში მოხსენიებული პირები"
					description="პოსტებში ყველაზე ხშირად ნახსენები ადამიანები"
				>
					<VerticalBarChart
						data={data?.entitiesCount.persons}
						labelTitle="დასახელება"
					/>
				</Collapsible>
			</Card>
			<Card className="h-fit bg-neutral-50">
				<Collapsible
					icon={LuUsers}
					title="სტატიებში მოხსენიებული ორგანიზაციები"
					description="პოსტებში ყველაზე ხშირად ნახსენები ორგანიზაციები"
				>
					<VerticalBarChart
						data={data?.entitiesCount.organizations}
						labelTitle="დასახელება"
					/>
				</Collapsible>
			</Card>
			<Card className="h-fit bg-neutral-50">
				<Collapsible
					icon={LuMapPin}
					title="სტატიებში მოხსენიებული ქალაქები"
					description="პოსტებში ყველაზე ხშირად ნახსენები ქალაქები"
				>
					<VerticalBarChart
						data={data?.entitiesCount.cities}
						labelTitle="დასახელება"
					/>
				</Collapsible>
			</Card>
			<Card className="h-fit bg-neutral-50">
				<Collapsible
					icon={LuGlobe}
					title="სტატიებში მოხსენიებული ქვეყნები"
					description="პოსტებში ყველაზე ხშირად ნახსენები ქვეყნები"
				>
					<VerticalBarChart
						data={data?.entitiesCount.countries}
						labelTitle="დასახელება"
					/>
				</Collapsible>
			</Card>
		</Frame>
	);
}

export default EntitiesSection;
