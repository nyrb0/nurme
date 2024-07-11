import { Dispatch, SetStateAction, createContext } from 'react';

interface MenuI {
    menu: boolean;
    setMenu: Dispatch<SetStateAction<boolean>>;
}

export const menuContext = createContext<MenuI | null>(null);
