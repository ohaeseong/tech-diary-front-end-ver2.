import React from 'react';
import { Post } from 'store/types/post.types';
import PostTagSearch from 'components/post/PostTagSearch';

type Props = {
	posts: Array<Post>;
};

function PostTagSearchContainer({ posts }: Props) {
	return <PostTagSearch posts={posts} />;
}

export default PostTagSearchContainer;
