import { LuCalendar, LuClock, LuExternalLink } from "react-icons/lu";

import type { IPostDate } from "../../types/post";

function PostSource({
	dateParts,
	siteName,
	postUrl,
}: {
	dateParts: IPostDate;
	siteName: string;
	postUrl: string;
}) {
	const postDate = new Date(
		dateParts.year,
		dateParts.month - 1,
		dateParts.day,
		dateParts.hour,
		dateParts.minute,
	).toLocaleDateString("en-US", { dateStyle: "medium" });

	return (
		<div className="mt-4 h-8 flex flex-wrap items-center gap-4 text-neutral-500 max-sm:justify-center max-sm:mt-0 max-sm:mb-4 max-sm:h-fit">
			<div className="flex items-center gap-2 text-sm ">
				<div className="flex items-center gap-1">
					<LuCalendar />
					<span className="font-medium">{postDate}</span>
				</div>
				<div className="flex items-center gap-1">
					<LuClock />
					<span className="font-medium">
						{dateParts.hour}:{String(dateParts.minute).padStart(2, "0")}
					</span>
				</div>
			</div>
			<span className="font-firago font-medium">{siteName}</span>
			<a href={postUrl} target="_blank" className="block h-full">
				<button className="h-full px-3 flex items-center gap-1.5 whitespace-nowrap text-sm font-medium transition-all outline-none border border-neutral-200 shadow-xs rounded-full corner-squircle cursor-pointer hover:bg-cyan-900 hover:text-white max-sm:py-2.5">
					<LuExternalLink />
					<span>წყაროს ნახვა</span>
				</button>
			</a>
		</div>
	);
}

export default PostSource;
