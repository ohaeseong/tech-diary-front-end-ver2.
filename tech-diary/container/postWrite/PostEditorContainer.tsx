import React from 'react';
import PostEditor from 'components/write/PostEditor';
import { ThemeProvider } from '@emotion/react';
import useDarkMode from 'libs/hooks/useDarkMode';
import { color, dark } from 'styles/color';

function PostEditorContainer() {
	const [theme, toggleTheme] = useDarkMode();
	const themeMode = theme === 'light';

	return (
		<ThemeProvider theme={themeMode ? dark : color}>
			<PostEditor />
		</ThemeProvider>
	);
}

export default PostEditorContainer;
