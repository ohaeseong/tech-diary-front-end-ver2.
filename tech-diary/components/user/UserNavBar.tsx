import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { mediaQuery } from 'components/layout/responsive';

const UserNavBarTemplate = styled.div`
	max-width: 100%;
	margin-top: 6em;

	${mediaQuery(768)} {
		display: none;
	}
`;

const UserNavBarWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
	border-bottom: 1px solid ${(props) => props.theme.gray_1};
	margin-bottom: 4rem;

	flex-wrap: wrap;
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
