import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, Approot } from '../redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<Approot> = useSelector;
