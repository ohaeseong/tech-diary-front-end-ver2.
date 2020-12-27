import styled from '@emotion/styled';

import PostList from 'components/post/PostList';
import { Post } from 'store/types/post.types';

const PostLayoutTemplate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 100%;
    margin: 3rem auto;
`;

const ContentsHeader = styled.div`
    width: 100%;
    height: 3rem;

    font-size: 2rem;
    line-height: 50px;
    padding-left: 20px;
    margin-bottom: 1rem;

    /* border: 1px solid black; */
`;

type Props = {
    posts: Array<Post>,
}

function PostLayout({ posts }: Props) {
    return (
        <PostLayoutTemplate>
            <ContentsHeader>
                All
            </ContentsHeader>
            <PostList posts={posts}/>
        </PostLayoutTemplate>
    );
}

export default PostLayout;