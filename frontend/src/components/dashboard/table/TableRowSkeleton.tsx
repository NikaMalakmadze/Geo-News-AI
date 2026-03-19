import { Skeleton, Table } from "@mantine/core";

function TableRowSkeleton() {
	return (
		<Table.Tr>
			<Table.Td colSpan={4}>
				<div className="w-75 lg-w-100">
					<Skeleton height={16} width="100%" className="mb-1" />
					<Skeleton height={12} width="80%" />
				</div>
			</Table.Td>
			<Table.Td>
				<Skeleton height={20} width={60} />
			</Table.Td>
			<Table.Td>
				<Skeleton height={12} width={50} />
			</Table.Td>
			<Table.Td>
				<Skeleton height={20} width={70} />
			</Table.Td>
			<Table.Td>
				<Skeleton height={12} width={80} />
			</Table.Td>
			<Table.Td className="w-10 min-w-10 max-w-10">
				<Skeleton height={20} width={20} />
			</Table.Td>
		</Table.Tr>
	);
}

export default TableRowSkeleton;
