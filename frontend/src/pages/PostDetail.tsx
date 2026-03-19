import React from "react";

import {
	parseContent,
	renderTextBlock,
	type ContentBlock,
} from "../utils/parseContent";
import PostProperties from "../components/post-detail/PostProperties";
import AnalyzeSection from "../components/post-detail/AnalyzeSection";
import PostSource from "../components/post-detail/PostSource";
import GoBackBtn from "../components/post-detail/GoBackBtn";
import AsyncImage from "../components/elements/AsyncImage";
import useDetailPage from "../hooks/useDetailPage";
import usePageTitle from "../hooks/usePageTitle";

function PostDetail() {
	const { post, status: postStatus } = useDetailPage();

	usePageTitle(post?.title);

	const blocks: ContentBlock[] = React.useMemo(
		() => parseContent(post?.content ?? ""),
		[post?.content],
	);

	if (postStatus === "pending" && !post)
		return <div className="absolute inset-0 animate-pulse">იტვირთება...</div>;
	if (!post) return null;

	return (
		<div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-4">
			<GoBackBtn />
			<PostProperties
				id={post.slug}
				category={post.category}
				categoryUrl={post.source.category_url}
				tags={post.tags}
			/>
			<h1 className="font-firago text-2xl font-bold tracking-tight text-balance max-sm:text-center">
				{post.title}
			</h1>
			<div className="h-fit border-b border-neutral-200">
				<PostSource
					dateParts={post.date_parts}
					postUrl={post.source.post_url}
					siteName={post.source.site_name}
				/>
				<div className="mb-8 prose prose-neutral max-w-none prose-p:leading-7 prose-img:rounded-sm prose-img:mx-auto font-firago">
					{blocks.map((block, i) =>
						block.type === "image" ? (
							<AsyncImage key={`content_${i}`} src={block.src} />
						) : (
							renderTextBlock(block.content)
						),
					)}
				</div>
			</div>
			<AnalyzeSection slug={post.slug} previousAnalyze={post.analyze} />
		</div>
	);
}

export default PostDetail;
