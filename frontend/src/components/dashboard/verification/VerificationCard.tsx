import VerificationForm from "./VerificationForm";
import { LuShieldCheck } from "react-icons/lu";

import Card from "../../elements/Card";

function VerificationCard() {
	return (
		<div className="h-[calc(100vh-127px)] sm:h-[calc(100vh-65px)] mx-4 flex items-center justify-center">
			<Card className="px-6 gap-6">
				<div className="flex flex-col items-center gap-2">
					<div className="h-14 w-14 mb-4 flex items-center justify-center rounded-full bg-neutral-200 text-2xl text-cyan-900">
						<LuShieldCheck />
					</div>
					<h4 className="text-xl font-semibold">ადმინის გვერდი</h4>
					<p className="text-center text-sm text-neutral-500">
						მიუთითეთ თქვენი API გასაღები რათა მიიღოთ წვდომა ადმინის გვერდზე
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<VerificationForm />
					<p className="pt-2 border-t border-neutral-200 text-center text-xs text-neutral-500">
						თქვენ უნდა იყოთ სუპერ სანდო ტიპი რათა გქონდეთ API გასაღები
					</p>
				</div>
			</Card>
		</div>
	);
}

export default VerificationCard;
