import React from "react";

import DashboardContext, {
	type IDashboardContextValue,
} from "../contexts/DashboardContext";

function useDashboardCtx(): IDashboardContextValue {
	const ctx = React.useContext(DashboardContext);
	if (!ctx) {
		throw Error("context is used outside of provider!");
	}
	return ctx;
}

export default useDashboardCtx;
