import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

const ButtonGroupWrap = styled.div<{ sortDirection: string }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 1rem;

	${(props) =>
		props.sortDirection &&
		`
        flex-direction: ${props.sortDirection};
    `}

	& > * {
		margin: 0.5rem;
	}
`;

type Props = {
	children: ReactNode;
	sortDirection: string;
};

function ButtonGroup({ children, sortDirection }: Props) {
	return <ButtonGroupWrap sortDirection={sortDirection}>{children}</ButtonGroupWrap>;
}

export default ButtonGroup;
