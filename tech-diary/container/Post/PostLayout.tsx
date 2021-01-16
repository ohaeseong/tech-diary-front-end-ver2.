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
	const [isEarlyData, setIsEarlyData] = useState(true);
	const { postData, setLimit, limit } = usePost('blog', kinds[2]);

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

	useEffect(() => {
		window.addEventListener('scroll', handlePostData);

		return () => {
			window.removeEventListener('scroll', handlePostData);
		};
	}, [handlePostData]);

	useEffect(() => {
		if (postData.length !== 0) {
			setIsEarlyData(false);
		}
	}, [postData.length, setIsEarlyData]);

	return <PostTemplate posts={posts} postList={postList} isEarlyData={isEarlyData} headName={headName} />;
}

export default PostLayout;
