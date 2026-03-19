import { LuFileQuestion } from "react-icons/lu";

import GoBackBtn from "../components/post-detail/GoBackBtn";
import usePageTitle from "../hooks/usePageTitle";

function NotFound() {
	usePageTitle("ვერ მოიძებნა...");

	return (
		<div className="min-h-screen px-6 flex items-center justify-center'">
			<div className="max-w-md mx-auto flex flex-col items-center gap-8">
				<div className="rounded-full bg-neutral-300 p-6">
					<LuFileQuestion className="h-12 w-12 text-neutral-500" />
				</div>
				<div className="flex flex-col gap-2 text-center">
					<h3 className="font-firago text-7xl font-bold tracking-tight text-cyan-900">
						404
					</h3>
					<h5 className="text-2xl font-semibold text-neutral-800">
						გვერდი ვერ მოიძებნა
					</h5>
					<p className="text-neutral-500">
						გვერდი, რომელსაც ეძებთ, არ არსებობს ან გადატანილია. გთხოვთ,
						შეამოწმოთ <span className="font-bold">URL</span> ან დაბრუნდეთ მთავარ
						გვერდზე.
					</p>
				</div>
				<GoBackBtn />
			</div>
		</div>
	);
}

export default NotFound;
