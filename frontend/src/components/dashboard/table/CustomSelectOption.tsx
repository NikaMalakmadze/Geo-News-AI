import { Group, type SelectProps } from "@mantine/core";
import { LuCheck } from "react-icons/lu";

import { isTSentiment } from "../../../types/typeGuards";
import SentimentTag from "../../elements/SentimentTag";
import CategoryTag from "../../elements/CategoryTag";

function CustomSelectOption({
	option,
	checked,
}: Parameters<NonNullable<SelectProps["renderOption"]>>[0]) {
	return (
		<Group flex="1" gap="xs">
			{isTSentiment(option.value) ? (
				<SentimentTag sentiment={option.value} />
			) : (
				<CategoryTag category={option.value} />
			)}

			{checked && <LuCheck className="ml-auto text-lg text-neutral-500" />}
		</Group>
	);
}

export default CustomSelectOption;
