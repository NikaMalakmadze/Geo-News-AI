import { twMerge } from "tailwind-merge";
import { LuGhost } from "react-icons/lu";

interface IGhostProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

function Ghost({ className, ...props }: IGhostProps) {
	return (
		<div
			className={twMerge(
				"flex items-center gap-1.5 text-xs text-neutral-500",
				className,
			)}
			{...props}
		>
			<LuGhost />
			<span>აქ არაფერი არ არის...</span>
		</div>
	);
}

export default Ghost;
