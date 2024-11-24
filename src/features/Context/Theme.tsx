import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

interface ThemeGlobalI {
    children: ReactNode;
}

interface ThemeI {
    theme: boolean;
    toggle: () => void;
}

export const ThemeContext = createContext<ThemeI | null>(null);

export const ThemeGlobal: FC<ThemeGlobalI> = ({ children }) => {
    const [theme, setTheme] = useState(false);
    useEffect(() => {
        const local = localStorage.getItem('theme');
        if (local) {
            setTheme(JSON.parse(local));
        } else {
            localStorage.setItem('theme', JSON.stringify(theme));
        }
    }, []);

    const toggle = () => {
        setTheme(prevTheme => {
            const newTheme = !prevTheme;
            localStorage.setItem('theme', JSON.stringify(newTheme));
            return newTheme;
        });
    };
    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};
