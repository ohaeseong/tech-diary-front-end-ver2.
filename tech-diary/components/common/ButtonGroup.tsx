import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

const ButtonGroupWrap = styled.div<{ sortDirection: string; margin?: string; childrenMargin?: string }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 1rem;
	/* border: 1px solid black; */

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

	${(props) =>
		props.childrenMargin &&
		`
		& > * {
			margin: ${props.childrenMargin};
		}
    `}
`;

type Props = {
	children: ReactNode;
	sortDirection: string;
	childrenMargin?: string;
	margin?: string;
};

function ButtonGroup({ children, sortDirection, margin, childrenMargin }: Props) {
	return (
		<ButtonGroupWrap sortDirection={sortDirection} margin={margin} childrenMargin={childrenMargin}>
			{children}
		</ButtonGroupWrap>
	);
}

export default React.memo(ButtonGroup);
