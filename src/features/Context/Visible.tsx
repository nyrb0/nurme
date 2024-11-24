import React, { createContext } from 'react';

export interface VisibleI {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const isVisibleContext = createContext<VisibleI | undefined>(undefined);
