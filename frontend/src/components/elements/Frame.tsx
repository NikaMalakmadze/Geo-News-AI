import React from "react";

interface IFrameProps {
	title: string;
	children: React.ReactNode | React.ReactNode[];
}

function Frame({ title, children }: IFrameProps) {
	return (
		<div className="relative mt-8 px-5 py-9 bg-neutral-100/25 border border-neutral-200 rounded-xl">
			<div className="absolute -top-4.5 px-2 py-1 bg-neutral-50 border border-neutral-200 rounded-lg font-firago font-semibold text-lg">
				{title}
			</div>
			<div className="flex flex-col gap-4">{children}</div>
		</div>
	);
}

export default Frame;
