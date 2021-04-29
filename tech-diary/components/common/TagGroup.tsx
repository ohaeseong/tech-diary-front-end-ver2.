import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

const TagGroupWrap = styled.div<{ margin?: string }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	flex-wrap: wrap;
	margin-bottom: 0.5rem;

	${(props) =>
		props.margin &&
		`
		margin: ${props.margin};
	`}
`;

type Props = {
	children: ReactNode;
	margin?: string;
};

function TagGroup({ children, margin }: Props) {
	return <TagGroupWrap margin={margin}>{children}</TagGroupWrap>;
}

export default React.memo(TagGroup);
