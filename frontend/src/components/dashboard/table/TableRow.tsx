import React from "react";

import useTablePostsCtx from "../../../hooks/useTablePostsCtx";
import type { ITablePost } from "../../../types/dashboard";
import TablePostContent from "./TablePostContent";
import TablePostHeader from "./TablePostHeader";

function TableRow({ item }: { item: ITablePost }) {
	const { activePost } = useTablePostsCtx();

	return (
		<>
			<TablePostHeader item={item} />
			{activePost === item.slug && <TablePostContent post={item} />}
		</>
	);
}

export default React.memo(TableRow);
