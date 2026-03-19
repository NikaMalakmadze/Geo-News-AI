import { LuDrama, LuFileText, LuPencil, LuShapes, LuX } from "react-icons/lu";
import { Modal, ScrollArea, Select } from "@mantine/core";
import React from "react";

import {
	analyzeEditModalTextAreaData,
	selectCategoryOptions,
	selectSentimentOptions,
} from "../../../data/daschboard";
import type {
	IAnalyzeFormLists,
	TCategory,
	TSentiment,
} from "../../../types/dashboard";
import PostAnalyzeEditTextArea from "./PostAnalyzeEditTextArea";
import useTablePostsCtx from "../../../hooks/useTablePostsCtx";
import CustomSelectOption from "./CustomSelectOption";
import { arrToString } from "../../../utils/helpers";

function PostAnalyzeEditModal() {
	const { currentAnalyze, editModalOpened, closeEditModal, onEditModalSubmit } =
		useTablePostsCtx();

	const [sentiment, setSentiment] = React.useState<TSentiment | null>(null);
	const [category, setCategory] = React.useState<TCategory | null>(null);
	const [summary, setSummary] = React.useState<string>();

	const [form, setForm] = React.useState<IAnalyzeFormLists>();

	const set = (key: keyof IAnalyzeFormLists) => (val: string) =>
		setForm(f => ({ ...(f as IAnalyzeFormLists), [key]: val }));

	React.useEffect(() => {
		if (!currentAnalyze) return;

		setForm({
			cities: arrToString(currentAnalyze.cities),
			persons: arrToString(currentAnalyze.persons),
			keywords: arrToString(currentAnalyze.keywords),
			countries: arrToString(currentAnalyze.countries),
			organizations: arrToString(currentAnalyze.organizations),
		});
		setCategory(currentAnalyze.predictedCategory as TCategory);
		setSentiment(currentAnalyze.sentiment as TSentiment);
		setSummary(currentAnalyze.summary);
	}, [currentAnalyze]);

	if (!currentAnalyze) return;
	if (!form) return;

	return (
		<Modal
			size={"lg"}
			opened={editModalOpened}
			onClose={closeEditModal}
			title={"პოსტის ანალიზის რედაქტირება"}
			scrollAreaComponent={ScrollArea.Autosize}
			centered
		>
			<div className="flex flex-1 flex-col gap-6 overflow-auto">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2 text-lg">
						<LuDrama />
						<h3 className="font-firago font-semibold">სენტიმენტი</h3>
					</div>
					<Select
						value={sentiment}
						renderOption={CustomSelectOption}
						onChange={selected => setSentiment(selected as TSentiment)}
						data={selectSentimentOptions}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2 text-lg">
						<LuShapes />
						<h3 className="font-firago font-semibold">კატეგორია</h3>
					</div>
					<Select
						value={category}
						renderOption={CustomSelectOption}
						onChange={selected => setCategory(selected as TCategory)}
						data={selectCategoryOptions}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2 text-lg">
						<LuFileText />
						<h3 className="font-firago font-semibold">AI შინაარსი</h3>
					</div>
					<textarea
						className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-700 placeholder:text-neutral-400 resize-none focus:outline-none focus:ring-2 focus:ring-neutral-200 hover:border-neutral-300 transition-colors leading-relaxed"
						rows={4}
						value={summary}
						onChange={e => setSummary(e.currentTarget.value)}
					></textarea>
				</div>
				{Object.entries(analyzeEditModalTextAreaData).map(item => {
					const val = item[0] as keyof IAnalyzeFormLists;
					return (
						<PostAnalyzeEditTextArea
							key={`textInput_${val}`}
							title={item[1].title}
							Icon={item[1].Icon}
							value={form[val]}
							valueType={val}
							onChange={e => set(val)(e.currentTarget.value)}
						/>
					);
				})}
				<div className="flex items-center justify-between">
					<button
						onClick={closeEditModal}
						className="w-fit h-9 px-4 py-2 flex items-center justify-center gap-2 whitespace-nowrap border border-neutral-200 rounded-md text-sm font-medium font-noto transition-all hover:bg-neutral-200/80 outline-none cursor-pointer"
					>
						<LuX />
						<span>გაუქმება</span>
					</button>
					<button
						onClick={() =>
							onEditModalSubmit({
								sentiment: sentiment as string,
								predictedCategory: category as string,
								summary: summary as string,
								cities: form.cities.split(","),
								countries: form.countries.split(","),
								keywords: form.keywords.split(","),
								organizations: form.organizations.split(","),
								persons: form.persons.split(","),
							})
						}
						className="w-fit h-9 px-4 py-2 flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-white font-medium font-noto transition-all outline-none bg-cyan-900 hover:bg-cyan-900/80 cursor-pointer"
					>
						<LuPencil />
						<span>შეცვლა</span>
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default PostAnalyzeEditModal;
