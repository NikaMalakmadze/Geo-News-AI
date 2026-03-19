import {
	LuBrain,
	LuExternalLink,
	LuPencil,
	LuShapes,
	LuTrash,
} from "react-icons/lu";
import { Menu, UnstyledButton } from "@mantine/core";
import React from "react";

import useTablePostsCtx from "../../../hooks/useTablePostsCtx";
import { deleteItem } from "../../../redux/thunks/deleteItem";
import type { IAnalyze } from "../../../types/dashboard";
import { useAppDispatch } from "../../../redux/hooks";
import { isNotNull } from "../../../types/typeGuards";
import useAccessKeyCtx from "../../../hooks/useAccessKeyCtx";

interface IPostEditButtonProps {
	analyze: IAnalyze | null;
	categoryUrl: string;
	postUrl: string;
	slug: string;
}

function PostEditButton({
	analyze,
	postUrl,
	categoryUrl,
	slug,
}: IPostEditButtonProps) {
	const { openEditModal } = useTablePostsCtx();
	const { key } = useAccessKeyCtx();

	const dispatch = useAppDispatch();
	const onAnalyzeDelete = React.useCallback(
		(slug: string, type: "post" | "analyze") => {
			dispatch(deleteItem({ key, slug, type }));
		},
		[key, dispatch],
	);

	return (
		<Menu position="bottom-end" withinPortal>
			<Menu.Target>
				<UnstyledButton className="flex items-center justify-center">
					...
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown py={8}>
				<Menu.Item px={8} py={6}>
					<a href={postUrl} target="_blank" className="block h-full">
						<div className="w-full h-6 flex items-center gap-4 whitespace-nowrap text-sm font-medium transition-all outline-none rounded-lg cursor-pointer max-sm:py-2.5">
							<LuExternalLink />
							<span>წყაროს ნახვა</span>
						</div>
					</a>
				</Menu.Item>
				<div className={!isNotNull(analyze) ? "pb-1" : ""}>
					<Menu.Item px={8} py={6}>
						<a href={categoryUrl} target="_blank" className="block h-full">
							<div className="w-full h-6 flex items-center gap-4 whitespace-nowrap text-sm font-medium transition-all outline-none rounded-lg cursor-pointer max-sm:py-2.5">
								<LuShapes />
								<div>კატეგორიის ნახვა</div>
							</div>
						</a>
					</Menu.Item>
				</div>
				{isNotNull(analyze) && (
					<>
						<Menu.Item
							px={8}
							py={6}
							onClick={() => openEditModal({ slug, analyze })}
						>
							<div className="w-full h-6 flex items-center gap-4 whitespace-nowrap text-sm font-medium transition-all outline-none rounded-lg cursor-pointer max-sm:py-2.5">
								<LuPencil />
								<span>სენტიმენტის შეცვლა</span>
							</div>
						</Menu.Item>
						<div className="pt-1 border-t border-neutral-200">
							<Menu.Item
								px={8}
								py={6}
								onClick={() => onAnalyzeDelete(slug, "analyze")}
							>
								<div className="w-full h-6 flex items-center gap-4 whitespace-nowrap text-sm text-red-500 font-medium transition-all outline-none rounded-lg cursor-pointer max-sm:py-2.5">
									<LuBrain />
									<span>სენტიმენტის წაშლა</span>
								</div>
							</Menu.Item>
						</div>
					</>
				)}
				<div className="pt-1 border-t border-neutral-200">
					<Menu.Item
						px={8}
						py={6}
						onClick={() => onAnalyzeDelete(slug, "post")}
					>
						<a href={postUrl} target="_blank" className="block h-full">
							<div className="w-full h-6 flex items-center gap-4 whitespace-nowrap text-sm text-red-500 font-medium transition-all outline-none rounded-lg cursor-pointer max-sm:py-2.5">
								<LuTrash />
								<span>პოსტის წაშლა</span>
							</div>
						</a>
					</Menu.Item>
				</div>
			</Menu.Dropdown>
		</Menu>
	);
}

export default PostEditButton;
