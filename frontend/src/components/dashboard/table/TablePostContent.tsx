import { Table } from "@mantine/core";

import AnalyzeCardSaved from "../../analyze/AnalyzeCardSaved";
import type { ITablePost } from "../../../types/dashboard";
import TablePostInfo from "./TablePostInfo";

function TablePostContent({ post }: { post: ITablePost }) {
	return (
		<Table.Tr>
			<Table.Td colSpan={10} className="bg-neutral-100/70">
				<div className="py-4 px-2 flex flex-col gap-4">
					<div className="flex flex-col gap-4">
						<h5 className="text-sm font-semibold">პოსტის ინფორმაცია</h5>
						<TablePostInfo post={post} />
					</div>
					{post.analyze && (
						<div className="flex flex-col gap-4">
							<h5 className="text-sm font-semibold">პოსტის AI ანალიზი</h5>
							<AnalyzeCardSaved data={post.analyze} />
						</div>
					)}
				</div>
			</Table.Td>
		</Table.Tr>
	);
}

export default TablePostContent;
