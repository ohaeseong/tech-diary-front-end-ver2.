import React from 'react';
import PostTagSearch from 'components/post/PostTagSearch';
import { Post } from 'store/types/post.types';

interface TagPost extends Post {
	tagName: string;
}

type Props = {
	posts: Array<TagPost>;
};

function PostTagSearchContainer({ posts }: Props) {
	return <PostTagSearch posts={posts} />;
}

export default PostTagSearchContainer;
