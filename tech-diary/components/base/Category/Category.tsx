
import styled from '@emotion/styled';import CategoryItem from './CategoryItem';
import { color } from 'styles/color';

const CategoryWrap = styled.div`
    label: category_wrap;
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
            <CategoryItem href={'/'} >All</CategoryItem>
            <CategoryItem href={'/front-end'}>Front-end</CategoryItem>
            <CategoryItem href={'/back-end'}>Back-end</CategoryItem>
            <CategoryItem href={'/database'}>Database</CategoryItem>
            <CategoryItem href={'/other'}>other</CategoryItem>
        </CategoryWrap>
    );
}

export default Category;