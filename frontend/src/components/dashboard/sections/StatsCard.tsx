import type { IconType } from "react-icons";

export type TCardVisual = {
	CardIcon: IconType;
	cardTitle: string;
	cardDesc: string;
};

export interface IStatsCardProps {
	cardVisual: TCardVisual;
	cardData: string;
}

function StatsCard({
	cardVisual: { CardIcon, cardTitle, cardDesc },
	cardData,
}: IStatsCardProps) {
	return (
		<div className="py-6 flex flex-col justify-between gap-6 rounded-xl corner-squircle border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
			<div className="px-6 flex items-center justify-between">
				<h4 className="text-sm font-medium text-neutral-500">{cardTitle}</h4>
				<CardIcon className="text-neutral-500" />
			</div>
			<div className="px-6">
				<div className="text-2xl font-bold font-firago">{cardData}</div>
				<span className="mt-1 text-xs text-neutral-500">{cardDesc}</span>
			</div>
		</div>
	);
}

export default StatsCard;
