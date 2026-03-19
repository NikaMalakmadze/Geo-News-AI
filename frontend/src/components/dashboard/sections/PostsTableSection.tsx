import { ScrollArea } from "@mantine/core";

import TablePostsProvider from "../../../providers/TablePostsProvider";
import usePostsTableQuery from "../../../hooks/usePostsTableQuery";
import PostAnalyzeEditModal from "../table/PostAnalyzeEditModal";
import PostsTableFooter from "../table/PostsTableFooter";
import PostsTableHeader from "../table/PostsTableHeader";
import PostsTable from "../table/PostsTable";
import Card from "../../elements/Card";

function PostsTableSection() {
	usePostsTableQuery();

	return (
		<div className="py-4">
			<Card className="px-0!">
				<TablePostsProvider>
					<ScrollArea>
						<PostsTableHeader />
						<PostsTable />
						<PostsTableFooter />
						<PostAnalyzeEditModal />
					</ScrollArea>
				</TablePostsProvider>
			</Card>
		</div>
	);
}

export default PostsTableSection;
