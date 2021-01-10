import React, { ReactChild } from 'react';
import styled from '@emotion/styled';

const TagItemWrap = styled.a`
	padding: 0.5rem 1rem;
	/* margin-left: 1rem; */
	margin: 0.3rem;
	/* margin: 0.5rem 0.5rem 1rem 0.5rem; */

	background-color: ${(props) => props.theme.neon_2};
	color: white;
	border-radius: 15px;

	&:hover {
		cursor: pointer;
	}
`;

type Props = {
	tagName: string;
};

function TagItem({ tagName }: Props) {
	return <TagItemWrap>{tagName}</TagItemWrap>;
}

export default TagItem;
