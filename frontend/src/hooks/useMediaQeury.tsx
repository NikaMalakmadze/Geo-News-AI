import React from "react";

function useMediaQeury(query: string) {
	const [matches, setMatches] = React.useState(() => {
		if (typeof window === "undefined") return false;
		return window.matchMedia(query).matches;
	});

	React.useEffect(() => {
		const mediaQueryList = window.matchMedia(query);
		const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

		mediaQueryList.addEventListener("change", listener);
		return () => mediaQueryList.removeEventListener("change", listener);
	}, [query]);

	return matches;
}

export default useMediaQeury;
