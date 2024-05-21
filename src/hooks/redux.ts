import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, Approot, Appstore } from "../redux/store";



export const useAppDispatchA = ()=>useDispatch<AppDispatch>()
export const useAppSelectorA:TypedUseSelectorHook<Approot>=useSelector;