import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type UseActionReturnType = (...args: any) => Promise<any>;

export const useAction = (action: any, deps: any = []): UseActionReturnType => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(action, dispatch),
    deps ? [dispatch, ...deps] : [dispatch]
  );
};
