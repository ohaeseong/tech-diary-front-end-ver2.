import React from 'react';
import styled from '@emotion/styled';

const Header = styled.div`
	width: 80%;
	height: 3rem;

	font-size: 2rem;
	line-height: 50px;
	margin: 1rem auto;
	padding-left: 1rem;

	color: ${(props) => props.theme.black};
`;

type Props = {
	haedName: string;
};

function PostListHeader({ haedName }: Props) {
	return <Header>{haedName}</Header>;
}

export default PostListHeader;
