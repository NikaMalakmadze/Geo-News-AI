import { LuKey, LuShieldCheck } from "react-icons/lu";
import { PasswordInput } from "@mantine/core";

import useAccessKeyCtx from "../../../hooks/useAccessKeyCtx";

function VerificationForm() {
	const { status, key, setKey, verifyKey } = useAccessKeyCtx();

	return (
		<form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
			<div>
				<label htmlFor="api-key" className="text-sm font-medium">
					API გასაღები
				</label>
				<PasswordInput
					id="api-key"
					value={key}
					leftSection={<LuKey />}
					placeholder="შეიყვანეთ თქვენი API გასაღები"
					onChange={e => setKey(e.currentTarget.value)}
				/>
				{status === "reject" && (
					<div className="mt-3 px-3 py-2 bg-red-600/10 text-red-600 text-sm rounded-md">
						არასწორი API გასაღები
					</div>
				)}
			</div>
			<button
				onClick={verifyKey}
				className="w-full h-9 px-4 py-2 flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-white font-medium font-noto transition-all outline-none bg-cyan-900 hover:bg-cyan-900/80 cursor-pointer"
			>
				<LuShieldCheck />
				<span>გაგრძელება</span>
			</button>
		</form>
	);
}

export default VerificationForm;
