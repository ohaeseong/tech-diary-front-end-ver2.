import styled from '@emotion/styled';
import React from 'react';

import { color } from 'styles/color';
import CategoryItem from './CategoryItem';

const CategoryWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;

	width: 100%;
	height: 3rem;
	background-color: ${color.white};

	& > * {
		margin: 0rem 3rem;
	}
`;

function Category() {
	return (
		<CategoryWrap>
			<CategoryItem href="/">All</CategoryItem>
			<CategoryItem href="/front-end">Front-end</CategoryItem>
			<CategoryItem href="/back-end">Back-end</CategoryItem>
			<CategoryItem href="/database">Database</CategoryItem>
			<CategoryItem href="/other">other</CategoryItem>
		</CategoryWrap>
	);
}

export default Category;
