import React from 'react';
import styled from '@emotion/styled';
import { color } from 'styles/color';

const UserPostListWrap = styled.div`
	width: 60rem;
	height: 100vh;
	border-right: 1px solid ${color.gray_1};
`;

function UserPostListTemplate() {
	return <UserPostListWrap />;
}

export default UserPostListTemplate;
