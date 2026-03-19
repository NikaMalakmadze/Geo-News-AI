import { LuSparkles } from "react-icons/lu";

function HeaderLogo() {
	return (
		<div className="flex gap-2.5 items-center">
			<div className="h-8 w-8 rounded-full corner-squircle bg-cyan-900 flex justify-center items-center">
				<LuSparkles size={16} color="white" />
			</div>
			<h5 className="font-noto font-bold max-lg:hidden max-sm:block">
				ქართული ამბების AI
			</h5>
		</div>
	);
}

export default HeaderLogo;
