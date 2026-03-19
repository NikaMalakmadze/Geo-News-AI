import type { IPost } from "../../types/post";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";

function Post({
	slug,
	title,
	content,
	category,
	date_parts,
	source,
	tags,
}: IPost) {
	return (
		<div className="py-6 flex flex-col justify-between rounded-xl corner-squircle border border-neutral-200 shadow-sm hover:shadow-md">
			<PostHeader
				slug={slug}
				title={title}
				category={category}
				url={source.post_url}
			/>
			<PostContent
				slug={slug}
				content={content}
				dateParts={date_parts}
				siteName={source.site_name}
				siteUrl={source.site_url}
				tags={tags}
			/>
		</div>
	);
}

export default Post;
