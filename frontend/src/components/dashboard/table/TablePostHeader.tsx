import { LuArrowDown } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { Table } from "@mantine/core";

import type { ITablePost, TSentiment } from "../../../types/dashboard";
import useTablePostsCtx from "../../../hooks/useTablePostsCtx";
import { getStrDateTime } from "../../../utils/helpers";
import SentimentTag from "../../elements/SentimentTag";
import CategoryTag from "../../elements/CategoryTag";
import PostEditButton from "./PostEditButton";
import TableRowTitle from "./TableRowTitle";

function TablePostHeader({ item }: { item: ITablePost }) {
	const { activePost, setActivePost } = useTablePostsCtx();

	return (
		<Table.Tr
			className={twMerge(
				"transition-colors",
				activePost === item.slug && "bg-neutral-200/70!",
			)}
		>
			<Table.Td
				className="w-10 min-w-10 max-w-10"
				pl={16}
				onClick={() =>
					setActivePost(activePost === item.slug ? null : item.slug)
				}
			>
				<div className="w-5 h-5 cursor-pointer">
					<LuArrowDown
						className={twMerge(
							"text-xs text-neutral-500 transition-transform",
							activePost === item.slug && "rotate-180",
						)}
					/>
				</div>
			</Table.Td>
			<Table.Td colSpan={4}>
				<TableRowTitle
					title={item.title}
					content={item.content}
					slug={item.slug}
				/>
			</Table.Td>
			<Table.Td>
				<CategoryTag category={item.category} />
			</Table.Td>
			<Table.Td>
				<span className="text-xs text-neutral-500">
					{item.source.site_name}
				</span>
			</Table.Td>
			<Table.Td>
				{item.analyze ? (
					<SentimentTag
						className="w-fit"
						sentiment={item.analyze.sentiment as TSentiment}
					/>
				) : (
					"არაფერი"
				)}
			</Table.Td>
			<Table.Td>
				<span className="text-xs text-neutral-500">
					{getStrDateTime(item.date_parts)}
				</span>
			</Table.Td>
			<Table.Td className="w-10 min-w-10 max-w-10" pr={16}>
				<div className="w-5 h-5">
					<PostEditButton
						postUrl={item.source.post_url}
						analyze={item.analyze}
						categoryUrl={item.source.category_url}
						slug={item.slug}
					/>
				</div>
			</Table.Td>
		</Table.Tr>
	);
}

export default TablePostHeader;
