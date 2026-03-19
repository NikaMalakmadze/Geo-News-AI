import type { IconType } from "react-icons";
import type React from "react";

import type { IAnalyzeFormLists } from "../../../types/dashboard";
import { mapEntities } from "../../../utils/mapEntities";
import Ghost from "../../elements/Ghost";

interface IPostAnalyzeEditTextAreaProps {
	title: string;
	value: string;
	valueType: keyof IAnalyzeFormLists;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	Icon: IconType;
}

function PostAnalyzeEditTextArea({
	title,
	value,
	valueType,
	onChange,
	Icon,
}: IPostAnalyzeEditTextAreaProps) {
	const entities: string[] = value.split(",");

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2 text-lg">
				<Icon />
				<h3 className="font-firago font-semibold">{title}</h3>
			</div>
			<p className="mb-2 text-xs text-neutral-400">გამოყავი მძიმით (,)</p>
			<div className="flex flex-col gap-2">
				<textarea
					className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-700 placeholder:text-neutral-400 resize-none focus:outline-none focus:ring-2 focus:ring-neutral-200 hover:border-neutral-300 transition-colors leading-relaxed"
					rows={4}
					value={value}
					onChange={onChange}
				></textarea>
				<div className="flex gap-2 flex-wrap">
					{entities.length >= 1 && entities[0] ? (
						mapEntities({
							category: valueType,
							entities,
						})
					) : (
						<Ghost />
					)}
				</div>
			</div>
		</div>
	);
}

export default PostAnalyzeEditTextArea;
