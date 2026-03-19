import { twMerge } from "tailwind-merge";

import type { TSentiment } from "../../types/dashboard";
import type { HTMLAttributes } from "react";

interface ISentimentTagProps extends HTMLAttributes<HTMLDivElement> {
	sentiment: TSentiment;
}

function SentimentTag({ sentiment, className, ...props }: ISentimentTagProps) {
	return (
		<div
			className={twMerge(
				"px-2 py-0.5 rounded-md border text-xs font-medium whitespace-nowrap",
				sentiment === "positive"
					? "border-green-600 bg-green-600/10 text-green-600"
					: "",
				sentiment === "negative"
					? "border-red-600 bg-red-600/10 text-red-600"
					: "",
				sentiment === "neutral"
					? "border-gray-600 bg-gray-600/10 text-gray-600"
					: "",
				sentiment === "mixed"
					? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
					: "",
				className,
			)}
			{...props}
		>
			{sentiment === "positive" ? "პოზიტიური" : ""}
			{sentiment === "negative" ? "ნეგატიური" : ""}
			{sentiment === "neutral" ? "ნეიტრალური" : ""}
			{sentiment === "mixed" ? "შერეული" : ""}
		</div>
	);
}

export default SentimentTag;
