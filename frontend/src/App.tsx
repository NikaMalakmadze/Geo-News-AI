import Header from "./components/navigation/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
	return (
		<div className="h-full">
			<Header />
			<AppRoutes />
		</div>
	);
}

export default App;
