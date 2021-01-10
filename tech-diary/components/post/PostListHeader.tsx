import React from 'react';
import styled from '@emotion/styled';

const Header = styled.div`
	height: 3rem;

	font-size: 2rem;
	line-height: 50px;
	margin: 1rem 1rem;

	color: ${(props) => props.theme.black};
`;

type Props = {
	haedName: string;
};

function PostListHeader({ haedName }: Props) {
	return <Header>{haedName}</Header>;
}

export default PostListHeader;
