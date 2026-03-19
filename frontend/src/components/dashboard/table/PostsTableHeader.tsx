import { Select, TextInput } from "@mantine/core";
import { LuFiles } from "react-icons/lu";

import { setTablePageSize } from "../../../redux/slices/dashboard";
import useTablePostsCtx from "../../../hooks/useTablePostsCtx";
import { useAppDispatch } from "../../../redux/hooks";
import PostCountInfo from "../../post/PostCountInfo";

function PostsTableHeader() {
	const dispatch = useAppDispatch();
	const {
		currentPage,
		totalPosts,
		pageSize,
		search,
		setSearch,
		debounceSearch,
	} = useTablePostsCtx();

	return (
		<div className="px-4 flex flex-col gap-4">
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2 text-lg">
						<LuFiles />
						<h3 className="font-firago font-semibold">პოსტების მენეჯმენტი</h3>
					</div>
					<p className="text-neutral-500 text-sm">
						დაათვალიერეთ, მოძებნეთ და მართეთ ყველა პოსტი და მათი AI ანალიზი
					</p>
				</div>
				<PostCountInfo
					currentPage={currentPage}
					pageSize={pageSize}
					totalItems={totalPosts}
				/>
			</div>
			<div className="mb-8 flex items-center justify-between">
				<TextInput
					placeholder="მოძებნეთ ნებისმიერი ველის მიხედვით..."
					value={search}
					className="w-100"
					onChange={e => {
						setSearch(e.currentTarget.value);
						debounceSearch(e.currentTarget.value);
					}}
				/>
				<Select
					className="w-20"
					placeholder={pageSize.toString()}
					onChange={selected => dispatch(setTablePageSize(Number(selected)))}
					data={["6", "8", "10", "12"]}
				/>
			</div>
		</div>
	);
}

export default PostsTableHeader;
