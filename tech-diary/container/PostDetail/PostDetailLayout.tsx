import React from 'react';
import { ThemeProvider } from '@emotion/react';

import SinglePost from 'components/post/SinglePost';
import { PostDetail } from 'store/types/post.types';
import { NavBar } from 'components/base/NavBar';
import useDarkMode from 'libs/hooks/useDarkMode';
import { color, dark } from 'styles/color';

type Props = {
	post: PostDetail;
};

function PostDetailLayout({ post }: Props) {
	const [theme, toggleTheme, componentMounted] = useDarkMode();

	const themeMode = theme === 'light';

	if (!componentMounted) {
		return <div />;
	}

	return (
		<>
			<ThemeProvider theme={themeMode ? dark : color}>
				<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={false} />
				<SinglePost data={post} />
			</ThemeProvider>
		</>
	);
}

export default PostDetailLayout;
