import { Link } from "react-router-dom";

import useTextShortener from "../../../hooks/useTextShortener";

function TableRowTitle({
	title,
	content,
	slug,
}: {
	title: string;
	content: string;
	slug: string;
}) {
	const processedContent = content.replace(/\[IMAGE:(.*?)\]/g, "").trim();

	const titleRef = useTextShortener<HTMLHeadingElement>(title, 20);
	const contentRef = useTextShortener<HTMLParagraphElement>(
		processedContent,
		20,
	);

	return (
		<div className="max-w-75 lg:max-w-100">
			<Link to={`/news/${slug}`}>
				<h5
					ref={titleRef}
					className="text-sm font-semibold leading-snug line-clamp-1"
				>
					{title}
				</h5>
			</Link>
			<p
				ref={contentRef}
				className="mt-0.5 text-xs text-neutral-500 font-firago line-clamp-1"
			>
				{processedContent}
			</p>
		</div>
	);
}

export default TableRowTitle;
