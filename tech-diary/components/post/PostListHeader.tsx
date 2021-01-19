import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery } from 'components/layout/responsive';

const Header = styled.div`
	height: 3rem;
	font-size: 2rem;
	line-height: 50px;
	margin: 1rem 1rem;

	${mediaQuery.over} {
		place-items: center;
		width: 85%;
	}

	color: ${(props) => props.theme.black};
`;

type Props = {
	haedName: string;
};

function PostListHeader({ haedName }: Props) {
	return <Header>{haedName}</Header>;
}

export default PostListHeader;
