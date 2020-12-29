import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const CategoryItemWrap = styled.div<{ selected: boolean }>`
	display: inline-block;
	height: 100%;
	font-size: 1.2rem;
	text-align: center;
	line-height: 3rem;
	transition: 0.3s ease-in-out;
	cursor: pointer;

	&::after {
		display: block;
		content: '';
		border-bottom: solid 3px #f08080;
		transform: scaleX(0);
		transition: transform 250ms ease-in-out;
	}

	${(props) => props.selected && '&:after {transform: scaleX(1) };'}

	&:hover:after {
		transform: scaleX(1);
	}
`;

type Props = {
	href: string;
	children: ReactNode | string;
};

function CategoryItem({ href, children }: Props) {
	const router = useRouter();

	const selected = router.pathname === href;

	return (
		<Link href={href}>
			<CategoryItemWrap selected={selected}>{children}</CategoryItemWrap>
		</Link>
	);
}

export default CategoryItem;
