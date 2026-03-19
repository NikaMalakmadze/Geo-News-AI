import { Table } from "@mantine/core";
import React from "react";

import useTablePostsCtx from "../../../hooks/useTablePostsCtx";
import PostsTableColumns from "./PostsTableColumns";
import TableRowSkeleton from "./TableRowSkeleton";
import TableRow from "./TableRow";
import Ghost from "../../elements/Ghost";

function PostsTable() {
	const {
		data,
		pageSize,
		postsStatus,
		sortBy,
		reverseSortDirection,
		setSorting,
	} = useTablePostsCtx();

	const rows = React.useMemo(
		() => data.map(item => <TableRow item={item} key={`row_${item.slug}`} />),
		[data],
	);

	const skeletons = React.useMemo(
		() =>
			Array.from({ length: pageSize }, (_, k) => k).map(i => (
				<TableRowSkeleton key={i} />
			)),
		[pageSize],
	);

	return postsStatus === "error" ? (
		<Ghost className="flex justify-center text-xl" />
	) : (
		<Table className="table-fixed">
			<PostsTableColumns
				sortBy={sortBy}
				reverseSortDirection={reverseSortDirection}
				setSorting={setSorting}
			/>
			<Table.Tbody>{postsStatus === "pending" ? skeletons : rows}</Table.Tbody>
		</Table>
	);
}

export default PostsTable;
