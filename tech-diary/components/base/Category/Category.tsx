import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import { color } from 'styles/color';
import CategoryItem from 'components/base/Category/CategoryItem';
import { useTheme } from '@emotion/react';

const CategoryWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;

	width: 100%;
	height: 3rem;
	background-color: ${(props) => props.theme.white};

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
	const theme = useTheme();

	useEffect(() => {
		const categoryItems: any = categorys.map((item: CategoryItemProps, i) => {
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
