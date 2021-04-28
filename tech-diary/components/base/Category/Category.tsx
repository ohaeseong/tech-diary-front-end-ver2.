import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import CategoryItem from 'components/base/Category/CategoryItem';
import { mediaQuery } from 'components/layout/responsive';

const CategoryWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;

	width: 100%;
	min-height: 3rem;
	background-color: ${(props) => props.theme.white};

	& > * {
		margin: 0rem 3rem;
	}

	${mediaQuery(767)} {
		display: none;
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
		const categoryItems: any = categorys.map((item: CategoryItemProps) => {
			return (
				<CategoryItem key={item.name} href={item.href}>
					{item.name}
				</CategoryItem>
			);
		});

		setCategoryList(categoryItems);
	}, [categorys]);

	return categoryList.length !== 0 ? <CategoryWrap>{categoryList}</CategoryWrap> : null;
}

export default Category;
