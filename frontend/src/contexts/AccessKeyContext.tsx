import React from "react";

export interface IAccessKeyContext {
	key: string;
	status: "idle" | "success" | "reject";
	setKey: (value: string) => void;
	verifyKey: () => void;
}

const AccessKeyContext = React.createContext<IAccessKeyContext | null>(null);

export default AccessKeyContext;
