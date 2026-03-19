import { Table } from "@mantine/core";

import type { ITablePost } from "../../../types/dashboard";
import Th from "./Th";

interface IPostsTableColumns {
	sortBy: keyof ITablePost | null;
	reverseSortDirection: boolean;
	setSorting: (field: keyof ITablePost) => void;
}

function PostsTableColumns({
	sortBy,
	reverseSortDirection,
	setSorting,
}: IPostsTableColumns) {
	return (
		<Table.Thead>
			<Table.Tr>
				<Table.Th colSpan={1} style={{ width: "10px" }}></Table.Th>
				<Th
					colSpan={4}
					onSort={() => setSorting("title")}
					sorted={sortBy === "title"}
					reversed={reverseSortDirection}
				>
					სათაური
				</Th>
				<Th
					onSort={() => setSorting("category")}
					sorted={sortBy === "category"}
					reversed={reverseSortDirection}
				>
					კატეგორია
				</Th>
				<Th
					onSort={() => setSorting("source")}
					sorted={sortBy === "source"}
					reversed={reverseSortDirection}
				>
					წყარო
				</Th>
				<Th
					onSort={() => setSorting("analyze")}
					sorted={sortBy === "analyze"}
					reversed={reverseSortDirection}
				>
					სენტიმენტი
				</Th>
				<Th
					onSort={() => setSorting("published_at")}
					sorted={sortBy === "published_at"}
					reversed={reverseSortDirection}
				>
					თარიღი
				</Th>
				<Table.Th colSpan={1} style={{ width: "10px" }}></Table.Th>
			</Table.Tr>
		</Table.Thead>
	);
}

export default PostsTableColumns;
