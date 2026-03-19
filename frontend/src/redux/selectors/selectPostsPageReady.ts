import type { RootState } from "../store";

export function selectPostsPageReady(state: RootState): boolean {
	return (
		state.posts.postsStatus === "loaded" &&
		state.posts.categoriesStatus === "loaded"
	);
}
