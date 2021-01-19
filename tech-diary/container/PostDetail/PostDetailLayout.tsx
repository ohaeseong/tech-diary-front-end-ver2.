import React, {  useCallback } from 'react';
import { ThemeProvider } from '@emotion/react';

import SinglePost from 'components/post/SinglePost';
import { PostDetail } from 'store/types/post.types';
import { NavBar } from 'components/base/NavBar';
import useDarkMode from 'libs/hooks/useDarkMode';
import { color, dark } from 'styles/color';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { requestPostLike } from 'libs/repository';
import useRequest from 'libs/hooks/useRequest';
import { getStorage } from 'libs/storage';
import { DROP_TOAST, SHOW_TOAST } from 'store/modules/toast';
import { server } from 'config/config';
import useForm from 'libs/hooks/useForm';

type Props = {
	post: PostDetail;
};

function PostDetailLayout({ post }: Props) {
	const { id, like, commentList } = post;
	const [theme, toggleTheme, componentMounted] = useDarkMode();

	const [state, onChange, dispatchForUpdateState] = useForm({
		isLike: false,
		isBookMark: false,
		isShareItemOpen: false,
		likeCount: like.length,
		commentList: commentList.commentData,
	});

	const [data, loading, onRequest] = useRequest(requestPostLike);
	const router = useRouter();
	const dispatch = useDispatch();

	const themeMode = theme === 'light';

	const toggleLike = useCallback(() => {
		const token = getStorage('tech-token');
		if (!token) {
			alert('로그인 후 이용해 주세요!');

			return;
		}

		const { isLike, likeCount } = state;

		if (isLike) {
			dispatchForUpdateState({
				name: 'likeCount',
				value: likeCount - 1,
			});
		} else {
			dispatchForUpdateState({
				name: 'likeCount',
				value: likeCount + 1,
			});
		}

		dispatchForUpdateState({
			name: 'isLike',
			value: !isLike,
		});

		const req = {
			postId: id,
			token,
		};

		onRequest(req);
	}, [state, dispatchForUpdateState, id, onRequest]);

	const toggleBookMark = useCallback(() => {
		const token = getStorage('tech-token');
		if (!token) {
			alert('로그인 후 이용해 주세요!');

			return;
		}

		const { isBookMark } = state;

		dispatchForUpdateState({
			name: 'isBookMark',
			value: !isBookMark,
		});
	}, [dispatchForUpdateState, state]);

	const toggleShareItemOpen = useCallback(() => {
		const { isShareItemOpen } = state;

		dispatchForUpdateState({
			name: 'isShareItemOpen',
			value: !isShareItemOpen,
		});
	}, [state, dispatchForUpdateState]);

	const moveToComment = () => {
		if (document.querySelector('body')) {
			const location = document.querySelector('body')?.clientHeight;
			window.scrollTo({ top: location, left: 0, behavior: 'smooth' });
		}
	};

	const closeShareItem = useCallback(() => {
		if (state.isShareItemOpen) {
			const { isShareItemOpen } = state;

			dispatchForUpdateState({
				name: 'isShareItemOpen',
				value: !isShareItemOpen,
			});
		}
	}, [dispatchForUpdateState, state]);

	const copyUrl = () => {
		navigator.clipboard.writeText(`${server.client_url}${router.asPath}`);

		dispatch({
			type: SHOW_TOAST,
			payload: {
				text: '링크 주소를 복사했습니다!',
			},
		});

		setTimeout(() => {
			dispatch({
				type: DROP_TOAST,
			});
		}, 2000);
	};

	if (!componentMounted) {
		return <div />;
	}

	return (
		<>
			<ThemeProvider theme={themeMode ? dark : color}>
				<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={false} />
				<SinglePost
					toggleLike={toggleLike}
					toggleBookMark={toggleBookMark}
					toggleShareItemOpen={toggleShareItemOpen}
					moveToComment={moveToComment}
					closeShareItem={closeShareItem}
					copyUrl={copyUrl}
					dispatchForUpdateState={dispatchForUpdateState}
					optionState={state}
					commentList={state.commentList}
					data={post}
				/>
			</ThemeProvider>
		</>
	);
}

export default PostDetailLayout;
