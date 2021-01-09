import React from 'react';

import { Post } from 'store/types/post.types';
import PostTemplate from 'components/post/PostTemplate';

type Props = {
	posts: Array<Post>;
};

function PostLayout({ posts }: Props) {
	return <PostTemplate posts={posts} />;
}

export default PostLayout;
