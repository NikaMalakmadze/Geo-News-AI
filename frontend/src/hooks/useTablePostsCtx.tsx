import React from "react";

import type { ITablePostsContextValue } from "../contexts/TablePostsContext";
import TablePostsContext from "../contexts/TablePostsContext";

function useTablePostsCtx(): ITablePostsContextValue {
	const ctx = React.useContext(TablePostsContext);
	if (!ctx) {
		throw Error("context is used outside of provider!");
	}
	return ctx;
}

export default useTablePostsCtx;
