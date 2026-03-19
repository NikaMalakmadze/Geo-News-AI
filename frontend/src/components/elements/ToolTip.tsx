import { twMerge } from "tailwind-merge";
import React from "react";

function ToolTip({
	children,
	content,
}: {
	children: React.ReactNode | React.ReactNode[];
	content: React.JSX.Element;
}) {
	const [visible, setVisible] = React.useState<boolean>(false);
	const timoutRef = React.useRef<number>(null);

	return (
		<div
			className="relative"
			onMouseEnter={() => {
				timoutRef.current = setTimeout(() => {
					setVisible(true);
				}, 300);
			}}
			onMouseLeave={() => {
				if (timoutRef.current) clearTimeout(timoutRef.current);
				setVisible(false);
			}}
		>
			<div
				className={twMerge(
					"absolute z-5 bottom-[120%] left-1/2 -translate-x-1/2",
					"w-fit p-1 bg-white border border-neutral-200 rounded-md",
					"font-normal font-sec text-sm text-center whitespace-normal wrap-break-word",
					"transition-opacity ease-in-out pointer-events-none",
					visible ? "opacity-100" : "opacity-0",
				)}
			>
				{content}
			</div>
			{children}
		</div>
	);
}

export default ToolTip;
