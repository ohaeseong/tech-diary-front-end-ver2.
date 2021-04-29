import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

const UserNavBarTemplate = styled.div`
	max-width: 100%;
	margin-top: 6em;
`;

const UserNavBarWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
	border-bottom: 1px solid ${(props) => props.theme.gray_1};
	margin-bottom: 4rem;
`;

type Props = {
	children: Array<ReactElement>;
};

function UserNabBar({ children }: Props) {
	return (
		<UserNavBarTemplate>
			<UserNavBarWrap>{children}</UserNavBarWrap>
		</UserNavBarTemplate>
	);
}

export default UserNabBar;
