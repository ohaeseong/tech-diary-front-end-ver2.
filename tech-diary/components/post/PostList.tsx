import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { GET_POST_LIST_REQUEST } from 'store/modules/post';
import { Post } from 'store/types/post.types';

const PostListTemplate = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, auto));
    grid-template-rows: repeat(auto-fit, 1fr);
    column-gap: 2rem;
    row-gap: 2rem;

    border: 1px solid black;
    

`;

type Props = {
    posts: Array<Post>,
}

function PostList({ posts }: Props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_POST_LIST_REQUEST,
            payload: {
                page: 1,
                category: "server",
            },
        });
    }, [dispatch]);
    

    return (
        <PostListTemplate>
        </PostListTemplate>
    );
}

export default PostList;