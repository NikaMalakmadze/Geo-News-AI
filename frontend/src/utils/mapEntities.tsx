import type { JSX } from "react";

import CategoryTag from "../components/elements/CategoryTag";

interface IMapEntitiesProps {
	entities: string[];
	category: string;
}

export function mapEntities({
	entities,
	category,
}: IMapEntitiesProps): JSX.Element[] | null {
	return entities.map((entity, i) => (
		<a
			key={`${category}_${i}`}
			href={`https://www.google.com/search?q=${entity}`}
			target="_blank"
			rel="noopener noreferrer"
		>
			<CategoryTag category={entity} />
		</a>
	));
}
