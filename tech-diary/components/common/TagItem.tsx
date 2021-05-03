import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { toBig } from 'styles/animation';

const TagItemWrap = styled.a`
	padding: 0.5rem 1rem;
	margin: 0.3rem;
	font-size: 0.8rem;

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
	deleteTag?: (tag?: string) => void;
};

function TagItem({ tagName, isLink, deleteTag }: Props) {
	return (
		<>
			{isLink ? (
				<>
					<Link href={`/tag/${tagName}`}>
						<TagItemWrap>{tagName}</TagItemWrap>
					</Link>
				</>
			) : (
				<>{deleteTag ? <TagItemWrap onClick={() => deleteTag(tagName)}>{tagName}</TagItemWrap> : <></>}</>
			)}
		</>
	);
}

export default React.memo(TagItem);
