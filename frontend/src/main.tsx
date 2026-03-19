import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";

import "mantine-datatable/styles.css";
import "@mantine/core/styles.css";
import "@fontsource/firago";

import { store } from "./redux/store.ts";
import App from "./App.tsx";
import "./styles/index.css";

import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MantineProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</MantineProvider>
	</StrictMode>,
);
