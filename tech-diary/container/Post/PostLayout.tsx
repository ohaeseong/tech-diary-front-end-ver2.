import styled from '@emotion/styled';

import PostList from 'components/post/PostList';
import { Post } from 'store/types/post.types';

const PostLayoutTemplate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 100%;
    margin: 10rem auto;
`;

type Props = {
    posts: Array<Post>,
}

function PostLayout({ posts }: Props) {
    return (
        <PostLayoutTemplate>
            <PostList posts={posts}/>
        </PostLayoutTemplate>
    );
}

export default PostLayout;