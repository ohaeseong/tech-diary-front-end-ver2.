import { useEffect, useState } from 'react';

export default function useDarkMode() {
	const [theme, setTheme] = useState('light');
	const [componentMounted, setComponentMounted] = useState(false);

	const setMode = (mode: string) => {
		window.localStorage.setItem('theme', mode);
		setTheme(mode);
	};

	const toggleTheme = () => {
		if (theme === 'light') {
			setMode('dark');
		} else {
			setMode('light');
		}
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem('theme');
		if (localTheme) {
			setTheme(localTheme);
		} else {
			setTheme('light');
			window.localStorage.setItem('theme', 'light');
		}
		setComponentMounted(true);
	}, []);

	return [theme, toggleTheme, componentMounted];
}
