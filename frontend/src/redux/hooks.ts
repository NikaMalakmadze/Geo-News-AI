import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from "react-redux";

import type { AppDisptch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDisptch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
