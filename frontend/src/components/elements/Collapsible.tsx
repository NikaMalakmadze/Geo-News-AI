import { useCollapse, type UseCollapseInput } from "react-collapsed";
import type { IconType } from "react-icons";
import { LuArrowUp } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import type React from "react";

interface ICollabsibleProps {
	icon: IconType;
	title: string;
	description: string;
	children: React.ReactNode | React.ReactNode[];
}

function Collapsible({
	icon: Icon,
	title,
	description,
	children,
}: ICollabsibleProps) {
	const config: UseCollapseInput = {
		duration: 1000,
		easing: "cubic-bezier(0.33, 1, 0.68, 1)",
	};

	const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

	return (
		<div className="h-fit">
			<button className="w-full text-left group" {...getToggleProps()}>
				<div className="flex w-full items-start sm:items-center gap-3">
					<div className="flex flex-1 min-w-0 flex-col gap-1 sm:gap-2">
						<div className="flex items-center gap-2 text-base sm:text-lg">
							<Icon className="shrink-0" />
							<h3 className="font-firago font-semibold truncate">{title}</h3>
						</div>

						<p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
							{description}
						</p>
					</div>
					<LuArrowUp
						className={twMerge(
							"h-5 w-5 sm:h-6 sm:w-6 shrink-0 opacity-50 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]",
							isExpanded && "rotate-180",
						)}
					/>
				</div>
			</button>
			<div {...getCollapseProps()} className="overflow-hidden">
				<div className="pt-11">{children}</div>
			</div>
		</div>
	);
}

export default Collapsible;
