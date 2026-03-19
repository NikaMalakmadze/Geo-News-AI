import React from "react";

function usePageTitle(title: string | undefined) {
	React.useEffect(() => {
		document.title = title ?? "ვერ მოიძებნა...";
	}, [title]);
}

export default usePageTitle;
