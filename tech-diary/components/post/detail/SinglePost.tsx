import React from 'react';
import styled from '@emotion/styled';

const SinglePostTemplate = styled.div`
    display: flex;
    width: 80%;
    min-height: 15rem;
    border: 1px solid black;
`;

function SinglePost() {
	return <SinglePostTemplate />;
}

export default SinglePost;
