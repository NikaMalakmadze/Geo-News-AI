import type { IPostCategory } from "../../types/post";
import type { RootState } from "../store";

type categorySelectorReturn = {
	categories: IPostCategory[];
	currentCategory: string;
};

export function selectCategories(state: RootState): categorySelectorReturn {
	return {
		categories: state.posts.categoryObjs,
		currentCategory: state.posts.currentCategory,
	};
}
