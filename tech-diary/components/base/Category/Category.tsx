import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

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

export type CategoryItemProps = {
	href: string;
	name: string;
};

type Props = {
	categorys: Array<CategoryItemProps>;
};

function Category({ categorys }: Props) {
	const [categoryList, setCategoryList] = useState([]);

	useEffect(() => {
		const categoryItems: any = categorys.map((item: CategoryItemProps, i) => {
			return <CategoryItem href={item.href}>item.name</CategoryItem>;
		});

		setCategoryList(categoryItems);
	}, [categorys]);

	return <CategoryWrap>{categoryList}</CategoryWrap>;
}

export default Category;
