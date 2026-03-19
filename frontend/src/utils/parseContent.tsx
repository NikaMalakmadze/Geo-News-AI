export type ContentBlock =
	| { type: "text"; content: string }
	| { type: "image"; src: string };

export function parseContent(contentRaw: string): ContentBlock[] {
	const regex = /\[IMAGE:(.*?)\]/g;
	const blocks: ContentBlock[] = [];

	let lastIndex = 0;
	let match;

	while ((match = regex.exec(contentRaw)) !== null) {
		const text = contentRaw.slice(lastIndex, match.index).trim();
		if (text) blocks.push({ type: "text", content: text });

		blocks.push({ type: "image", src: match[1] });

		lastIndex = regex.lastIndex;
	}

	const remaining = contentRaw.slice(lastIndex).trim();
	if (remaining) blocks.push({ type: "text", content: remaining });

	return blocks;
}

export function renderTextBlock(text: string) {
	return text
		.split("\n\n")
		.map((paragraph, i) =>
			paragraph ? <p key={i}>{paragraph.trim()}</p> : null,
		);
}
