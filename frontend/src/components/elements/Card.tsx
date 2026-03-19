import React from "react";
import { twMerge } from "tailwind-merge";

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

function Card({ children, className, ...props }: ICardProps) {
	return (
		<div
			className={twMerge(
				"py-6 px-4 flex flex-col justify-between gap-6 rounded-xl corner-squircle border border-neutral-200 shadow-sm hover:shadow-md transition-shadow",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export default Card;
