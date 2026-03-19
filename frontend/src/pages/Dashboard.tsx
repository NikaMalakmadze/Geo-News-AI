import VerificationCard from "../components/dashboard/verification/VerificationCard";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardProvider from "../providers/DashboardProvider";
import useAccessKeyCtx from "../hooks/useAccessKeyCtx";
import usePageTitle from "../hooks/usePageTitle";

function Dashboard() {
	usePageTitle("სტატისტიკა");
	const { status } = useAccessKeyCtx();

	return (
		<div className="bg-neutral-50/80">
			{status === "success" ? (
				<DashboardProvider>
					<div className="h-fit relative overflow-hidden border-b border-neutral-200">
						<div className="absolute inset-0 overflow-hidden">
							<div className="absolute -top-1/2 left-1/4 h-96 w-96 rounded-full bg-cyan-900/10 blur-3xl"></div>
							<div className="absolute -top-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-900/10 blur-3xl"></div>
						</div>
						<div className="max-w-7xl h-full mx-auto px-6 py-12">
							<div className="max-w-4xl">
								<h1 className="font-firago text-4xl tracking-tight">
									სტატისტიკის გვერდი
								</h1>
								<h3 className="mt-4 text-lg text-neutral-500 text-pretty">
									შეგროვებული პოსტებისა და ხელოვნური ინტელექტის ანალიზის
									მიმოხილვა
								</h3>
							</div>
						</div>
					</div>
					<DashboardContent />
				</DashboardProvider>
			) : (
				<VerificationCard />
			)}
		</div>
	);
}

export default Dashboard;
