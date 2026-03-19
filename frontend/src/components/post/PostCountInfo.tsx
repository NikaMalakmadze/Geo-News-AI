function PostCountInfo({
	currentPage,
	pageSize,
	totalItems,
}: {
	currentPage: number;
	pageSize: number;
	totalItems: number;
}) {
	const startItem = (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(startItem + pageSize - 1, totalItems);

	return (
		<div className="flex items-center gap-2">
			<span className="text-sm text-neutral-500">ვაჩვენებთ</span>
			<span className="font-medium text-neutral-900">
				{startItem}-{endItem}
			</span>
			<span className="text-sm text-neutral-500">პოსტს</span>
			<span className="font-medium text-neutral-900">{totalItems}</span>
			<span className="text-sm text-neutral-500">პოსტიდან</span>
		</div>
	);
}

export default PostCountInfo;
