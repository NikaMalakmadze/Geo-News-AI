import { LuCalendar, LuTag } from "react-icons/lu";

import useTextShortener from "../../hooks/useTextShortener";
import type { IPostDate } from "../../types/post";
import KeywordTag from "../elements/KeywordTag";
import Ghost from "../elements/Ghost";

type TPostContentProps = {
	slug: string;
	dateParts: IPostDate;
	content: string;
	siteName: string;
	siteUrl: string;
	tags: string[];
};

function PostContent({
	slug,
	content,
	dateParts,
	siteName,
	siteUrl,
	tags,
}: TPostContentProps) {
	const processedContent = content.replace(/\[IMAGE:(.*?)\]/g, "").trim();

	const contentRef = useTextShortener<HTMLParagraphElement>(
		processedContent,
		40,
	);

	const postDate = new Date(
		dateParts.year,
		dateParts.month,
		dateParts.day,
		dateParts.hour,
		dateParts.minute,
	).toLocaleDateString("en-US", { dateStyle: "medium" });

	return (
		<div className="px-6">
			<p ref={contentRef} className="mb-4 font-noto text-sm text-neutral-500">
				{processedContent}
			</p>
			<div className="flex flex-wrap gap-3 items-center text-xs text-neutral-500">
				<div className="flex items-center gap-1">
					<LuCalendar />
					<span>{postDate}</span>
				</div>
				<a className="font-medium" href={siteUrl} target="_blank">
					{siteName}
				</a>
			</div>
			<div className="min-h-5 mt-3 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
				{tags.length !== 0 ? (
					<>
						<LuTag />
						{tags.map((tag, i) => (
							<KeywordTag key={`${slug}-tag-${i}`}>{tag}</KeywordTag>
						))}
					</>
				) : (
					<Ghost />
				)}
			</div>
		</div>
	);
}

export default PostContent;
