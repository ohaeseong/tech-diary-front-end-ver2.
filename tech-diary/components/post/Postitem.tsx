import styled from '@emotion/styled';
import React from 'react';

// import { Post } from 'store/types/post.types';
import { color } from 'styles/color';

const PostItemWrap = styled.div`
    width: 100%;
    height: 20rem;

    border-radius: 7px;
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.12);
    transition: 0.2s ease-in-out;

    background-color: ${color.white};

    &:hover {
       cursor: pointer;
       transform:translate(0,-20px);
    }
`;

const ThumbnailWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10rem;
    overflow: hidden;
    
    border-radius: 7px 7px 0px 0px;
`;

const Thumbnail = styled.img`
    width: 100%;
    height: auto;
`;

const PostContentsWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 10rem;
    border: 1px solid black;
`;

const PostContents = styled.div`
    width: 100%;
    height: 7rem;
    border: 1px solid black;
`;

const PostBottomWrap = styled.div`
    width: 100%;
    height: 3rem;
    border: 1px solid black;
`;

// type Props = {
//     item: Post;
// }

function PostItem() {
    // const {
    //         id,
    //         title,
    //         category, 
    //         contents, 
    //         create_time,
    //         thumbnail_address,
    //     } = item;

    return (
        <PostItemWrap>
            <ThumbnailWrap>
                <Thumbnail src={'/image/loginTemplateImage.png'} alt={'thumbnail'}/>
            </ThumbnailWrap>
            <PostContentsWrap>
                <PostContents/>
                <PostBottomWrap/>
            </PostContentsWrap>
        </PostItemWrap>
    );
}

export default PostItem;