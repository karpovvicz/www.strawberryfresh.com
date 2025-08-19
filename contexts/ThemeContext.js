import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

// Helper function to get system preference
const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Helper function to get stored theme
const getStoredTheme = () => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('strawberryfresh_theme');
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
    return null;
  }
};

export function ThemeProvider({ children }) {
  // Initialize with system preference to prevent flash
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = getStoredTheme();
    return stored || getSystemTheme();
  });
  const [mounted, setMounted] = useState(false);
  const [systemPreference, setSystemPreference] = useState(() => getSystemTheme());

  // Handle system preference changes
  const handleSystemThemeChange = useCallback((e) => {
    const newSystemTheme = e.matches ? 'dark' : 'light';
    setSystemPreference(newSystemTheme);

    // Only auto-switch if user hasn't manually set a preference
    const storedTheme = getStoredTheme();
    if (!storedTheme) {
      setTheme(newSystemTheme);
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    // Set up system preference listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Initial theme setup
    const savedTheme = getStoredTheme();
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      setSystemPreference(systemTheme);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [handleSystemThemeChange]);

  // Apply theme changes to DOM
  useEffect(() => {
    if (mounted) {
      // Update document class
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);

      // Update localStorage
      try {
        localStorage.setItem('strawberryfresh_theme', theme);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#111111' : '#ffffff');
      }
    }
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const setThemeExplicit = useCallback((newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      setTheme: setThemeExplicit,
      mounted,
      systemPreference
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 