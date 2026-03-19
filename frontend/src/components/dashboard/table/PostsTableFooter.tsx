import { setTableCurrentPage } from "../../../redux/slices/dashboard";
import useTablePostsCtx from "../../../hooks/useTablePostsCtx";
import { useAppDispatch } from "../../../redux/hooks";
import Pagination from "../../elements/Pagination";

function PostsTableFooter() {
	const dispatch = useAppDispatch();
	const { totalPosts, pageSize, currentPage } = useTablePostsCtx();

	return (
		<div className="mt-6 px-4 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<span className="font-medium text-neutral-900">{currentPage}</span>
				<span className="text-sm text-neutral-500">გვერდი</span>
				<span className="font-medium text-neutral-900">
					{Math.ceil(totalPosts / pageSize)}
				</span>
				<span className="text-sm text-neutral-500">გვერდიდან</span>
			</div>
			<Pagination
				totalPages={Math.ceil(totalPosts / pageSize)}
				currentPage={currentPage}
				onPageChange={page => dispatch(setTableCurrentPage(page.selected + 1))}
				pageRangeDisplayed={-1}
				marginPagesDisplayed={-1}
				className="w-fit"
			/>
		</div>
	);
}

export default PostsTableFooter;
