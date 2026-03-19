import { LuGhost } from "react-icons/lu";

function PostNothing() {
	return (
		<div className="mt-12">
			<div className="max-w-7xl h-100 mx-auto px-6 py-4 flex items-center justify-center bg-neutral-100/10 rounded-xl text-neutral-500">
				<div className="flex flex-col items-center gap-5">
					<LuGhost className="w-12 h-12 md:w-40 md:h-40" />
					<p className="font-firago text-xs md:text-2xl text-center">
						პოსტები ვერ მოიძებნა ან ისინი საერთოთ არ არიან...
					</p>
				</div>
			</div>
		</div>
	);
}

export default PostNothing;
