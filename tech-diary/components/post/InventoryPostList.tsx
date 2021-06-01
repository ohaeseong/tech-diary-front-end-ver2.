import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { mediaQuery } from 'components/layout/responsive';

const InventoryPostListWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 50rem;
	min-height: 100vh;
	margin-bottom: 5rem;

	${mediaQuery(768)} {
		width: 90%;
	}
`;

type Props = {
	children: ReactNode;
};

function InventoryPostList({ children }: Props) {
	return <InventoryPostListWrap>{children}</InventoryPostListWrap>;
}

export default React.memo(InventoryPostList);
