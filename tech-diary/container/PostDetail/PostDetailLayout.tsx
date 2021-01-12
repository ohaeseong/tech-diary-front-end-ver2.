import React from 'react';
import { ThemeProvider } from '@emotion/react';

import SinglePost from 'components/post/detail/SinglePost';
import { Post, PostDetail } from 'store/types/post.types';
import { NavBar } from 'components/base/NavBar';
import useDarkMode from 'libs/hooks/useDarkMode';
import { color, dark } from 'styles/color';
import PostLikeOption from 'components/post/detail/PostLikeOption';

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
