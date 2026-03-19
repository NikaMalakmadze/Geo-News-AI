import React from "react";

function Row({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex items-start gap-2">
			<span className="font-medium text-neutral-500 min-w-22 shrink-0">
				{label}
			</span>
			<div className="flex-1 min-w-0">{children}</div>
		</div>
	);
}

export default Row;
