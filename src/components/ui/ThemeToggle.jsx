import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-button bg-bg-card border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-all duration-300"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon size={20} className="animate-fade-in" />
            ) : (
                <Sun size={20} className="animate-fade-in" />
            )}
        </button>
    );
};

export default ThemeToggle;
