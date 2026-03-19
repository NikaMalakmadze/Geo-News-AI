import { twMerge } from "tailwind-merge";
import { categoryColors } from "../../data/daschboard";

function CategoryTag({ category }: { category: string }) {
	if (!category) return;

	const color =
		categoryColors[category as keyof typeof categoryColors] ?? "#737373";

	return (
		<span
			style={{
				background: `linear-gradient(135deg, ${color}20, ${color}10)`,
				color: color,
				borderColor: `${color}33`,
				boxShadow: `0 2px 6px ${color}22, inset 0 1px 2px ${color}11`,
			}}
			className={twMerge(
				"px-3 py-1 inline-flex items-center justify-center text-xs font-firago font-medium rounded-md border whitespace-nowrap shrink-0 select-none backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105",
				category.length >= 40 && "whitespace-break-spaces",
			)}
		>
			{category}
		</span>
	);
}

export default CategoryTag;
