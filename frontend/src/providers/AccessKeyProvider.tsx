import axios from "axios";
import React from "react";

import AccessKeyContext, {
	type IAccessKeyContext,
} from "../contexts/AccessKeyContext";

function AccessKeyProvider({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) {
	const [key, setKey] = React.useState<string>("");
	const [status, setStatus] = React.useState<"idle" | "success" | "reject">(
		"idle",
	);

	const verifyKey = React.useCallback(async () => {
		try {
			const { status } = await axios.get(import.meta.env.VITE_VERIFY_KEY_URL, {
				headers: { "X-Admin-Key": key },
			});
			if (status === 200) {
				sessionStorage.setItem("key", key);
				setStatus("success");
			}
		} catch {
			sessionStorage.removeItem("key");
			setStatus("reject");
		}
	}, [key]);

	React.useEffect(() => {
		const sessionKey = sessionStorage.getItem("key");
		if (sessionKey) {
			setStatus("success");
			setKey(sessionKey);
		}
	}, []);

	const value: IAccessKeyContext = {
		key,
		status,
		setKey: (value: string) => setKey(value),
		verifyKey,
	};

	return (
		<AccessKeyContext.Provider value={value}>
			{children}
		</AccessKeyContext.Provider>
	);
}

export default AccessKeyProvider;
