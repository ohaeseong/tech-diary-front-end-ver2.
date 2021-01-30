import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import jwt from 'jsonwebtoken';

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
import useToggle from 'libs/hooks/useToggle';
import { TypeDecoded } from 'store/types/auth.types';
import { SET_POST_COMMENT_COUNT } from 'store/modules/post.comment.count';

type Props = {
	post: PostDetail;
};

function PostDetailLayout({ post }: Props) {
	const { id, like, commentList, memberId, commentCount } = post;
	const [theme, toggleTheme] = useDarkMode();

	const [state, , dispatchForUpdateState] = useForm({
		isLike: false,
		likeCount: like.length,
	});

	const [commentListData, setCommentListData] = useState(commentList.commentData);

	const [isMine, setIsMine] = useState(false);

	const [bookMarkToggleValue, bookMarkToggle] = useToggle(false);
	const [shareItemOpenToggleValue, shareItemToggle] = useToggle(false);

	const [, , onRequest] = useRequest(requestPostLike);
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

		bookMarkToggle();
	}, [bookMarkToggle]);

	const toggleShareItemOpen = useCallback(
		(action?: string) => {
			if (action === 'close' && shareItemOpenToggleValue) {
				shareItemToggle();
			}

			shareItemToggle();
		},
		[shareItemOpenToggleValue, shareItemToggle]
	);

	const closeShareItem = () => {
		if (shareItemOpenToggleValue) {
			shareItemToggle();
		}
	};
	const moveToComment = () => {
		if (document.querySelector('body')) {
			const location = document.querySelector('body')?.clientHeight;
			window.scrollTo({ top: location, left: 0, behavior: 'smooth' });
		}
	};

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

	useEffect(() => {
		const token = getStorage('tech-token') as string;
		const tokenDecoded = jwt.decode(token) as TypeDecoded;

		if (token) {
			if (tokenDecoded.memberId === memberId) {
				setIsMine(true);
			}
		}
	}, [memberId]);

	useEffect(() => {
		dispatch({
			type: SET_POST_COMMENT_COUNT,
			payload: {
				commentCount,
			},
		});
	}, [commentCount, dispatch]);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
	}, []);

	return (
		<>
			<ThemeProvider theme={themeMode ? dark : color}>
				<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={false} />
				<SinglePost
					toggleLike={toggleLike}
					toggleBookMark={toggleBookMark}
					toggleShareItemOpen={toggleShareItemOpen}
					moveToComment={moveToComment}
					copyUrl={copyUrl}
					dispatchForUpdateState={dispatchForUpdateState}
					isMine={isMine}
					bookMarkToggleValue={bookMarkToggleValue}
					closeShareItem={closeShareItem}
					shareItemOpenToggleValue={shareItemOpenToggleValue}
					optionState={state}
					setCommentList={setCommentListData}
					commentList={commentListData}
					data={post}
				/>
			</ThemeProvider>
		</>
	);
}

export default PostDetailLayout;
