import type { HTMLAttributes } from "react";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface IKeywordTagProps extends HTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode | React.ReactNode[];
}

function KeywordTag({ children, className }: IKeywordTagProps) {
	return (
		<span
			className={twMerge(
				"px-2 py-0.5 rounded-md bg-neutral-200 border border-neutral-200",
				className,
			)}
		>
			{children}
		</span>
	);
}

export default KeywordTag;
