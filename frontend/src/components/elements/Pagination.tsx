import ReactPaginate from "react-paginate";
import { twMerge } from "tailwind-merge";

interface IPaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: { selected: number }) => void;
	marginPagesDisplayed?: number;
	pageRangeDisplayed?: number;
	className?: string;
}

function Pagination({
	totalPages,
	currentPage,
	onPageChange,
	className = "",
	marginPagesDisplayed = 2,
	pageRangeDisplayed = 5,
}: IPaginationProps) {
	return (
		<ReactPaginate
			pageCount={totalPages}
			onPageChange={onPageChange}
			forcePage={currentPage - 1}
			marginPagesDisplayed={marginPagesDisplayed}
			pageRangeDisplayed={pageRangeDisplayed}
			renderOnZeroPageCount={null}
			containerClassName={twMerge(
				"flex justify-center items-center gap-1 cursor-pointer",
				className,
			)}
			pageLinkClassName="inline-flex items-center justify-center size-9 rounded-md text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-cyan-900/80 hover:text-white transition-all"
			activeLinkClassName="!bg-cyan-900/80 !text-white"
			previousLabel="«"
			nextLabel="»"
			previousLinkClassName="inline-flex items-center justify-center size-9 rounded-md text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-cyan-900/80 hover:text-white transition-all"
			nextLinkClassName="inline-flex items-center justify-center size-9 rounded-md text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-cyan-900/80 hover:text-white transition-all"
		/>
	);
}

export default Pagination;
