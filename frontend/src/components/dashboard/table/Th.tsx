import { LuChevronDown, LuChevronsUpDown, LuChevronUp } from "react-icons/lu";
import { Table, UnstyledButton } from "@mantine/core";
import React, { type TdHTMLAttributes } from "react";

interface IThProps extends TdHTMLAttributes<HTMLTableCellElement> {
	children: React.ReactNode;
	reversed: boolean;
	sorted: boolean;
	onSort: () => void;
}

function Th({ children, reversed, sorted, onSort, ...props }: IThProps) {
	const Icon = sorted
		? reversed
			? LuChevronUp
			: LuChevronDown
		: LuChevronsUpDown;

	return (
		<Table.Th {...props}>
			<UnstyledButton onClick={onSort}>
				<div className="flex items-center gap-1 text-sm font-medium">
					<p>{children}</p>
					<Icon />
				</div>
			</UnstyledButton>
		</Table.Th>
	);
}

export default Th;
