import { LuExternalLink } from "react-icons/lu";
import { Link } from "react-router-dom";

import useTextShortener from "../../hooks/useTextShortener";
import useMediaQeury from "../../hooks/useMediaQeury";
import CategoryTag from "../elements/CategoryTag";
import React from "react";

type TPostHeaderProps = {
	slug: string;
	title: string;
	category: string;
	url: string;
};

function PostHeader({ slug, title, category, url }: TPostHeaderProps) {
	const [maxHeight, setMaxHeight] = React.useState(75);
	const isMobile = useMediaQeury("(max-width: 640px)");
	const titleRef = useTextShortener<HTMLHeadingElement>(title, maxHeight);

	React.useEffect(() => {
		setMaxHeight(isMobile ? 100 : 75);
	}, [isMobile]);

	return (
		<div className="px-6 pb-3 flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<CategoryTag category={category} />
				<a className="cursor-pointer" href={url} target="_blank">
					<LuExternalLink className="text-neutral-400 hover:text-black transition-colors" />
				</a>
			</div>
			<Link to={`/news/${slug}`}>
				<h4
					ref={titleRef}
					style={{ minHeight: maxHeight }}
					className="mt-2 font-noto text-lg font-semibold leading-snug text-balance hover:text-gray-600"
				>
					{title}
				</h4>
			</Link>
		</div>
	);
}

export default PostHeader;
