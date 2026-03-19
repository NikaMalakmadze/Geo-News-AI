import React from "react";
import AccessKeyContext, {
	type IAccessKeyContext,
} from "../contexts/AccessKeyContext";

function useAccessKeyCtx(): IAccessKeyContext {
	const ctx = React.useContext(AccessKeyContext);
	if (!ctx) {
		throw Error("context is used outside of provider!");
	}
	return ctx;
}

export default useAccessKeyCtx;
