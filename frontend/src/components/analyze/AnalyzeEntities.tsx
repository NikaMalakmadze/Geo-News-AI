import { LuGlobe, LuIdCard, LuMapPin, LuUsers } from "react-icons/lu";

import { mapEntities } from "../../utils/mapEntities";
import type { ISummary } from "../../types/analyze";
import Ghost from "../elements/Ghost";

function AnalyzeEntities({ summary }: { summary: ISummary }) {
	const persons = mapEntities({
		entities: summary.persons || [],
		category: "people",
	});
	const organizations = mapEntities({
		entities: summary.organizations || [],
		category: "organizations",
	});
	const cities = mapEntities({
		entities: summary.cities || [],
		category: "cities",
	});
	const countries = mapEntities({
		entities: summary.countries || [],
		category: "countries",
	});

	return (
		<div className="grid grid-cols-2 auto-rows-auto gap-y-8 max-md:grid-cols-1">
			<div className="pr-5 flex flex-col gap-2">
				<div className="flex items-center gap-2 text-neutral-500 font-medium font-firago">
					<LuIdCard />
					<span>ადამიანები</span>
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					{persons && persons.length > 0 ? persons : <Ghost />}
				</div>
			</div>
			<div className="pr-5 flex flex-col gap-2">
				<div className="pl-1 flex items-center gap-2 text-neutral-500 font-medium font-firago">
					<LuUsers />
					<span>ორგანიზაციები</span>
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					{organizations && organizations.length > 0 ? (
						organizations
					) : (
						<Ghost />
					)}
				</div>
			</div>
			<div className="pr-5 flex flex-col gap-2">
				<div className="flex items-center gap-2 text-neutral-500 font-medium font-firago">
					<LuMapPin />
					<span>ქალაქები</span>
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					{cities && cities.length > 0 ? cities : <Ghost />}
				</div>
			</div>
			<div className="pr-5 flex flex-col gap-2">
				<div className="flex items-center gap-2 text-neutral-500 font-medium font-firago">
					<LuGlobe />
					<span>ქვეყნები</span>
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					{countries && countries.length > 0 ? countries : <Ghost />}
				</div>
			</div>
		</div>
	);
}

export default AnalyzeEntities;
