import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
// import jwt from 'jsonwebtoken';

import SinglePost from 'components/post/SinglePost';
import { PostDetail } from 'store/types/post.types';
import { NavBar } from 'components/base/NavBar';
import useDarkMode from 'libs/hooks/useDarkMode';
import { color, dark } from 'styles/color';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { requestDeletePost, requestPostLike, requestBookmark, requestIsCheckBookmark } from 'libs/repository';
import useRequest from 'libs/hooks/useRequest';
import { getStorage } from 'libs/storage';
// import { DROP_TOAST, SHOW_TOAST } from 'store/modules/toast';
import { toast } from 'react-toastify';
import { server } from 'config/config';
import useForm from 'libs/hooks/useForm';
import useToggle from 'libs/hooks/useToggle';
import { UserInfo } from 'store/types/auth.types';
import { SET_POST_COMMENT_COUNT } from 'store/modules/post.comment.count';
import ConfirmModal from 'components/common/ConfirmModal';

type Props = {
	post: PostDetail;
};

function PostDetailLayout({ post }: Props) {
	const { id, like, commentList, memberId, commentCount } = post;
	const [theme, toggleTheme, componentMounted] = useDarkMode();

	const [state, , dispatchForUpdateState] = useForm({
		isLike: false,
		likeCount: like.length,
	});

	const [commentListData, setCommentListData] = useState(commentList.commentData);

	// const [isMine, setIsMine] = useState(false);

	const [shareItemOpenToggleValue, shareItemToggle] = useToggle(false);
	const [modalIsOpenValue, modalOpenToggle] = useToggle(false);
	const [bookMarkToggleValue, bookMarkToggle] = useState(false);
	const [isCheckBookmark, setIsCheckBookmark] = useState(false);

	const [, , onLikePost] = useRequest(requestPostLike);
	const [, , onDeleteRequest] = useRequest(requestDeletePost);
	const [, , onBookmark] = useRequest(requestBookmark);
	const [checkBookmarkRes, , checkBookmark] = useRequest(requestIsCheckBookmark);
	const router = useRouter();
	const dispatch = useDispatch();

	const themeMode = theme === 'light';

	const onDeletePost = useCallback(async () => {
		const token = getStorage('tech-token') as string;

		const req = {
			token,
			postId: id,
		};

		await onDeleteRequest(req);

		router.back();
	}, [id, onDeleteRequest, router]);

	const goEditPostPage = useCallback(() => {
		const userInfo = getStorage('user-info') as UserInfo;
		if (memberId === userInfo.memberId) {
			router.push(`/write?id=${id}`);
		}
	}, [id, memberId, router]);

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

		onLikePost(req);
	}, [state, dispatchForUpdateState, id, onLikePost]);

	const toggleBookMark = useCallback(async () => {
		const token = getStorage('tech-token');
		if (!token) {
			alert('로그인 후 이용해 주세요!');

			return;
		}

		const req = {
			token,
			postId: id,
		};

		await onBookmark(req);

		bookMarkToggle(!bookMarkToggleValue);
	}, [bookMarkToggleValue, id, onBookmark]);

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

		const toastMassege = '링크 주소 복사';

		toast.success(toastMassege, {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

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

	useEffect(() => {
		const userInfo = getStorage('user-info') as UserInfo;

		if (!checkBookmarkRes && userInfo) {
			const req = {
				memberId: userInfo.memberId,
				postId: id,
			};
			checkBookmark(req);
		}

		if (checkBookmarkRes && checkBookmarkRes.data.isBookmark) {
			setIsCheckBookmark(true);
		}
	}, [checkBookmark, checkBookmarkRes, id, memberId]);

	useEffect(() => {
		bookMarkToggle(isCheckBookmark);
	}, [isCheckBookmark]);

	if (!componentMounted) {
		return <div />;
	}

	return (
		<>
			<ThemeProvider theme={themeMode ? dark : color}>
				{modalIsOpenValue ? (
					<ConfirmModal
						modalToggle={modalOpenToggle}
						acceptFuc={onDeletePost}
						confirmMessage="정말 삭제하시겠습니까?"
					/>
				) : (
					<></>
				)}
				<NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={false} />
				<SinglePost
					toggleLike={toggleLike}
					toggleBookMark={toggleBookMark}
					toggleShareItemOpen={toggleShareItemOpen}
					moveToComment={moveToComment}
					copyUrl={copyUrl}
					dispatchForUpdateState={dispatchForUpdateState}
					openConfirmModal={modalOpenToggle}
					goEditPostPage={goEditPostPage}
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
