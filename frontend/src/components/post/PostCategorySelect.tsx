import { LuArrowUp } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import React from "react";

import { selectCategories } from "../../redux/selectors/selectCategories";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCategory } from "../../redux/slices/posts";

function PostCategorySelect() {
	const { categories, currentCategory } = useAppSelector(selectCategories);
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const onOutsideClick = (e: MouseEvent) => {
			if (!wrapperRef.current?.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("click", onOutsideClick);
		return () => {
			document.removeEventListener("click", onOutsideClick);
		};
	}, []);

	return (
		<div ref={wrapperRef} className="relative w-50.5">
			<button
				type="button"
				onClick={() => setIsOpen(prev => !prev)}
				className="flex h-10 w-full items-center gap-1.5 justify-between bg-neutral-100 text-slate-900 border border-slate-200 rounded-md px-3 text-sm transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-700/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white whitespace-nowrap"
			>
				{categories.find(cat => cat.value === currentCategory)?.label}
				<LuArrowUp
					className={twMerge(
						"h-4 w-4 opacity-50 pointer-events-none tracking-normal transition-transform duration-150 ease-in-out",
						isOpen && "rotate-180",
					)}
				/>
			</button>
			{isOpen && (
				<div className="absolute z-50 mt-1 w-full max-h-45 border border-slate-200 rounded-md corner-squiracle bg-white shadow-md overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{categories.map((category, i) => (
						<div
							key={`option_${i}`}
							className="w-[97%] cursor-pointer mx-1 px-2 my-0.5 py-1.5 text-sm rounded-sm hover:bg-neutral-100 transition-colors"
							onClick={() => {
								dispatch(setCategory(category.value));
								setIsOpen(false);
							}}
						>
							{category.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default PostCategorySelect;
