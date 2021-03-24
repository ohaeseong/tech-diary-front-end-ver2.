import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { toBig } from 'styles/animation';

const TagItemWrap = styled.a`
	padding: 0.5rem 1rem;
	margin: 0.3rem;

	background-color: ${(props) => props.theme.neon_2};
	color: white;
	border-radius: 15px;

	animation: ${toBig} 0.2s;

	&:hover {
		cursor: pointer;
	}
`;

type Props = {
	tagName: string;
	isLink: boolean;
};

function TagItem({ tagName, isLink }: Props) {
	return (
		<>
			{isLink ? (
				<>
					<Link href="http://localhost:3000">
						<TagItemWrap>{tagName}</TagItemWrap>
					</Link>
				</>
			) : (
				<TagItemWrap>{tagName}</TagItemWrap>
			)}
		</>
	);
}

export default React.memo(TagItem);
