import { getStorage, setStorage } from 'libs/storage';
import { useEffect, useState } from 'react';

export default function useDarkMode() {
	const [theme, setTheme] = useState('light');
	const [componentMounted, setComponentMounted] = useState(false);

	const setMode = (mode: string) => {
		setStorage('theme', mode);
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
		const localTheme = getStorage<string>('theme');
		if (localTheme) {
			setTheme(localTheme);
		} else {
			setTheme('light');
			setStorage('theme', 'light');
		}
		setComponentMounted(true);
	}, []);

	return [theme, toggleTheme, componentMounted];
}
