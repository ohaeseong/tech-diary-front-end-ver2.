import React, { useCallback, useEffect, useState } from 'react';
import SinglePost from 'components/post/SinglePost';
import { FollowInfo, PostDetail, PostLink } from 'store/types/post.types';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
	requestDeletePost,
	requestPostLike,
	requestBookmark,
	requestIsCheckBookmark,
	requestIsFollow,
	requestGetFollowInfo,
} from 'libs/repository';

import remark from 'remark';
import htmlPlugin from 'remark-html';
import { parseHeading } from 'libs/heading';
import useRequest from 'libs/hooks/useRequest';
import { getStorage } from 'libs/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { server } from 'config/config';
import useForm from 'libs/hooks/useForm';
import useToggle from 'libs/hooks/useToggle';
import { TypeDecoded, UserInfo } from 'store/types/auth.types';
import { SET_POST_COMMENT_COUNT } from 'store/modules/post.comment.count';
import ConfirmModal from 'components/common/ConfirmModal';

type Props = {
	post: PostDetail;
};

function PostDetailLayout({ post }: Props) {
	const { id, like, commentList, memberId, commentCount, url } = post;

	const [state, , dispatchForUpdateState] = useForm({
		isLike: false,
		likeCount: like.length,
	});

	const [commentListData, setCommentListData] = useState(commentList.commentData);

	const [shareItemOpenToggleValue, shareItemToggle] = useToggle(false);
	const [modalIsOpenValue, modalOpenToggle] = useToggle(false);
	const [bookMarkToggleValue, bookMarkToggle] = useState(false);
	const [isCheckBookmark, setIsCheckBookmark] = useState(false);
	const [userIsLike, setUserIsLike] = useState(false);
	const [isMine, setIsMine] = useState(false);
	const [userIsFollow, setUserIsFollow] = useState(false);
	const [headingLinks, setHeadingLinks] = useState([] as PostLink[]);
	const [headingElements, setHeadingElements] = useState([] as any);

	const [, , onLikePost] = useRequest(requestPostLike);
	const [, , onDeleteRequest] = useRequest(requestDeletePost);
	const [, , onBookmark] = useRequest(requestBookmark);
	const [checkBookmarkRes, , checkBookmark] = useRequest(requestIsCheckBookmark);
	const [, , onGetFollowInfo, ,] = useRequest(requestGetFollowInfo, true);
	const router = useRouter();
	const dispatch = useDispatch();

	const [, , onRequestIsFollow, ,] = useRequest(requestIsFollow);

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
			router.push(`/write?id=${id}&update=1`);
		}
	}, [id, memberId, router]);

	const toggleLike = useCallback(() => {
		const token = getStorage('tech-token');
		if (!token) {
			toast.warning('로그인 후 이용해 주세요!', {
				position: toast.POSITION.TOP_RIGHT,
			});

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
			toast.warning('로그인 후 이용해 주세요', {
				position: toast.POSITION.TOP_RIGHT,
			});

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

	const closeShareItem = useCallback(() => {
		if (shareItemOpenToggleValue) {
			shareItemToggle();
		}
	}, [shareItemOpenToggleValue, shareItemToggle]);
	const moveToComment = () => {
		if (document.querySelector('body')) {
			const location = document.querySelector('body')?.clientHeight;
			window.scrollTo({ top: location, left: 0, behavior: 'smooth' });
		}
	};

	const copyUrl = useCallback(() => {
		navigator.clipboard.writeText(`${server.client_url}${router.asPath}`);

		const toastMassege = '링크 주소 복사';

		toast.success(toastMassege, {
			position: toast.POSITION.TOP_RIGHT,
		});
	}, [router.asPath]);

	const isFollowMember = useCallback(async () => {
		const token = getStorage('tech-token');

		if (!token) {
			toast.warning('로그인 후 이용해 주세요', {
				position: toast.POSITION.TOP_RIGHT,
			});

			return;
		}

		const requestMemberId = getStorage('user-info') as UserInfo;
		const followMemberId = memberId;

		if (requestMemberId.memberId === followMemberId) return;

		const req = {
			memberId: requestMemberId.memberId,
			followMemberId,
			token,
		};

		await onRequestIsFollow(req);

		setUserIsFollow(!userIsFollow);
	}, [memberId, onRequestIsFollow, userIsFollow]);

	const sharePostToFacebook = useCallback(() => {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${server.client_url}${url}`,
			'new',
			'width=600, height=700, left=0, top=0 '
		);
	}, [url]);

	const sharePostToTwitter = useCallback(() => {
		window.open(
			`https://www.twitter.com/intent/tweet?&url=${server.client_url}${url}`,
			'new',
			'width=600, height=700, left=0, top=0 '
		);
	}, [url]);

	useEffect(() => {
		dispatch({
			type: SET_POST_COMMENT_COUNT,
			payload: {
				commentCount,
			},
		});
	}, [commentCount, dispatch]);

	useEffect(() => {
		const userInfo = getStorage('user-info') as UserInfo;
		if (userInfo) {
			const req = {
				memberId: userInfo.memberId,
				type: 'following',
			};
			const response = onGetFollowInfo(req);
			if (response) {
				response.then((data) => {
					data.data.memberList.forEach((member: FollowInfo) => {
						if (member.following === memberId) {
							setUserIsFollow(true);
						}
					});
				});
			}
		}
	}, [commentCount, memberId, onGetFollowInfo, userIsFollow]);

	useEffect(() => {
		const token = getStorage('tech-token') as string;
		const tokenDecoded = jwt.decode(token) as TypeDecoded;

		if (tokenDecoded) {
			like.forEach((likeData) => {
				if (likeData.memberId === tokenDecoded.memberId.toString()) {
					setUserIsLike(true);
				}
			});

			if (tokenDecoded.memberId === memberId) {
				setIsMine(true);
			}
		}
	}, [like, memberId]);

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

	useEffect(() => {
		if (post.contents) {
			let html = '';
			remark()
				.use(htmlPlugin)
				.process(post.contents, (err: any, file: any) => {
					if (err) console.log(err);
					html = String(file);
				});
			const headingLinkList = parseHeading(html, post.url);
			setHeadingLinks(headingLinkList.headings);
			setHeadingElements(headingLinkList.headingElements);
		}
	}, [post.contents, post.url]);

	useEffect(() => {
		if (headingElements.length !== 0) {
			const headings = document.querySelectorAll('h1, h2, h3');
			headings.forEach((element, index) => {
				element.id = headingElements[index].id;
			});
		}
	}, [headingElements]);

	return (
		<>
			{modalIsOpenValue ? (
				<ConfirmModal modalToggle={modalOpenToggle} acceptFuc={onDeletePost} confirmMessage="정말 삭제하시겠습니까?" />
			) : (
				<></>
			)}
			<SinglePost
				copyUrl={copyUrl}
				toggleLike={toggleLike}
				moveToComment={moveToComment}
				goEditPostPage={goEditPostPage}
				closeShareItem={closeShareItem}
				isFollowMember={isFollowMember}
				toggleBookMark={toggleBookMark}
				openConfirmModal={modalOpenToggle}
				setCommentList={setCommentListData}
				sharePostToTwitter={sharePostToTwitter}
				toggleShareItemOpen={toggleShareItemOpen}
				sharePostToFacebook={sharePostToFacebook}
				dispatchForUpdateState={dispatchForUpdateState}
				shareItemOpenToggleValue={shareItemOpenToggleValue}
				bookMarkToggleValue={bookMarkToggleValue}
				commentList={commentListData}
				userIsFollow={userIsFollow}
				userIsLike={userIsLike}
				linkList={headingLinks}
				optionState={state}
				isMine={isMine}
				data={post}
			/>
		</>
	);
}

export default PostDetailLayout;
