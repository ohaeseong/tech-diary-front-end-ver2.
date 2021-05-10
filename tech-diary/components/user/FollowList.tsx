import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
// import { mediaQuery } from 'components/layout/responsive';

const FollowListTemplate = styled.div`
	width: 50rem;
`;

type Props = {
	children: ReactNode;
};

function FollowList({ children }: Props) {
	return <FollowListTemplate>{children}</FollowListTemplate>;
}

export default FollowList;
