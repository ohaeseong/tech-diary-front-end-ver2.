import React from 'react';
import styled from '@emotion/styled';

const PostBottomTemplate = styled.div`
	width: 100%;
	height: 15rem;
	margin: 5rem 0;

	border: 1px solid ${(props) => props.theme.gray_2};
`;

function PostBottom() {
	return <PostBottomTemplate />;
}

export default PostBottom;
