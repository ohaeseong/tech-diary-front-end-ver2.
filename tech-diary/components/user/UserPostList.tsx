import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
// import { color } from 'styles/color';

const UserPostListWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 50rem;
	min-height: 100vh;
	/* margin-top: 3rem; */
	margin-bottom: 5rem;
`;

type Props = {
	children: ReactNode;
};

function UserPostList({ children }: Props) {
	return <UserPostListWrap>{children}</UserPostListWrap>;
}

export default React.memo(UserPostList);
