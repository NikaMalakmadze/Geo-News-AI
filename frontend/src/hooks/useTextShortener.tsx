import React from "react";

function useTextShortener<ElementType extends HTMLElement>(
	text: string,
	maxHeight: number,
): React.RefObject<ElementType | null> {
	const textRef = React.useRef<ElementType>(null);

	React.useLayoutEffect(() => {
		const el = textRef.current;
		if (!el) return;

		const words = text.split(" ");
		let low = 0;
		let high = words.length;
		let result = text;

		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			el.textContent = words.slice(0, mid).join(" ") + "...";

			if (el.scrollHeight <= maxHeight) {
				result = el.textContent;
				low = mid + 1;
			} else {
				high = mid - 1;
			}
		}

		el.textContent = result;
	}, [text, maxHeight]);

	return textRef;
}

export default useTextShortener;
