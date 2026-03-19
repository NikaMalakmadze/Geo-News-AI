import { selectPostsPageReady } from "../redux/selectors/selectPostsPageReady";
import PostNothing from "../components/post/PostNothing";
import PostsPage from "../components/post/PostsPage";
import usePostsQuery from "../hooks/usePostsQuery";
import usePageTitle from "../hooks/usePageTitle";
import { useAppSelector } from "../redux/hooks";

function News() {
	usePageTitle("ამბები");

	const { postsStatus, totalItems } = useAppSelector(state => state.posts);
	const isReady = useAppSelector(selectPostsPageReady);

	usePostsQuery();

	return (
		<div className="h-full bg-neutral-50/80">
			<div className="h-fit relative overflow-hidden border-b border-neutral-200">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-1/2 left-1/4 h-96 w-96 rounded-full bg-cyan-900/10 blur-3xl"></div>
					<div className="absolute -top-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-900/10 blur-3xl"></div>
				</div>
				<div className="max-w-7xl h-full mx-auto px-6 py-12">
					<div className="max-w-4xl">
						<h1 className="font-firago text-4xl tracking-tight">
							ქართული ამბების AI
						</h1>
						<h3 className="mt-4 text-lg text-neutral-500 text-pretty">
							ქართული ახალი ამბების ხელოვნური ინტელექტით მართული ანალიზი.
							დაათვალიერეთ ყოველდღიურად ამოჭრილი სტატიები, შეისწავლეთ განწყობის
							ანალიზი და აღმოაჩინეთ ადგილობრივი მედიის ინფორმაცია.
						</h3>
					</div>
				</div>
			</div>
			{postsStatus === "error" || (isReady && !totalItems) ? (
				<PostNothing />
			) : (
				<PostsPage />
			)}
		</div>
	);
}

export default News;
