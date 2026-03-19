import { Route, Routes } from "react-router-dom";

import PostDetail from "../pages/PostDetail";
import Dashboard from "../pages/Dashboard";
import { RoutePaths } from "./routeTypes";
import NotFound from "../pages/NotFound";
import Analyze from "../pages/Analyze";
import News from "../pages/News";
import AccessKeyProvider from "../providers/AccessKeyProvider";

function AppRoutes() {
	return (
		<div id="content">
			<Routes>
				<Route path={RoutePaths.NEWS} element={<News />}></Route>
				<Route path={RoutePaths.NEWS_DETAILS} element={<PostDetail />}></Route>
				<Route path={RoutePaths.ANALYZE} element={<Analyze />}></Route>
				<Route
					path={RoutePaths.DASHBOARD}
					element={
						<AccessKeyProvider>
							<Dashboard />
						</AccessKeyProvider>
					}
				></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</div>
	);
}

export default AppRoutes;
