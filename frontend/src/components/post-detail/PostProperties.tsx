import { LuTag } from "react-icons/lu";

import CategoryTag from "../elements/CategoryTag";
import KeywordTag from "../elements/KeywordTag";

function PostProperties({
	id,
	category,
	categoryUrl,
	tags,
}: {
	id: string;
	category: string;
	categoryUrl: string;
	tags: string[];
}) {
	return (
		<div className="flex items-center gap-2 text-xs max-sm:justify-center max-sm:flex-wrap">
			<a href={categoryUrl} target="_blank">
				<CategoryTag category={category} />
			</a>
			{tags.map((tag, i) => (
				<KeywordTag
					key={`${id}-details-tag-${i}`}
					className="flex gap-1 items-center text-neutral-500"
				>
					<LuTag />
					<span>{tag}</span>
				</KeywordTag>
			))}
		</div>
	);
}

export default PostProperties;
