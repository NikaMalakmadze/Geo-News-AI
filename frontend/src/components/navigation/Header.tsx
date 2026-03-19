import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { navItems } from "../../data/navigation";
import HeaderLogo from "./HeaderLogo";
import NavSearch from "./NavSearch";
import NavItem from "./NavItem";

function Header() {
	const location = useLocation();
	const isNews = location.pathname === "/";

	return (
		<header className="sticky top-0 z-10 border-b border-neutral-200 bg-neutral-50/80 backdrop-blur-md">
			<div
				className={twMerge(
					"max-w-7xl h-16 mx-auto px-6 flex items-center max-sm:flex-col max-sm:gap-4 max-sm:h-fit max-sm:py-6",
					isNews ? "justify-between" : "justify-center",
				)}
			>
				<div className="w-fit flex items-center gap-8 max-sm:flex-col max-sm:gap-4">
					<HeaderLogo />
					<nav className="flex items-center gap-1">
						{navItems.map((item, i) => (
							<NavItem key={`nav-item-${i}`} {...item} />
						))}
					</nav>
				</div>
				{isNews && <NavSearch />}
			</div>
		</header>
	);
}

export default Header;
