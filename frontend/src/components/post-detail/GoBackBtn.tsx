import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

function GoBackBtn() {
	const navigate = useNavigate();

	return (
		<button
			className="mb-2 flex gap-2 items-center text-sm text-neutral-500 cursor-pointer hover:text-neutral-900 transition-colors"
			onClick={() => navigate(-1)}
		>
			<LuArrowLeft />
			<span className="font-firago font-medium">უკან დაბრუნება</span>
		</button>
	);
}

export default GoBackBtn;
