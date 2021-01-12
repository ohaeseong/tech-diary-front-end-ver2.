import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

const TagGroupWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	flex-wrap: wrap;
`;

type Props = {
	children: ReactNode;
};

function TagGroup({ children }: Props) {
	return <TagGroupWrap>{children}</TagGroupWrap>;
}

export default React.memo(TagGroup);
