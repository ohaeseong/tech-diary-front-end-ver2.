import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
// import { color } from 'styles/color';

const InventoryPostListWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 60rem;
	min-height: 100vh;
	/* margin-top: 3rem; */
	margin-bottom: 5rem;
	/* border: 1px solid black; */
`;

type Props = {
	children: ReactNode;
};

function InventoryPostList({ children }: Props) {
	return <InventoryPostListWrap>{children}</InventoryPostListWrap>;
}

export default React.memo(InventoryPostList);
