import * as SecureStore from 'expo-secure-store';
import { useColorScheme } from 'nativewind';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'system',
    setTheme: () => { },
});

const THEME_KEY = 'user_theme_preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { setColorScheme } = useColorScheme();
    const [theme, setThemeState] = useState<Theme>('system');

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await SecureStore.getItemAsync(THEME_KEY);
            if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
                setTheme(savedTheme);
            }
        } catch (error) {
            console.error('Failed to load theme preference:', error);
        }
    };

    const setTheme = async (newTheme: Theme) => {
        setThemeState(newTheme);
        try {
            await SecureStore.setItemAsync(THEME_KEY, newTheme);
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }

        if (newTheme === 'system') {
            const systemScheme = Appearance.getColorScheme();
            setColorScheme(systemScheme || 'light');
        } else {
            setColorScheme(newTheme);
        }
    };

    // Listen for system changes if mode is system
    useEffect(() => {
        if (theme === 'system') {
            const subscription = Appearance.addChangeListener(({ colorScheme }) => {
                setColorScheme(colorScheme || 'light');
            });
            return () => subscription.remove();
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
