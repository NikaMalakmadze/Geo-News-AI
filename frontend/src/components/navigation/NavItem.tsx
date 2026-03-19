import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import type { TNavItem } from "../../data/navigation";

function NavItem({ url, title, icon: Icon }: TNavItem) {
	return (
		<NavLink
			to={url}
			className={({ isActive }) =>
				twMerge(
					"flex gap-2 items-center px-3 py-2 font-noto text-sm text-neutral-500 hover:bg-neutral-100 rounded-full corner-squircle hover:text-neutral-900 transition-colors focus:outline-none focus:ring-0 outline-none focus:bg-neutral-100 focus:text-neutral-900",
					isActive ? "bg-neutral-100 text-neutral-900" : "",
				)
			}
		>
			<Icon />
			<span className="max-lg:hidden">{title}</span>
		</NavLink>
	);
}

export default NavItem;
