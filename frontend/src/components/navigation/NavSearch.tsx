import { LuSearch } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { debounce } from "ts-debounce";
import React from "react";

import { setSearch } from "../../redux/slices/posts";
import { useAppDispatch } from "../../redux/hooks";

function NavSearch() {
	const [searchValue, setSearchValue] = React.useState<string>("");
	const dispatch = useAppDispatch();

	const debaunceSearch = React.useRef(
		debounce((value: string) => {
			dispatch(setSearch(value));
			localStorage.setItem("searchValue", value);
		}, 500),
	).current;

	React.useEffect(() => {
		const value = localStorage.getItem("searchValue") || "";
		setSearchValue(value);
		dispatch(setSearch(value));
	}, [setSearchValue, dispatch]);

	return (
		<div className="relative">
			<LuSearch className="absolute left-5 top-1/2 -translate-1/2" />
			<input
				type="search"
				placeholder="მოძებნე ამბები..."
				value={searchValue}
				onChange={e => {
					debaunceSearch(e.target.value);
					setSearchValue(e.target.value);
				}}
				className={twMerge(
					"h-9 w-64 min-w-0 px-3 py-1 pl-9",
					"font-noto text-base md:text-sm text-neutral-900 placeholder:text-neutral-500",
					"bg-slate-100/50 focus:bg-white shadow-sm",
					"border border-transparent rounded-full corner-squircle focus:border-neutral-300 focus-visible:border-slate-500 transition-colors outline-none",
					"selection:bg-cyan-900 selection:text-white",
					"focus-visible:ring-2 focus-visible:ring-slate-500/50",
					"file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-700",
					"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
					"aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40",
				)}
			/>
		</div>
	);
}

export default NavSearch;
