import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

const ButtonGroupWrap = styled.div<{
	sortDirection: string;
	margin?: string;
	childrenMargin?: string;
	width?: string;
}>`
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

	${(props) =>
		props.width &&
		`
		width: ${props.width};
    `}

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
	width?: string;
	sortDirection: string;
	childrenMargin?: string;
	margin?: string;
};

function ButtonGroup({ children, sortDirection, margin, childrenMargin, width }: Props) {
	return (
		<ButtonGroupWrap sortDirection={sortDirection} margin={margin} childrenMargin={childrenMargin} width={width}>
			{children}
		</ButtonGroupWrap>
	);
}

export default React.memo(ButtonGroup);
