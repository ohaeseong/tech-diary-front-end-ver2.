import React, { useCallback, useEffect, useState } from 'react';

import { Post } from 'store/types/post.types';
import PostTemplate from 'components/post/PostTemplate';
import { useRouter } from 'next/router';
import usePost from 'libs/hooks/usePost';

type Props = {
	posts: Array<Post>;
};

function PostLayout({ posts }: Props) {
	const router = useRouter();
	const kinds = router.pathname.split('/');

	let headName = '';

	// router 별 headname 설정
	switch (router.pathname) {
		case '/blog/front-end':
			headName = 'Front-End';
			break;
		case '/blog/back-end':
			headName = 'Back-End';
			break;
		case '/blog/database':
			headName = 'Database';
			break;
		case '/blog/other':
			headName = 'Other';
			break;

		default:
			headName = 'All';
			break;
	}
	const [postList, setPostList] = useState(posts);

	// 우선 blog로 설정 이후에 로직 변경 예정
	const { postData, setLimit, limit } = usePost('blog', kinds[2]);

	// 추가 데이터 요청
	const handlePostData = useCallback(() => {
		const { innerHeight } = window;
		const { scrollHeight } = document.body;

		const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

		if (scrollHeight - innerHeight - scrollTop < 100) {
			if (postData.length + 10 < limit) {
				return;
			}
			setLimit(limit + 10);

			setPostList(postData);
		}
	}, [limit, postData, setLimit]);

	// scroll 이벤트 리스너
	useEffect(() => {
		window.addEventListener('scroll', handlePostData);

		return () => {
			window.removeEventListener('scroll', handlePostData);
		};
	}, [handlePostData]);

	return <PostTemplate postList={postList} headName={headName} />;
}

export default PostLayout;
