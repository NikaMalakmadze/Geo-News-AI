import {
	LuAnnoyed,
	LuCalendar,
	LuClock,
	LuFileChartColumn,
	LuFiles,
	LuFrown,
	LuGlobe,
	LuHash,
	LuIdCard,
	LuMapPin,
	LuMeh,
	LuSmile,
	LuUsers,
} from "react-icons/lu";

import type { TCardVisual } from "../components/dashboard/sections/StatsCard";
import type {
	IAnalyzeFormLists,
	ISelectCategorytOption,
	ISelectSentimentOption,
	TCategory,
	TSentiment,
} from "../types/dashboard";
import { currentWeekRange } from "../utils/helpers";
import type { IconType } from "react-icons";

export const sentimentColors: Record<TSentiment, string> = {
	positive: "#22c55e",
	negative: "#ef4444",
	mixed: "#eab308",
	neutral: "#9ca3af",
};

export const sentimentGeo: Record<TSentiment, string> = {
	positive: "პოზიტიური",
	negative: "ნეგატიური",
	mixed: "შერეული",
	neutral: "ნეიტრალური",
};

export const selectSentimentOptions: ISelectSentimentOption[] = Object.entries(
	sentimentGeo,
).map(([value, label]) => ({ value: value as TSentiment, label }));

export const categoryColors: Record<TCategory, string> = {
	გაანალიზებული: "#10b981",
	გაუანალიზებული: "#f97316",
	შოუბიზნესი: "#ec4899",
	კონფლიქტები: "#ef4444",
	საზოგადოება: "#3b82f6",
	ეკონომიკა: "#22c55e",
	მეცნიერება: "#8b5cf6",
	სამხედრო: "#374151",
	მსოფლიო: "#0ea5e9",
	სამართალი: "#f59e0b",
	სპორტი: "#84cc16",
};

export const selectCategoryOptions: ISelectCategorytOption[] = Object.keys(
	categoryColors,
)
	.map(value => ({
		value: value as TCategory,
		label: value,
	}))
	.splice(2);

export const analyzeEditModalTextAreaData: Record<
	keyof IAnalyzeFormLists,
	{ title: string; Icon: IconType }
> = {
	keywords: { title: "საკვანძო სიტყვები", Icon: LuHash },
	persons: { title: "სტატიაში ნახსენები პირები", Icon: LuIdCard },
	organizations: { title: "სტატიაში ნახსენები ორგანიზაციები", Icon: LuUsers },
	cities: { title: "სტატიაში ნახსენები ქალაქები", Icon: LuMapPin },
	countries: { title: "სტატიაში ნახსენები ქვეყნები", Icon: LuGlobe },
};

const monthsKa: string[] = [
	"იანვარი",
	"თებერვალი",
	"მარტი",
	"აპრილი",
	"მაისი",
	"ივნისი",
	"ივლისი",
	"აგვისტო",
	"სექტემბერი",
	"ოქტომბერი",
	"ნოემბერი",
	"დეკემბერი",
];

const date: Date = new Date();

const [weekStart, weekEnd] = currentWeekRange();

export function constructCardVisuals(
	analyzedDesc: string,
	positiveDesc: string,
	negativeDesc: string,
	neutralDesc: string,
	mixedDesc: string,
): TCardVisual[] {
	return [
		{
			CardIcon: LuFiles,
			cardTitle: "პოსტების რაოდენობა",
			cardDesc: "მთლიანობაში",
		},
		{
			CardIcon: LuClock,
			cardTitle: "დღევანდელი პოსტები",
			cardDesc: `${date.getDate()} ${monthsKa[date.getMonth()]}`,
		},
		{
			CardIcon: LuCalendar,
			cardTitle: "ამ კვირის პოსტები",
			cardDesc: `${weekStart.getDate()} ${monthsKa[weekStart.getMonth()]} - ${weekEnd.getDate()} ${monthsKa[weekEnd.getMonth()]}`,
		},
		{
			CardIcon: LuFileChartColumn,
			cardTitle: "გაანალიზირებული პოსტები",
			cardDesc: analyzedDesc,
		},
		{
			CardIcon: LuSmile,
			cardTitle: "პოზიტიური პოსტები",
			cardDesc: positiveDesc,
		},
		{
			CardIcon: LuFrown,
			cardTitle: "ნეგატიური პოსტები",
			cardDesc: negativeDesc,
		},
		{
			CardIcon: LuMeh,
			cardTitle: "ნეიტრალური პოსტები",
			cardDesc: neutralDesc,
		},
		{
			CardIcon: LuAnnoyed,
			cardTitle: "შერეული პოსტები",
			cardDesc: mixedDesc,
		},
	];
}
