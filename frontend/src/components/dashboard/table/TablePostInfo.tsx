import { LuTag } from "react-icons/lu";

import type { ITablePost } from "../../../types/dashboard";
import { getStrDateTime } from "../../../utils/helpers";
import KeywordTag from "../../elements/KeywordTag";
import Card from "../../elements/Card";
import Row from "../../elements/Row";

function TablePostInfo({ post }: { post: ITablePost }) {
	return (
		<Card className="gap-2">
			<Row label="ID:">
				<span className="text-xs text-slate-900 font-mono">{post.id}</span>
			</Row>

			<Row label="Slug:">
				<span className="text-xs text-slate-900 font-mono break-all">
					{post.slug}
				</span>
			</Row>

			<Row label="სათაური:">
				<span className="text-xs text-slate-900 wrap-break-word">
					{post.title}
				</span>
			</Row>

			<Row label="კატეგორია:">
				<span className="text-xs text-slate-900 font-mono">
					{post.category}
				</span>
			</Row>

			<Row label="თარიღი:">
				<span className="text-xs text-slate-900 font-mono">
					{getStrDateTime(post.date_parts)}
				</span>
			</Row>

			<Row label="გამოიცა:">
				<span className="text-xs text-slate-900 font-mono">
					{post.published_at}
				</span>
			</Row>

			<Row label="წყარო:">
				<a
					href={post.source.post_url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-xs text-blue-500 hover:underline font-mono break-all"
				>
					{post.source.site_name}
				</a>
			</Row>

			{post.tags.length > 0 && (
				<Row label="ტეგები:">
					<div className="flex flex-wrap gap-1">
						{post.tags.map((tag, i) => (
							<KeywordTag
								key={`${post.slug}-details-tag-${i}`}
								className="flex gap-1 items-center text-neutral-500"
							>
								<LuTag />
								<span>{tag}</span>
							</KeywordTag>
						))}
					</div>
				</Row>
			)}
		</Card>
	);
}

export default TablePostInfo;
