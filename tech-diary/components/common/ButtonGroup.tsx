import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

const ButtonGroupWrap = styled.div<{ sortDirection: string; margin?: string }>`
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

	${(props) =>
		props.margin &&
		`
        margin: ${props.margin};
    `}

	& > * {
		margin: 0.5rem;
	}
`;

type Props = {
	children: ReactNode;
	sortDirection: string;
	margin?: string;
};

function ButtonGroup({ children, sortDirection, margin }: Props) {
	return (
		<ButtonGroupWrap sortDirection={sortDirection} margin={margin}>
			{children}
		</ButtonGroupWrap>
	);
}

export default ButtonGroup;
