import PostCategorySelectSkeleton from "./PostCategorySelectSkeleton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import PostCountInfoSkeleton from "./PostCountInfoSkeleton";
import { setCurrentPage } from "../../redux/slices/posts";
import PostCategorySelect from "./PostCategorySelect";
import Pagination from "../elements/Pagination";
import PostCountInfo from "./PostCountInfo";
import PostSkeleton from "./PostSkeleton";
import Post from "./Post";

function PostsPage() {
	const {
		postObjs: posts,
		postsStatus,
		categoriesStatus,
		currentPage,
		pageSize,
		totalItems,
	} = useAppSelector(state => state.posts);
	const dispatch = useAppDispatch();

	const postsEls = posts.map(post => <Post key={post.slug} {...post} />);
	const skeletonEls = Array.from({ length: 6 }, (_, k) => k).map(i => (
		<PostSkeleton key={`skeleton-${i}`} />
	));

	const pageCount = totalItems / pageSize;

	return (
		<>
			<div className="max-w-7xl mx-auto px-6">
				<div className="my-6 flex items-center justify-between max-sm:flex-col max-sm:gap-4">
					{categoriesStatus === "pending" ? (
						<>
							<PostCategorySelectSkeleton />
							<PostCountInfoSkeleton />
						</>
					) : (
						<>
							<PostCategorySelect />
							<PostCountInfo
								currentPage={currentPage}
								pageSize={pageSize}
								totalItems={totalItems}
							/>
						</>
					)}
				</div>
				<div className="pb-10 border-b border-neutral-200 grid gap-6 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
					{postsStatus == "pending" ? skeletonEls : postsEls}
				</div>
			</div>
			<div className="py-8">
				{pageCount > 1 && (
					<Pagination
						currentPage={currentPage}
						totalPages={Math.ceil(totalItems / pageSize)}
						onPageChange={page => dispatch(setCurrentPage(page.selected + 1))}
					/>
				)}
			</div>
		</>
	);
}

export default PostsPage;
